let _db = require('../../database/requirements');

module.exports = {
  async getRequirements(page, limit) {
    const err = false;
    return new Promise((resolve, reject) => { // Obtener requerimientos desde la base de datos según parámetros
      if (err) {
        reject(err);
      } else {
        resolve(_db.sort((a, b) => a.id - b.id).slice((page * limit - limit), (page * limit)));
      }
    });
  },

  async createRequirement(requirement) {
    const err = false;
    return new Promise((resolve, reject) => { // Crear requerimiento en la base de datos
      if (err) {
        reject(err);
      } else {
        const ordered = _db.sort((a, b) => a.id - b.id);
        _db.push({ id: ordered[ordered.length - 1].id + 1, ...requirement });
        console.log('_db', _db);
        resolve(true);
      }
    });
  },

  async readRequirement(id) {
    const err = false;
    return new Promise((resolve, reject) => { // Obtener requerimiento desde la base de datos según parámetro
      if (err) {
        reject(err);
      } else {
        resolve(_db.find(item => item.id == id));
      }
    });
  },

  async updateRequirement(id, creator, title, description) {
    const err = false;
    return new Promise((resolve, reject) => { // Actualizar requerimiento en la base de datos
      if (err) {
        reject(err);
      } else {
        _db = _db.map(item => item.id == id ? { ...item, creator, title, description } : item);
        console.log('_db', _db);
        resolve(true);
      }
    });
  },

  async deleteRequirement(id) {
    const err = false;
    return new Promise((resolve, reject) => { // Eliminar requerimiento en la base de datos
      if (err) {
        reject(err);
      } else {
        const index = _db.findIndex(item => item.id == id);
        if (index > -1) {
          _db.splice(index, 1);
          console.log('_db', _db);
          resolve(true);
        } else {
          resolve(false);
        }
      }
    });
  }
};