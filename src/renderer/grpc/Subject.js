import { createRequest } from './GrpcUtil';

const noEdit = '#NOEDIT';

export function createSubject(row) {
  return createRequest('Subject', 'Create', { name: row.name });
}

export function editSubject(oldRow, newRow) {
  const args = {
    id: newRow.id,
    name: oldRow.name === newRow.name ? noEdit : newRow.name,
  };
  return createRequest('Subject', 'Edit', args);
}

export function deleteSubject(id) {
  return createRequest('Subject', 'Delete', { id });
}

export function readSubject(id) {
  return createRequest('Subject', 'Read', { id });
}

export function readAllSubject() {
  return createRequest('Subject', 'ReadAll', {});
}
