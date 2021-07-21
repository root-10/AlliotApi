const express = require('@awaitjs/express');

const handler = require('./handler');

const router = express.Router();

router.getAsync('/', handler.getRequirements);
router.postAsync('/', handler.createRequirement);
router.getAsync('/:id', handler.readRequirement);
router.patchAsync('/:id', handler.updateRequirement);
router.deleteAsync('/:id', handler.deleteRequirement);

router.postAsync('/comments', handler.createRequirementComments);
router.patchAsync('/comments/:id', handler.updateRequirementComments);
router.deleteAsync('/comments/:id', handler.deleteRequirementComments);

router.patchAsync('/vote/:id', handler.updateRequirementVote);

module.exports = router;