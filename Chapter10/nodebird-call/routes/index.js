const express = require('express');
const axios = require('axios');

const router = express.Router();
const URL = 'http://localhost:8002/v1';

axios.defaults.headers.origin = 'http://localhost:8003'
const request = async (req, api) => {
  try {

    console.log(req.session.jwt);
    if (!req.session.jwt) {
      //세션에 토큰이 없을시
      const tokenResult = await axios.post(`${URL}/token`, {
        clientSecret: process.env.CLIENT_SECRET,
      });
      console.log('토큰결과 :' ,tokenResult.data.token);
      req.session.jwt = tokenResult.data.token; //세션에 토큰저장
    }
    console.log('req.session.jwt:', req.session.jwt);
    console.log('apiget: ', URL,api);
    const axios_result = await axios.get(`${URL}${api}`, {headers: { authorization: req.session.jwt }}); // API 요청

    console.log('axiosreuslt =' , axios_result);
    return axios_result;
  
  } catch (error) {
    console.error(error);
    if (error.response.status < 500) {
      return error.response;
    }

    console.log('API 요청에러');
    throw error;
  }
};

router.get('/mypost', async (req, res, next) => {
  try {
    const result = await request(req, '/posts/my');
    res.json(result.data);
  } catch (error) {
    console.log('myPost 에러');
    console.error(error);
    next(error);
  }
});

router.get('/search/:hashtag', async (req, res, next) => {
  try {

      console.log(encodeURIComponent(req.params.hashtag));
      const result = await request(req, `/posts/hashtag/${encodeURIComponent(req.params.hashtag)}`);
      res.json(result.data);
  } catch (error) {
    console.log('/search/:hashtag 에러');
      console.error(error);
      next(error);
  }
});

router.get('/test', async (req, res, next) => {
  try {
    if (!req.session.jwt) {
      // 세션에 토큰이없으면
      const tokenResult = await axios.post('http://localhost:8002/v1/token', {
        clientSecret: process.env.CLIENT_SECRET,
      });

      if (tokenResult.data && tokenResult.data.code === 200) {
        //토큰 발급 성공
        //console.log(tokenResult.data.token);
        req.session.jwt = tokenResult.data.token; //세션에 토큰 저장
      } else {
        //토큰 발급 실패
        return res.json(tokenResult.data); //발급 실패 사유 응답
      }
    }
    const result = await axios.get('http://localhost:8002/v1/test', {
      headers: { authorization: req.session.jwt },
    });
    return res.json(result.data);
  } catch (error) {
    console.error(error);
    if (error.response.status === 419) {
      //토큰 만료시
      return res.json(error.response.data);
    }
    return next(error);
  }
});

module.exports = router;
