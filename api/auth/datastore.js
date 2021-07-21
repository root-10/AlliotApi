let _db = require('../../database/users');

module.exports = {
  async postLogin(user, pass) { // Obtener los requerimientos desde la base de datos según los parámetros
    const err = false;
    return new Promise((resolve, reject) => {
      if (err) {
        reject(err);
      } else {
        resolve(_db.find(item => item.user === user && item.pass === pass));
      }
    });
  }
};