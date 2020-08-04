const SSE = require('sse');

module.exports = (server) => {
    const sse = new SSE(server);// 익스프레스 서버 객채로 SSE 생성
    sse.on('connection', (client) => {  //생성한 객체에 'connection' 리스너를 붙임
        setInterval(() => {
            client.send(Date.now().toString());    //1초마다 클라이언트에게 send 
        }, 1000);
    });
}

