const _datastore = require('./datastore');
const _utils = require('../../services/utils');

module.exports = {
  async postLogin(req, res) {
    if (!req.body.user || !req.body.pass) return res.sendStatus(400);
    try {
      const user = await _datastore.postLogin(req.body.user, req.body.pass);
      if (user) {
        return res.send({ ...user, login_date: _utils.getCurrentDate(), login_timestamp: _utils.getTimestamp() });
      } else {
        return res.sendStatus(400);
      }
    } catch {
      return res.sendStatus(500);
    }
  }
};