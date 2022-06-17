import { createRequest } from './GrpcUtil';

export function createTeacher(row) {
  return createRequest('Teacher', 'Create', { name: row.name });
}

export function editTeacher(oldRow, newRow) {
  const args = {
    id: newRow.id,
    teacherId: newRow.teacher,
    groupId: newRow.group,
    subjectId: newRow.subject,
    numberStudyHours: newRow.studyHours,
  };
  return createRequest('Teacher', 'Edit', args);
}

export function deleteTeacher(id) {
  return createRequest('Teacher', 'Delete', { id });
}

export function readTeacher(id) {
  return createRequest('Teacher', 'Read', { id });
}

export function readAllTeacher() {
  return createRequest('Teacher', 'ReadAll', {});
}
