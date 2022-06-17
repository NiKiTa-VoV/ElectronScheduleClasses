import { createRequest } from './GrpcUtil';

export function TeacherWorkload() {
  return createRequest('Report', 'TeacherWorkload', {});
}
