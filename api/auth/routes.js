const express = require('@awaitjs/express');

const handler = require('./handler');

const router = express.Router();

router.postAsync('/login', handler.postLogin);

module.exports = router;