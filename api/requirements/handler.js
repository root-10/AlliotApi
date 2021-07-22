const _datastore = require('./datastore');
const _utils = require('../../services/utils');

module.exports = {
  async getRequirements(req, res) {
    if (!req.query.page || !req.query.limit) return res.sendStatus(400);
    try {
      const page = parseInt((req.query.page || 1).toString(), 10);
      const limit = parseInt((req.query.limit || 10).toString(), 10);
      const requirements = await _datastore.getRequirements(page, limit);
      if (requirements.length) {
        return res.send(requirements);
      } else {
        return res.sendStatus(400);
      }
    } catch {
      return res.sendStatus(500);
    }
  },

  async createRequirement(req, res) {
    if (!req.body.creator || !req.body.title || !req.body.description) return res.sendStatus(400);
    try {
      const response = await _datastore.createRequirement({
        creator: req.body.creator,
        creation_date: _utils.getCurrentDate(),
        creation_timestamp: _utils.getTimestamp(),
        title: req.body.title,
        description: req.body.description,
        vote: [],
        comments: []
      });
      if (response) {
        return res.sendStatus(200);
      } else {
        return res.sendStatus(400);
      }
    } catch {
      return res.sendStatus(500);
    }
  },

  async readRequirement(req, res) {
    if (!req.params.id) return res.sendStatus(400);
    try {
      const requirement = await _datastore.readRequirement(req.params.id);
      if (requirement) {
        return res.send(requirement);
      } else {
        return res.sendStatus(400);
      }
    } catch {
      return res.sendStatus(500);
    }
  },

  async updateRequirement(req, res) {
    if (!req.params.id || !req.body.title || !req.body.description) return res.sendStatus(400);
    try {
      const response = await _datastore.updateRequirement(req.params.id, req.body.title, req.body.description);
      if (response) {
        return res.sendStatus(200);
      } else {
        return res.sendStatus(400);
      }
    } catch (e) {
      return res.sendStatus(500);
    }
  },

  async deleteRequirement(req, res) {
    if (!req.params.id) return res.sendStatus(400);
    try {
      const response = await _datastore.deleteRequirement(req.params.id);
      if (response) {
        return res.sendStatus(200);
      } else {
        return res.sendStatus(400);
      }
    } catch {
      return res.sendStatus(500);
    }
  },

  async getRequirementsQuantity(req, res) {
    try {
      const quantity = await _datastore.getRequirementsQuantity();
      return res.send({ quantity });
    } catch {
      return res.sendStatus(500);
    }
  },

  async createRequirementComment(req, res) {
    if (!req.body.id || !req.body.creator || !req.body.description) return res.sendStatus(400);
    try {
      const response = await _datastore.createRequirementComment({
        id: req.body.id,
        creator: req.body.creator,
        creation_date: _utils.getCurrentDate(),
        creation_timestamp: _utils.getTimestamp(),
        description: req.body.description
      });
      if (response) {
        return res.sendStatus(200);
      } else {
        return res.sendStatus(400);
      }
    } catch (e) {
      return res.sendStatus(500);
    }
  },

  async updateRequirementComment(req, res) {
    if (!req.params.id || !req.params.commentId || !req.body.description) return res.sendStatus(400);
    try {
      const response = await _datastore.updateRequirementComment(req.params.id, req.params.commentId, req.body.description);
      if (response) {
        return res.sendStatus(200);
      } else {
        return res.sendStatus(400);
      }
    } catch (e) {
      return res.sendStatus(500);
    }
  },

  async deleteRequirementComment(req, res) {
    if (!req.params.id || !req.params.commentId) return res.sendStatus(400);
    try {
      const response = await _datastore.deleteRequirementComment(req.params.id, req.params.commentId);
      if (response) {
        return res.sendStatus(200);
      } else {
        return res.sendStatus(400);
      }
    } catch {
      return res.sendStatus(500);
    }
  },

  async updateRequirementVote(req, res) {
    if (req.body.old) {
      if (req.body.old !== 'positive' && req.body.old !== 'negative') return res.sendStatus(400);
    }
    if (!req.params.id || !req.body.id) return res.sendStatus(400);
    try {
      const response = await _datastore.updateRequirementVote(req.params.id, req.body.userId, req.body.old, req.body.vote);
      if (response) {
        return res.sendStatus(200);
      } else {
        return res.sendStatus(400);
      }
    } catch (e) {
      return res.sendStatus(500);
    }
  }
};