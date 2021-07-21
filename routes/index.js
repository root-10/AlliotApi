const express = require('express');

const auth = require('../api/auth/routes');
const users = require('../api/users/routes');
const requirements = require('../api/requirements/routes');

const router = express.Router();

router.get('/', (req, res) => {
  res.json({ message: 'Welcome to AlliotApi' });
});
router.use('/auth', auth);
router.use('/users', users);
router.use('/requirements', requirements);

module.exports = router;