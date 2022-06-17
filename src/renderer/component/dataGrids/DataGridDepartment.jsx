import * as React from 'react';
import DataGridPattern from './DataGridPattern';
import {
  createDepartment,
  deleteDepartment,
  editDepartment,
  readAllDepartment,
  readDepartment,
} from '../../grpc/Department';

export default function DataGridDepartment() {
  const columns = [
    {
      field: 'id',
      headerName: 'Id',
      editable: false,
      hide: true,
    },
    { field: 'name', headerName: 'Название', flex: 1, editable: true },
    // {
    //   field: 'type',
    //   headerName: 'Type',
    //   type: 'singleSelect',
    //   editable: true,
    //   valueOptions: ({ row }) => {
    //     const options = [];
    //     options.push('junior');
    //     return options;
    //   },
    // },
  ];

  return (
    <DataGridPattern
      title="Отделения"
      createRow={createDepartment}
      editRow={editDepartment}
      deleteRow={deleteDepartment}
      readRow={readDepartment}
      readAllRows={readAllDepartment}
      columns={columns}
      emptyRow={() => {
        return { name: '' };
      }}
    />
  );
}
