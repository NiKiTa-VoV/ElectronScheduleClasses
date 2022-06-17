import { createRequest } from './GrpcUtil';

export function createClassRoom(row) {
  return createRequest('ClassRoom', 'Create', {
    number: row.number,
  });
}

export function editClassRoom(oldRow, newRow) {
  const args = {
    id: newRow.id,
    number: newRow.number,
  };
  return createRequest('ClassRoom', 'Edit', args);
}

export function deleteClassRoom(id) {
  return createRequest('ClassRoom', 'Delete', { id });
}

export function readClassRoom(id) {
  return createRequest('ClassRoom', 'Read', { id });
}

export function readAllClassRoom() {
  return createRequest('ClassRoom', 'ReadAll', {});
}
