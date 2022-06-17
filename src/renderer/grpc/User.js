import { createRequest } from './GrpcUtil';

export function Authorization(login, password) {
  return createRequest('User', 'Authorization', { login, password });
}
