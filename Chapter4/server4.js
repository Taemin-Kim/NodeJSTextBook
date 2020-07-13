const http = require('http');
const fs = require('fs');
const url = require('url');
const qs = require('querystring');


// const parseCookies = (cookie = '') => {
//     cookie
//     .split(";")
//     .map(v => v.split("="))
//     .reduce((acc, [k, v]) => {
//       acc[k.trim()] = decodeURIComponent(v);
//       console.log(acc);
//       return acc; 
//     }, {});
//   };

//위와 같은 짓하지말것 map 데이터를 뱉어야하는데 배열형태가 되버림
const parseCookies = (cookie = '') =>
  cookie
    .split(';')
    .map(v => v.split('='))
    .reduce((acc, [k, v]) => {
      acc[k.trim()] = decodeURIComponent(v);
      return acc;
    }, {});


http.createServer((req, res) => {
    const cookies = parseCookies(req.headers.cookie);
    if (req.url.startsWith('/login')) {
      const { query } = url.parse(req.url);
      const { name } = qs.parse(query);
      const expires = new Date();
      expires.setMinutes(expires.getMinutes() + 5);
      res.writeHead(302, {
        Location: '/', 'Set-Cookie': `name=${encodeURIComponent(name)}; Expires=${expires.toGMTString()}; HttpOnly; Path=/`,
      });
      res.end();
    } else if (cookies.name) {
      res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
      res.end(`${cookies.name}님 안녕하세요.`);
    } else {
      fs.readFile('./server4.html', (err, data) => {
        if (err) {
          throw err;
        }
        res.end(data);
      });
    }
  })
  .listen(8083, () => {
    console.log("8083Port Waiting");
  });
