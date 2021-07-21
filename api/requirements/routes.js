const express = require('@awaitjs/express');

const handler = require('./handler');

const router = express.Router();

router.getAsync('/', handler.getRequirements);
router.postAsync('/', handler.createRequirement);
router.getAsync('/:id', handler.readRequirement);
router.patchAsync('/:id', handler.updateRequirement);
router.deleteAsync('/:id', handler.deleteRequirement);

module.exports = router;