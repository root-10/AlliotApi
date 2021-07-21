const express = require('@awaitjs/express');

const handler = require('./handler');

const router = express.Router();

router.getAsync('/', handler.getUsers);
router.postAsync('/', handler.createUser);
router.getAsync('/:id', handler.readUser);
router.patchAsync('/:id', handler.updateUser);
router.deleteAsync('/:id', handler.deleteUser);

module.exports = router;