import * as React from 'react';
import DataGridPattern from './DataGridPattern';
import { readAllDepartment, readDepartment } from '../../grpc/Department';
import { readAllSpecialization } from '../../grpc/Specialization';
import {
  createGroup,
  deleteGroup,
  editGroup,
  readAllGroup,
  readGroup,
} from '../../grpc/Group';

export default function DataGridGroup() {
  const [departments, setDepartments] = React.useState([]);
  const [specializations, setSpecializations] = React.useState([]);

  React.useEffect(() => {
    readAllDepartment()
      .then((result) => {
        setDepartments(
          result.responses.map((item) => ({ value: item.id, label: item.name }))
        );
        return null;
      })
      .catch(() => null);

    readAllSpecialization()
      .then((result) => {
        setSpecializations(
          result.responses.map((item) => ({ value: item.id, label: item.name }))
        );
        return null;
      })
      .catch(() => null);
  }, []);

  const columns = [
    {
      field: 'id',
      headerName: 'Id',
      editable: false,
      hide: true,
    },
    {
      field: 'number',
      headerName: 'Номер',
      type: 'number',
      flex: 1,
      editable: true,
    },
    {
      field: 'course',
      headerName: 'Курс',
      type: 'number',
      flex: 1,
      editable: true,
    },
    {
      field: 'specialization',
      headerName: 'Специальность',
      flex: 1,
      type: 'singleSelect',
      editable: true,
      valueFormatter: (value) => {
        const temp = specializations.find((row) => row.value === value.value);
        if (temp) return temp.label;
        return value;
      },
      valueOptions: ({ row }) => {
        return specializations;
      },
    },
    {
      field: 'department',
      headerName: 'Отделение',
      flex: 1,
      type: 'singleSelect',
      editable: true,
      valueFormatter: (value) => {
        const temp = departments.find((row) => row.value === value.value);
        if (temp) return temp.label;
        return value;
      },
      valueOptions: ({ row }) => {
        return departments;
      },
    },
  ];

  return (
    <DataGridPattern
      title="Группы"
      createRow={createGroup}
      editRow={editGroup}
      deleteRow={deleteGroup}
      readRow={readGroup}
      readAllRows={readAllGroup}
      columns={columns}
      emptyRow={() => {
        return {
          number: '',
          course: '',
          department: departments[0] ? departments[0].value : '',
          specialization: specializations[0] ? specializations[0].value : '',
        };
      }}
      setRow={(row) => {
        return {
          id: row.id,
          course: row.numberCourse,
          number: row.numberGroup,
          department: row.departmentId,
          specialization: row.specializationId,
        };
      }}
    />
  );
}
