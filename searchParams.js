const {URL}  = require('url');

const myURL = new URL('http://gilbut.co.kr/?page=3&limit=10&category=nodejs&category=javascript');
console.log('searchParams:', myURL.searchParams);
console.log('searchParams.getAll()' : myURL.searchParams.getAll('category'));
console.log('',searchParams.get('limit'));
console.log('' )