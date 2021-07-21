const express = require('express');

const users = require('../api/users/routes');
const requirements = require('../api/requirements/routes');

const router = express.Router();

router.get('/', (req, res) => {
  res.json({ message: 'Welcome to AlliotApi', environment: process.env.NODE_ENV });
});
router.use('/users', users);
router.use('/requirements', requirements);

module.exports = router;