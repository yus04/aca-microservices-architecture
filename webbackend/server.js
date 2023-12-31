import express from 'express';
import http from 'http';
import { Server } from "socket.io";
import bodyParser from 'body-parser';

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });
// JSONボディをパースするためのミドルウェアを追加
app.use(bodyParser.json());
const PORT = 5000;

function connectWebFrontend(server, io, PORT){
  // WebSocketを介してクライアント側に接続したときに実行
  io.on('connection', (socket) => {
    console.log('Client connected');

    // クライアントが切断した場合に実行
    socket.on('disconnect', () => {
      console.log('Client disconnected');
    });
  });

  // サーバーを起動する
  server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

function connectDapr(app, io){
  // Daprからのメッセージを受け取るエンドポイントを追加
  app.post('/dapr/subscribe', (req, res) => {
    console.log('Received Dapr POST request:', req.body);
    const fruits_inventory = req.body;
    io.emit('countup', fruits_inventory);
    res.status(200).send('OK');
  });
}

app.post('/test', (req, res) => {
  console.log('Received Test POST request:', req.body);
  res.status(200).send('OK');
});

connectWebFrontend(server, io, PORT);
connectDapr(app, io);
