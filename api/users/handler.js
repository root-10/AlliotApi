const _datastore = require('./datastore');
const _utils = require('../../services/utils');

module.exports = {
  async getUsers(req, res) {
    if (!req.query.page || !req.query.limit) return res.sendStatus(400);
    try {
      const page = parseInt((req.query.page || 1).toString(), 10);
      const limit = parseInt((req.query.limit || 10).toString(), 10);
      const users = await _datastore.getUsers(page, limit);
      if (users.length) {
        return res.send(users);
      } else {
        return res.sendStatus(400);
      }
    } catch {
      return res.sendStatus(500);
    }
  },

  async createUser(req, res) {
    if (!req.body.user || !req.body.pass || !req.body.email) return res.sendStatus(400);
    try {
      const response = await _datastore.createUser({
        user: req.body.user,
        pass: req.body.pass,
        email: req.body.email,
        date: _utils.getCurrentDate(),
        timestamp: _utils.getTimestamp(),
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

  async readUser(req, res) {
    if (!req.params.id) return res.sendStatus(400);
    try {
      const user = await _datastore.readUser(req.params.id);
      if (user) {
        return res.send(user);
      } else {
        return res.sendStatus(400);
      }
    } catch {
      return res.sendStatus(500);
    }
  },

  async updateUser(req, res) {
    if (!req.params.id || !req.body.user || !req.body.pass || !req.body.email) return res.sendStatus(400);
    try {
      const response = await _datastore.updateUser(req.params.id, req.body.user, req.body.pass, req.body.email);
      if (response) {
        return res.sendStatus(200);
      } else {
        return res.sendStatus(400);
      }
    } catch {
      return res.sendStatus(500);
    }
  },

  async deleteUser(req, res) {
    if (!req.params.id) return res.sendStatus(400);
    try {
      const response = await _datastore.deleteUser(req.params.id);
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