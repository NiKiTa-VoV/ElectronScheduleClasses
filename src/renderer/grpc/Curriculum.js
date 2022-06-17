import { createRequest } from './GrpcUtil';

export function createCurriculum(row) {
  return createRequest('Curriculum', 'Create', {
    teacherId: row.teacher,
    groupId: row.group,
    subjectId: row.subject,
    numberStudyHours: row.studyHours,
  });
}

export function editCurriculum(oldRow, newRow) {
  const args = {
    id: newRow.id,
    teacherId: newRow.teacher,
    groupId: newRow.group,
    subjectId: newRow.subject,
    numberStudyHours: newRow.studyHours,
  };
  return createRequest('Curriculum', 'Edit', args);
}

export function deleteCurriculum(id) {
  return createRequest('Curriculum', 'Delete', { id });
}

export function readCurriculum(id) {
  return createRequest('Curriculum', 'Read', { id });
}

export function readAllCurriculum() {
  return createRequest('Curriculum', 'ReadAll', {});
}
