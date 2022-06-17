import { createRequest } from './GrpcUtil';

const noEdit = '#NOEDIT';

export function createSchedule(row, date) {
  return createRequest('Schedule', 'Create', {
    teacherId: row.teacherId,
    date: date.getTime(),
    lessons: [...row.lessons.responses],
  });
}

export function editSchedule(oldRow, newRow) {
  const args = {
    id: newRow.id,
    name: oldRow.name === newRow.name ? noEdit : newRow.name,
  };
  return createRequest('Schedule', 'Edit', args);
}

export function deleteSchedule(id) {
  return createRequest('Schedule', 'Delete', { id });
}

export function readSchedule(id) {
  return createRequest('Schedule', 'Read', { id });
}

export function readAllSchedule() {
  return createRequest('Schedule', 'ReadAll', {});
}

export function ReadDefaults(date) {
  const dateString = `${date.getFullYear()}-${
    date.getMonth() + 1
  }-${date.getDate()}`;
  return createRequest('Schedule', 'ReadDefaults', { date: dateString });
}
