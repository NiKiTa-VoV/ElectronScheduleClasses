import * as React from 'react';
import Button from '@mui/material/Button';
import { Box, Dialog, Slide } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';
import CloseIcon from '@mui/icons-material/Close';
import { DataGrid, GridToolbarContainer, ruRU } from '@mui/x-data-grid';
import { readAvailableLessons } from '../../grpc/Lesson';

function EditToolbar(props) {
  return (
    <GridToolbarContainer>
      <div className="data_grid_title">
        {/* eslint-disable-next-line react/destructuring-assignment,react/prop-types */}
        <span>{props.title}</span>
      </div>
    </GridToolbarContainer>
  );
}

const Transition = React.forwardRef(function Transition(props, ref) {
  // eslint-disable-next-line react/jsx-props-no-spreading
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ScheduleItemEditDialog(props) {
  const {
    open,
    setOpen,
    item,
    findTeacher,
    findSubject,
    findGroup,
    findClassRoom,
    classRooms,
  } = props;

  const [availableLessons, setAvailableLessons] = React.useState([]);

  const tempLessons = item.lessons.responses.map((row) => ({ ...row }));

  const parseClassRooms = classRooms.map((room) => {
    return {
      label: room.number,
      value: room.id,
    };
  });

  React.useEffect(() => {
    readAvailableLessons(item.teacherId)
      .then((result) => {
        setAvailableLessons(result.responses);
        return null;
      })
      .catch(null);
  }, []);

  const handleClose = () => {
    setOpen(false);
  };

  const saveLessons = () => {
    setOpen(false);
    item.lessons.responses = tempLessons;
  };

  const rowProcessUpdate = (newRow, oldRow) => {
    console.log(oldRow, newRow);
    const lesson = tempLessons.find(
      (row) => row.lessonNumber === newRow.lessonNumber
    );
    if (oldRow.groupId !== newRow.groupId) {
      if (newRow.groupId === '0') {
        lesson.groupId = '0';
        lesson.subjectId = '0';
        lesson.roomId = '0';
        lesson.empty = true;
        return lesson;
      }
      lesson.groupId = newRow.groupId;
      lesson.subjectId = '0';
      return lesson;
    }
    if (oldRow.subjectId !== newRow.subjectId) {
      lesson.subjectId = newRow.subjectId;
    } else if (oldRow.roomId !== newRow.roomId) {
      lesson.roomId = newRow.roomId;
    } else {
      lesson.underRecord = newRow.underRecord;
    }
    lesson.empty = false;
    return newRow;
  };

  const columns = [
    {
      field: 'id',
      headerName: 'Id',
      editable: false,
      hide: true,
    },
    {
      field: 'lessonNumber',
      headerName: 'Номер',
      type: 'number',
      editable: false,
      align: 'center',
      headerAlign: 'center',
    },
    {
      field: 'groupId',
      headerName: 'Группа',
      flex: 1,
      type: 'singleSelect',
      align: 'center',
      headerAlign: 'center',
      editable: true,
      valueFormatter: (value) => {
        const temp = findGroup(value.value);
        if (temp) return temp.numberGroup;
        return '';
      },
      valueOptions: (row) => {
        let array = availableLessons.map((rowA) => {
          const group = findGroup(rowA.groupId);
          return { label: group.numberGroup, value: group.id };
        });

        array = array.reduce(
          (r, i) =>
            !r.some((j) => JSON.stringify(i) === JSON.stringify(j))
              ? [...r, i]
              : r,
          []
        );
        return [{ label: '╳', value: '0' }, ...array];
      },
    },
    {
      field: 'subjectId',
      headerName: 'Предмет',
      flex: 2,
      type: 'singleSelect',
      align: 'center',
      headerAlign: 'center',
      editable: true,
      valueFormatter: (value) => {
        const temp = findSubject(value.value);
        if (temp) return temp.name;
        return '';
      },
      valueOptions: ({ row }) => {
        const lessons = availableLessons.filter(
          (lesson) => row.groupId === lesson.groupId
        );
        const subjects = lessons.map((lesson) => {
          const subject = findSubject(lesson.subjectId);
          return { label: subject.name, value: subject.id };
        });
        return [{ label: '╳', value: '0' }, ...subjects];
      },
    },
    {
      field: 'roomId',
      headerName: 'Аудитория',
      flex: 1,
      type: 'singleSelect',
      align: 'center',
      headerAlign: 'center',
      editable: true,
      valueFormatter: (value) => {
        const temp = findClassRoom(value.value);
        if (temp) return temp.number;
        return '';
      },
      valueOptions: ({ row }) => {
        return [{ label: '╳', value: '0' }, ...parseClassRooms];
      },
    },
    {
      field: 'underRecord',
      headerName: 'Под запись',
      align: 'center',
      headerAlign: 'center',
      type: 'boolean',
      flex: 0.3,
      editable: true,
    },
  ];

  return (
    <Dialog
      fullScreen
      open={open}
      onClose={handleClose}
      TransitionComponent={Transition}
    >
      <AppBar sx={{ position: 'relative', background: '#19294f' }}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={handleClose}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
          <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
            {item.teacherId && findTeacher(item.teacherId)?.name}
          </Typography>
          <Button autoFocus color="inherit" onClick={saveLessons}>
            Сохранить
          </Button>
        </Toolbar>
      </AppBar>
      <Box
        sx={{
          height: '50%',
          width: '100%',
          '& .actions': {
            color: 'text.secondary',
          },
          '& .textPrimary': {
            color: 'text.primary',
          },
          '& .super-app-theme-state--true': {
            background: '#e4ecee',
          },
        }}
      >
        <DataGrid
          hideFooter
          columns={columns}
          rows={tempLessons}
          components={{
            Toolbar: EditToolbar,
          }}
          componentsProps={{
            toolbar: { title: 'Пары' },
          }}
          processRowUpdate={rowProcessUpdate}
          onProcessRowUpdateError={() => null}
          experimentalFeatures={{ newEditingApi: true }}
          localeText={ruRU.components.MuiDataGrid.defaultProps.localeText}
          disableSelectionOnClick
          disableColumnMenu
          getRowClassName={(params) =>
            `super-app-theme-state--${params.row.underRecord}`
          }
        />
      </Box>
    </Dialog>
  );
}

ScheduleItemEditDialog.propTypes = {
  item: PropTypes.object.isRequired,
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
  findTeacher: PropTypes.func.isRequired,
  findSubject: PropTypes.func.isRequired,
  findGroup: PropTypes.func.isRequired,
  findClassRoom: PropTypes.func.isRequired,
  classRooms: PropTypes.array.isRequired,
};
