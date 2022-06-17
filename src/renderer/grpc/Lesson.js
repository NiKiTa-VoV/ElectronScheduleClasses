import { createRequest } from './GrpcUtil';

const noEdit = '#NOEDIT';

export function readAvailableLessons(teacherId) {
  return createRequest('Lesson', 'ReadAvailableLessonsTeacher', { teacherId });
}
