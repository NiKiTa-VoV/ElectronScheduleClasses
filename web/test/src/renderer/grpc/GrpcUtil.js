export function createRequest(clientName, method, ...params) {
  return fetch(`http://${window.location.hostname}:8091/`, {
    method: 'POST',
    body: JSON.stringify([clientName, method, ...params]),
  })
    .then((res) => res.json());
}
