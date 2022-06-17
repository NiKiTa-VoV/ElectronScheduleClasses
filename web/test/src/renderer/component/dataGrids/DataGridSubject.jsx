import * as React from 'react';
import DataGridPattern from './DataGridPattern';
import {
  createSubject,
  deleteSubject,
  editSubject,
  readAllSubject,
  readSubject,
} from '../../grpc/Subject';

export default function DataGridSubject() {
  const columns = [
    {
      field: 'id',
      headerName: 'Id',
      editable: false,
      hide: true,
    },
    { field: 'name', headerName: 'Название', flex: 1, editable: true },
  ];

  return (
    <DataGridPattern
      title="Предмет"
      createRow={createSubject}
      editRow={editSubject}
      deleteRow={deleteSubject}
      readRow={readSubject}
      readAllRows={readAllSubject}
      columns={columns}
      emptyRow={() => {
        return { name: '' };
      }}
    />
  );
}
