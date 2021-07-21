let _db = require('../../database/users');

module.exports = {
  async getUsers(page, limit) {
    const err = false;
    return new Promise((resolve, reject) => { // Obtener usuarios desde la base de datos según parámetros
      if (err) {
        reject(err);
      } else {
        resolve(_db.sort((a, b) => a.id - b.id).slice((page * limit - limit), (page * limit)));
      }
    });
  },

  async createUser(user) {
    const err = false;
    return new Promise((resolve, reject) => { // Crear usuario en la base de datos
      if (err) {
        reject(err);
      } else {
        if (_db.find(item => item.user === user.user || item.email === user.email)) {
          resolve(false); // Usuario existente, se validan propiedades user o email
        } else {
          const ordered = _db.sort((a, b) => a.id - b.id);
          _db.push({ id: ordered[ordered.length - 1].id + 1, ...user });
          resolve(true);
        }
      }
    });
  },

  async readUser(id) {
    const err = false;
    return new Promise((resolve, reject) => { // Obtener usuario desde la base de datos según parámetro
      if (err) {
        reject(err);
      } else {
        resolve(_db.find(item => item.id == id));
      }
    });
  },

  async updateUser(id, user, pass, email) {
    const err = false;
    return new Promise((resolve, reject) => { // Actualizar usuario en la base de datos
      if (err) {
        reject(err);
      } else {
        _db = _db.map(item => item.id == id ? { user, pass, email } : item);
        resolve(true);
      }
    });
  },

  async deleteUser(id) {
    const err = false;
    return new Promise((resolve, reject) => { // Eliminar usuario en la base de datos
      if (err) {
        reject(err);
      } else {
        const index = _db.findIndex(item => item.id == id);
        if (index > -1) {
          _db.splice(index, 1);
          resolve(true);
        } else {
          resolve(false);
        }
      }
    });
  }
};