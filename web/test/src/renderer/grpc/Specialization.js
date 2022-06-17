import { createRequest } from './GrpcUtil';

const noEdit = '#NOEDIT';

export function createSpecialization(row) {
  return createRequest('Specialization', 'Create', { name: row.name });
}

export function editSpecialization(oldRow, newRow) {
  const args = {
    id: newRow.id,
    name: oldRow.name === newRow.name ? noEdit : newRow.name,
  };
  return createRequest('Specialization', 'Edit', args);
}

export function deleteSpecialization(id) {
  return createRequest('Specialization', 'Delete', { id });
}

export function readSpecialization(id) {
  return createRequest('Specialization', 'Read', { id });
}

export function readAllSpecialization() {
  return createRequest('Specialization', 'ReadAll', {});
}
