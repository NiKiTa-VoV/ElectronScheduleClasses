import * as React from 'react';
import PropTypes from 'prop-types';
import {
  Card,
  CardContent,
  CardHeader,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ScheduleItemEditDialog from './ScheduleItemEditDialog';

function createLesson(lessonNumber) {
  const empty = true;
  return {
    id: lessonNumber,
    subjectId: '0',
    groupId: '0',
    Id: '0',
    roomId: '0',
    lessonNumber,
    empty,
  };
}

export default function ScheduleItem(props) {
  const [isDialogOpen, setDialogOpen] = React.useState(false);

  const {
    item,
    dialog,
    findTeacher,
    findSubject,
    findGroup,
    findClassRoom,
    classRooms,
  } = props;

  const lessons = [
    createLesson('1'),
    createLesson('2'),
    createLesson('3'),
    createLesson('4'),
    createLesson('5'),
    createLesson('6'),
    createLesson('7'),
  ];

  item.lessons.responses = lessons.map((row) => {
    const find = item.lessons.responses.find(
      (row1) => row1.lessonNumber === row.lessonNumber
    );
    return (
      (find && { id: find.lessonNumber, ...find }) || { empty: false, ...row }
    );
  });

  const openDialog = () => {
    setDialogOpen(true);
  };

  const buttonDialog = dialog && (
    <IconButton aria-label="settings" onClick={openDialog}>
      <MoreVertIcon />
    </IconButton>
  );

  return (
    <div>
      <Card sx={{ width: 500, height: 450, mb: 2 }} elevation={4}>
        <CardHeader
          action={buttonDialog}
          title={item.teacherId && findTeacher(item.teacherId)?.name}
        />
        <CardContent>
          <TableContainer sx={{ height: 360 }} component={Paper} elevation={4}>
            <Table sx={{ width: '100%' }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="center" size="small">
                    Номер
                  </TableCell>
                  <TableCell align="center">Группа</TableCell>
                  <TableCell align="center">Предмет</TableCell>
                  <TableCell align="center">Аудитория</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {item.lessons.responses.map(
                  (row) =>
                    !row.empty && (
                      <TableRow
                        key={row.lessonNumber}
                        sx={{
                          '&:last-child td, &:last-child th': { border: 0 },
                          background: row.underRecord ? '#e4ecee' : '',
                        }}
                      >
                        <TableCell align="center" size="small">
                          {row.lessonNumber}
                        </TableCell>
                        <TableCell align="center">
                          {row.groupId && findGroup(row.groupId)?.numberGroup}
                        </TableCell>
                        <TableCell align="center">
                          {row.subjectId && findSubject(row.subjectId)?.name}
                        </TableCell>
                        <TableCell align="center">
                          {row.roomId && findClassRoom(row.roomId)?.number}
                        </TableCell>
                      </TableRow>
                    )
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
      {isDialogOpen && (
        <ScheduleItemEditDialog
          item={item}
          open={isDialogOpen}
          setOpen={setDialogOpen}
          findTeacher={findTeacher}
          findSubject={findSubject}
          findGroup={findGroup}
          findClassRoom={findClassRoom}
          classRooms={classRooms}
        />
      )}
    </div>
  );
}

ScheduleItem.propTypes = {
  item: PropTypes.object.isRequired,
  dialog: PropTypes.bool,
  findTeacher: PropTypes.func.isRequired,
  findSubject: PropTypes.func.isRequired,
  findGroup: PropTypes.func.isRequired,
  findClassRoom: PropTypes.func.isRequired,
  classRooms: PropTypes.array.isRequired,
};
