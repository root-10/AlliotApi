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
        date: _utils.getCurrentDate(),
        timestamp: _utils.getTimestamp(),
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
    if (!req.params.id || !req.body.creator || !req.body.title || !req.body.description) return res.sendStatus(400);
    try {
      const response = await _datastore.updateRequirement(req.params.id, req.body.creator, req.body.title, req.body.description);
      if (response) {
        return res.sendStatus(200);
      } else {
        return res.sendStatus(400);
      }
    } catch (e) {
      console.log(e);
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
  }
};