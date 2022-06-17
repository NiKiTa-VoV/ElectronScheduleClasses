import { createRequest } from './GrpcUtil';

const noEdit = '#NOEDIT';

export function createDepartment(row) {
  return createRequest('Department', 'Create', { name: row.name });
}

export function editDepartment(oldRow, newRow) {
  const args = {
    id: newRow.id,
    name: oldRow.name === newRow.name ? noEdit : newRow.name,
  };
  return createRequest('Department', 'Edit', args);
}

export function deleteDepartment(id) {
  return createRequest('Department', 'Delete', { id });
}

export function readDepartment(id) {
  return createRequest('Department', 'Read', { id });
}

export function readAllDepartment() {
  return createRequest('Department', 'ReadAll', {});
}
