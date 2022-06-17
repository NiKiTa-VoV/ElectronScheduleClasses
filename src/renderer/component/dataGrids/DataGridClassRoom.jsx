import * as React from 'react';
import DataGridPattern from './DataGridPattern';
import {
  createClassRoom,
  deleteClassRoom,
  editClassRoom,
  readAllClassRoom,
  readClassRoom,
} from '../../grpc/ClassRoom';

export default function DataGridClassRoom() {
  const columns = [
    {
      field: 'id',
      headerName: 'Id',
      editable: false,
      hide: true,
    },
    { field: 'number', headerName: 'Номер', flex: 1, editable: true },
  ];

  return (
    <DataGridPattern
      title="Аудитории"
      createRow={createClassRoom}
      editRow={editClassRoom}
      deleteRow={deleteClassRoom}
      readRow={readClassRoom}
      readAllRows={readAllClassRoom}
      columns={columns}
      emptyRow={() => {
        return { number: '' };
      }}
    />
  );
}
