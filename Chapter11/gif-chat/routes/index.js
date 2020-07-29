const express = require('express');
const { route } = require('../../../Chapter10/noebird-api/routes');

const router = express.Router();

router.get('/', (req, res) => {
    res.render('index');
});

module.exports = router;