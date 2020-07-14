const http = require('http');
const fs = require('fs');

const users = {};

http.createServer((request, response) => {
    if('GET' === request.method){
        if('/' === request.url){
            return fs.readFile('./restFront.html', (error, data) => {
                if(error){
                    throw error;
                }
                response.end(data);
            });
        }else if('/about' === request.url){
            return fs.readFile('./about.html', (error, data ) => {
                if(error){
                    throw error;
                }
                response.end(data);
            });
        }else if('/users' === request.url){
            return response.end(JSON.stringify(users));
        }
        return fs.readFile(`.${request.url}`, (error, data) => {
            if(error){
                response.writeHead(404, 'NOT FOUND');
                return response.end('NOT FOUND');
            }
            return response.end(data);
        });
        
    }else if('POST' === request.method){
        if('/users' === request.url){
            let body = '';
            request.on('data', (data) => {
                body += data;
            });
            return request.on('end', () => {
                console.log('POST 본문(body):', body);
                const {name} = JSON.parse(body);
                const id = Date.now();
                users[id] = name;
                response.writeHead(201);
                response.end('등록성공!');
            });
        }
    }else if('PUT' === request.method){
        if(request.url.startsWith('/users/')){
            const key = request.url.split('/')[2];
            let body = '';
            request.on('data', (data) => {
                body += data;
            });
            return request.on('end', () => {
                console.log('PUT 본문(body):', body);
                users[key] = JSON.parse(body).name;
                return response.end(JSON.stringify(users));
            });
        }
    }else if('DELETE' === request.method){
        if(request.url.startsWith('/users/')){
            const key = request.url.split('/')[2];
            delete users[key];
            return response.end(JSON.stringify(users));
        }
    }
    response.writeHead(404, 'NOT FOUND');
    return response.end('NOT FOUND')
})
.listen(8085, () => {
    console.log('8085번 포트에서 서버가 대기 중입니다');
});