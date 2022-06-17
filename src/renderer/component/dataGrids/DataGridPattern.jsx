import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import {
  DataGrid,
  ruRU,
  GridRowModes,
  GridToolbarContainer,
  GridActionsCellItem,
  GridToolbarExport,
  GridPrintExportMenuItem,
} from '@mui/x-data-grid';
import { Divider } from '@mui/material';
import '../../css/IndexStyle.css';
import Stack from '@mui/material/Stack';
import SnackbarsServerMessage from '../alert/SnackbarsServerMessage';

function EditToolbar(props) {
  const { rows, setRows, setRowModesModel, emptyRow, title } = props;
  const handleClick = () => {
    const id = 0;
    if (rows.find((row) => row.id === id)) {
      return;
    }
    setRowModesModel((oldModel) => ({
      ...oldModel,
      [id]: { mode: GridRowModes.Edit },
    }));
    const object = { id, isNew: true };
    setRows((oldRows) => [...oldRows, Object.assign(object, emptyRow())]);
  };

  return (
    <GridToolbarContainer>
      <div className="data_grid_title">
        <span>Справочник: {title}</span>
        <Divider
          className="gridTitleDivider"
          sx={{
            width: 250,
            mt: 1,
            mb: 2,
          }}
        />
        <Stack direction="row" spacing={2}>
          <Button
            className="button_default"
            variant="outlined"
            startIcon={<AddIcon />}
            onClick={handleClick}
          >
            Добавить запись
          </Button>
          <GridToolbarExport
            variant="outlined"
            printOptions={{
              hideFooter: true,
              hideToolbar: true,
            }}
            csvOptions={{
              delimiter: ';',
              fileName: title,
              utf8WithBom: true,
            }}
          />
        </Stack>
      </div>
    </GridToolbarContainer>
  );
}

EditToolbar.propTypes = {
  setRowModesModel: PropTypes.func.isRequired,
  rows: PropTypes.array.isRequired,
  setRows: PropTypes.func.isRequired,
  emptyRow: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
};

export default function DataGridPattern(props) {
  const { emptyRow, title, setRow } = props;
  const [rows, setRows] = React.useState([]);
  const [rowModesModel, setRowModesModel] = React.useState({});
  const [error, setError] = React.useState(null);
  const [isLoaded, setIsLoaded] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [code, setCode] = React.useState('');
  const [field, setField] = React.useState('');
  const printRows = [];

  React.useEffect(() => {
    props
      .readAllRows()
      .then((result) => {
        setIsLoaded(true);
        if (setRow) setRows(result.responses.map((row) => setRow(row)));
        else setRows(result.responses);
        return null;
      })
      .catch((exception) => {
        setIsLoaded(true);
        setError(exception);
      });
  }, []);

  const handleRowEditStart = (params, event) => {
    event.defaultMuiPrevented = true;
  };

  const handleRowEditStop = (params, event) => {
    event.defaultMuiPrevented = true;
  };

  const handleEditClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const handleDeleteClick = (id) => () => {
    props
      .deleteRow(id)
      .then((result) => {
        setOpen(true);
        setCode(result.code);
        if (result.code === 'SUCCESS') {
          setRows(
            rows.filter((row) => {
              return row.id !== id;
            })
          );
        }
        setField(result.field);

        return null;
      })
      .catch((exception) => {
        setIsLoaded(true);
        setError(exception);
      });
  };

  const handleCancelClick = (id) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });
    const editedRow = rows.find((row) => row.id === id);
    if (editedRow.isNew) {
      setRows(rows.filter((row) => row.id !== id));
    } else {
      props.readRow(id).then((result) => {
        let row1;
        if (setRow) row1 = setRow(result);
        else row1 = result;
        setRows(rows.map((row) => (row.id === id ? row1 : row)));
        return null;
      });
    }
  };

  const processRowUpdate = (newRow, oldRow) => {
    if (oldRow.isNew) {
      return props.createRow(newRow).then((result) => {
        setOpen(true);
        setCode(result.code);
        const success = result.code === 'SUCCESS';
        if (success) {
          newRow.id = result.id;
          setRowModesModel({
            ...rowModesModel,
            [result.id]: { mode: GridRowModes.View },
          });
        }
        setField(result.field);
        if (success) {
          newRow.isNew = false;
          setRows(rows.map((row) => (row.id === oldRow.id ? newRow : row)));
          return newRow;
        }
        setRows(rows.map((row) => (row.id === oldRow.id ? newRow : row)));
        setRowModesModel((oldModel) => ({
          ...oldModel,
          [oldRow.id]: { mode: GridRowModes.Edit },
        }));
        return null;
      });
    }
    return props.editRow(oldRow, newRow).then((result) => {
      setOpen(true);
      setCode(result.code);
      const success = result.code === 'SUCCESS' || result.code === 'PASS';
      setField(result.field);
      if (success) {
        return newRow;
      }

      setRowModesModel((oldModel) => ({
        ...oldModel,
        [newRow.id]: { mode: GridRowModes.Edit },
      }));
      return newRow;
    });
  };

  const columns = [
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Действия',
      width: 100,
      cellClassName: 'actions',
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={<SaveIcon />}
              label="Сохранить"
              onClick={handleSaveClick(id)}
              color="primary"
            />,
            <GridActionsCellItem
              icon={<CancelIcon />}
              label="Отмена"
              className="textPrimary"
              onClick={handleCancelClick(id)}
              color="inherit"
            />,
          ];
        }

        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Редактировать"
            className="textPrimary"
            onClick={handleEditClick(id)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Удалить"
            onClick={handleDeleteClick(id)}
            color="inherit"
          />,
        ];
      },
    },
  ];

  return (
    <Box
      sx={{
        height: '90vh',
        width: '100%',
        '& .actions': {
          color: 'text.secondary',
        },
        '& .textPrimary': {
          color: 'text.primary',
        },
      }}
    >
      <DataGrid
        rows={rows}
        columns={[...props.columns, ...columns]}
        editMode="row"
        rowModesModel={rowModesModel}
        onRowEditStart={handleRowEditStart}
        onRowEditStop={handleRowEditStop}
        processRowUpdate={processRowUpdate}
        onProcessRowUpdateError={() => null}
        components={{
          Toolbar: EditToolbar,
        }}
        componentsProps={{
          toolbar: { rows, setRows, setRowModesModel, emptyRow, title },
        }}
        experimentalFeatures={{ newEditingApi: true }}
        localeText={ruRU.components.MuiDataGrid.defaultProps.localeText}
        rowsPerPageOptions={[10, 25, 50, 100]}
        header
      />
      <SnackbarsServerMessage
        changeOpen={setOpen}
        open={open}
        code={code}
        field={field}
      />
    </Box>
  );
}

DataGridPattern.propTypes = {
  title: PropTypes.string.isRequired,
  columns: PropTypes.array.isRequired,
  setRow: PropTypes.func,
  emptyRow: PropTypes.func.isRequired,
  createRow: PropTypes.func.isRequired,
  editRow: PropTypes.func.isRequired,
  deleteRow: PropTypes.func.isRequired,
  readRow: PropTypes.func.isRequired,
  readAllRows: PropTypes.func.isRequired,
};
