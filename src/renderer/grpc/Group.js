import { createRequest } from './GrpcUtil';

export function createGroup(row) {
  return createRequest('Group', 'Create', {
    specializationId: row.specialization,
    departmentId: row.department,
    numberCourse: row.course,
    numberGroup: row.number,
  });
}

export function editGroup(oldRow, newRow) {
  const args = {
    id: newRow.id,
    specializationId: newRow.specialization,
    departmentId: newRow.department,
    numberGroup: newRow.number,
    numberCourse: newRow.course,
  };
  return createRequest('Group', 'Edit', args);
}

export function deleteGroup(id) {
  return createRequest('Group', 'Delete', { id });
}

export function readGroup(id) {
  return createRequest('Group', 'Read', { id });
}

export function readAllGroup() {
  return createRequest('Group', 'ReadAll', {});
}
