const express = require('@awaitjs/express');

const handler = require('./handler');

const router = express.Router();

router.getAsync('/', handler.getRequirements);
router.postAsync('/', handler.createRequirement);
router.getAsync('/:id', handler.readRequirement);
router.patchAsync('/:id', handler.updateRequirement);
router.deleteAsync('/:id', handler.deleteRequirement);

router.postAsync('/comments', handler.createRequirementComment);
router.patchAsync('/comments/:id', handler.updateRequirementComment);
router.deleteAsync('/comments/:id/:commentId', handler.deleteRequirementComment);

router.patchAsync('/votes/:id', handler.updateRequirementVote);

module.exports = router;