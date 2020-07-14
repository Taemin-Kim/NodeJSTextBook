const cluster = require('cluster');
const http = require('http');
const numCPUs = require('os').cpus().length;

if(cluster.isMaster){
    console.log(`마스터 프로세스 아이디 : ${process.pid}`);
    //CPU개수만큼 워커 생산
    for(let i=0; i < numCPUs; i++)
    {
        cluster.fork();
    }
    cluster.on('exit', (worker,code,signal) => {
        console.log(`${worker.process.pid}번 워커가 종료`);
        cluster.fork(); //워커가 종료시 워커 새로생성 
    });
    

}else {

    http.createServer((request, response) => {
        response.write('<h1>Hello Node!</h1>');
        response.end('<p>Hello Cluster!</p>');
        setTimeout(() => {
            process.exit(1);
        }, 1000);

    }).listen(8085);

    console.log(`${process.pid}번 워커 실행`);
}

