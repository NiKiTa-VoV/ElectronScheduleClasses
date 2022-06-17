import * as React from 'react';
import DataGridPattern from './DataGridPattern';
import {
  createCurriculum,
  deleteCurriculum,
  editCurriculum,
  readAllCurriculum,
  readCurriculum,
} from '../../grpc/Curriculum';
import { readAllGroup } from '../../grpc/Group';
import { readAllSubject } from '../../grpc/Subject';
import { readAllTeacher } from '../../grpc/Teacher';

export default function DataGridCurriculum() {
  const [teachers, setTeachers] = React.useState([]);
  const [groups, setGroups] = React.useState([]);
  const [subjects, setSubjects] = React.useState([]);

  React.useEffect(() => {
    readAllTeacher()
      .then((result) => {
        setTeachers(
          result.responses.map((item) => ({
            value: item.userId,
            label: item.name,
          }))
        );
        return null;
      })
      .catch(() => null);

    readAllGroup()
      .then((result) => {
        setGroups(
          result.responses.map((item) => ({
            value: item.id,
            label: item.numberGroup,
          }))
        );
        return null;
      })
      .catch(() => null);

    readAllSubject()
      .then((result) => {
        setSubjects(
          result.responses.map((item) => ({
            value: item.id,
            label: item.name,
          }))
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
      field: 'studyHours',
      headerName: 'Учебные часы',
      type: 'number',
      flex: 1,
      editable: true,
    },
    {
      field: 'teacher',
      headerName: 'Преподаватель',
      flex: 1,
      type: 'singleSelect',
      editable: true,
      valueFormatter: (value) => {
        const temp = teachers.find((row) => row.value === value.value);
        if (temp) return temp.label;
        return value;
      },
      valueOptions: ({ row }) => {
        return teachers;
      },
    },
    {
      field: 'group',
      headerName: 'Группа',
      flex: 1,
      type: 'singleSelect',
      editable: true,
      valueFormatter: (value) => {
        const temp = groups.find((row) => row.value === value.value);
        if (temp) return temp.label;
        return value;
      },
      valueOptions: ({ row }) => {
        return groups;
      },
    },
    {
      field: 'subject',
      headerName: 'Предмет',
      flex: 1,
      type: 'singleSelect',
      editable: true,
      valueFormatter: (value) => {
        const temp = subjects.find((row) => row.value === value.value);
        if (temp) return temp.label;
        return value;
      },
      valueOptions: ({ row }) => {
        return subjects;
      },
    },
  ];

  return (
    <DataGridPattern
      title="Учебные планы"
      createRow={createCurriculum}
      editRow={editCurriculum}
      deleteRow={deleteCurriculum}
      readRow={readCurriculum}
      readAllRows={readAllCurriculum}
      columns={columns}
      emptyRow={() => {
        return {
          studyHours: '0',
          teacher: teachers[0] ? teachers[0].value : '',
          group: groups[0] ? groups[0].value : '',
          subject: subjects[0] ? subjects[0].value : '',
        };
      }}
      setRow={(row) => {
        return {
          id: row.id,
          studyHours: row.numberStudyHours,
          teacher: row.teacherId,
          group: row.groupId,
          subject: row.subjectId,
        };
      }}
    />
  );
}
