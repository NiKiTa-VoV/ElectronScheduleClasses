export const activeRequests = new Map();
export let lastId = 0;

window.electron.ipcRenderer.on('grpc-response', (arg) => {
  const { requestId, grpcResponse } = arg;
  console.log(requestId);
  const [resolve] = activeRequests.get(requestId);
  resolve(grpcResponse);
});

export function nextId() {
  lastId += 1;
  return lastId;
}

export function createRequest(clientName, method, ...params) {
  const id = nextId();
  const promise = new Promise((resolve, reject) =>
    activeRequests.set(id, [resolve, reject])
  );

  window.electron.ipcRenderer.sendMessage('grpc-request', [
    id,
    clientName,
    method,
    ...params,
  ]);

  return promise;
}
