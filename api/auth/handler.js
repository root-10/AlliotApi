const _datastore = require('./datastore');
const _utils = require('../../services/utils');

module.exports = {
  async postLogin(req, res) {
    if (!req.body.user || !req.body.pass) return res.sendStatus(400);
    try {
      let user = await _datastore.postLogin(req.body.user, req.body.pass);
      if (user) {
        let u = JSON.parse(JSON.stringify(user));
        delete u.pass;
        return res.send({ ...u, login_date: _utils.getCurrentDate(), login_timestamp: _utils.getTimestamp() });
      } else {
        return res.sendStatus(400);
      }
    } catch {
      return res.sendStatus(500);
    }
  }
};