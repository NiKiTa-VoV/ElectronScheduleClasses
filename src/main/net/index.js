import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';
import { ipcMain } from 'electron';
import { createServer } from 'http';

const PROTO_PATH_BASE = 'E:\\projectJava\\ScheduleClasses\\src\\main\\proto\\';

function loadProto(fileName) {
  return grpc.loadPackageDefinition(
    protoLoader.loadSync(`${PROTO_PATH_BASE}${fileName}`, {
      keepCase: true,
      longs: String,
      enums: String,
      defaults: true,
      oneofs: true,
    })
  );
}

function initClient(Client) {
  return new Client('localhost:8080', grpc.credentials.createInsecure());
}

const clients = {
  Department: initClient(loadProto('department.proto').department.Department),
  Specialization: initClient(
    loadProto('specialization.proto').specialization.Specialization
  ),
  Group: initClient(loadProto('group.proto').group.Group),
  Subject: initClient(loadProto('subject.proto').subject.Subject),
  Curriculum: initClient(loadProto('curriculum.proto').curriculum.Curriculum),
  Teacher: initClient(loadProto('teacher.proto').teacher.Teacher),
  ClassRoom: initClient(loadProto('classRoom.proto').classRoom.ClassRoom),
  Schedule: initClient(loadProto('schedule.proto').schedule.Schedule),
  Lesson: initClient(loadProto('lesson.proto').lesson.Lesson),
  Report: initClient(loadProto('report.proto').report.Report),
  User: initClient(loadProto('user.proto').user.User),
};

export default clients;

function handle(clientName, method, ...params) {
  return new Promise((resolve, reject) =>
    clients[clientName][method](...params, (err, response) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(response);
    })
  );
}

ipcMain.on('grpc-request', async (event, [requestId, ...args]) => {
  return handle(...args)
    .then((grpcResponse) =>
      event.reply('grpc-response', { requestId, grpcResponse })
    )
    .catch((error) => event.reply('grpc-response-error', { requestId, error }));
});

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': '*',
};

const server = createServer((req, res) => {
  if (req.method !== 'POST') {
    res.writeHead(200, corsHeaders).end('Hello world!');
    return;
  }

  const data = [];

  req.on('data', (chunk) => {
    data.push(chunk);
  });

  req.on('end', () => {
    const body = JSON.parse(Buffer.concat(data).toString());
    handle(...body)
      .then((grpcResponse) => {
        res.writeHead(200, {
          'Content-Type': 'application/json',
          ...corsHeaders,
        });
        res.end(JSON.stringify(grpcResponse));
        return undefined;
      })
      .catch((error) => {
        res.writeHead(500, {
          'Content-Type': 'application/json',
          ...corsHeaders,
        });
        res.end(JSON.stringify({ error }));
      });
  });
});

server.listen(8091);
