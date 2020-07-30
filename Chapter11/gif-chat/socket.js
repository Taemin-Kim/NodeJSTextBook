const SocketIO = require('socket.io');
const axios = require('axios');

module.exports = (server, app, sessionMiddleware) => {
  const io = SocketIO(server, { path: '/socket.io' });
  app.set('io', io);

  const room = io.of('/room');
  const chat = io.of('/chat');

  io.use((socket, next) => {
    sessionMiddleware(socket.request, socket.request.res, next);
    });

  room.on('connection', (socket) => {
    console.log('room 네임스페이스에 접속');
    socket.on('disconnect', () => {
     console.log('room 네임스페이스 접속 해제');
    });
  });

  chat.on('connection', (socket) => {
    console.log('chat 네임스페이스에 접속');
    const req = socket.request;
    const { headers: { referer } } = req;
    const roomId = referer
    .split('/')[referer.split('/').length - 1]
    .replace(/\?.+/, '');

    socket.join(roomId);
    socket.to(roomId).emit('join', {
      user: 'system',
      chat: `${req.session.color}님이 입장하셨습니다.`,
    });
    socket.on('disconnect', () => {
        console.log('chat 네임스페이스 접속 해제');
        socket.leave(roomId);
        const currentRoom = socket.adapter.rooms[roomId];
        const userCount = currentRoom ? currentRoom.length : 0;
        if (userCount === 0) {
          axios.delete(`http://localhost:8005/room/${roomId}`)
            .then(() => {
              console.log('방 제거 요청 성공');
            })
            .catch((error) => {
              console.error(error);
            });
        } else {
          socket.to(roomId).emit('exit', {
            user: 'system',
            chat: `${req.session.color}님이 퇴장하셨습니다.`,
          });
        }
      });
  });
};

// module.exports = (server) => {
//   console.log(server);
//   const io = SocketIO(server, { path: '/socket.io' });

//   io.on('connection', (socket) => {
//     //connection 이벤트는 클라이언트가 접속햇을때 발생하는 이벤트로 socket 객체를 제공
//     const req = socket.request;
//     const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

//     console.log('새로운 클라이언트 접속', ip, socket.id, req.ip);

//     socket.on('disconnect', () => {
//       console.log('클라이언트 접속 해제', ip, socket.id);
//       clearInterval(socket.interval);
//     });

//     socket.on('error', (error) => {
//       console.error(error);
//     });

//     socket.on('reply', (data) => {
//       console.log(data);
//     });

//     socket.interval = setInterval(() => {
//       //클라이언트에게 3초마다 메시지 보냄
//       socket.emit('news', 'Hello Scoket.IO');
//     }, 3000);
//   });
// };

// const webSocket = require('ws');

// module.exports = (server) => {
//     const wss = new webSocket.Server({server});

//     wss.on('connection', (ws, req)=> {
//         const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
//         console.log('새로운 클라이언트 접속', ip);

//         //웹소켓이 연결이 되면 이벤트리스너를 갖다붙임
//         ws.on('message', (message) => {
//             console.log(message);
//         });

//         ws.on('error', (error) => {
//             console.error(error);
//         });

//         ws.on('close', () => {
//             console.log('클라이언트 접속 해제', ip);
//             clearInterval(ws.interval);
//         });

//         const interval = setInterval(() => {    //클라이언트에게 3초마다 메시지 보냄
//             if(ws.readyState === ws.OPEN ){
//                 ws.send('서버에서 클라이언트로 메시지를 보냅니다.');
//             }
//         }, 3000);
//         ws.interval = interval;
//     });
// };
