import * as React from 'react';
import DataGridPattern from './DataGridPattern';
import {
  createSpecialization,
  deleteSpecialization,
  editSpecialization,
  readAllSpecialization,
  readSpecialization,
} from '../../grpc/Specialization';

export default function DataGridSpecialization() {
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
      title="Специальности"
      createRow={createSpecialization}
      editRow={editSpecialization}
      deleteRow={deleteSpecialization}
      readRow={readSpecialization}
      readAllRows={readAllSpecialization}
      columns={columns}
      emptyRow={() => {
        return { name: '' };
      }}
    />
  );
}
