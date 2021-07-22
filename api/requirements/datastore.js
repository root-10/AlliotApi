let _db = require('../../database/requirements');

module.exports = {
  async getRequirements(page, limit) { // Obtener los requerimientos desde la base de datos según los parámetros
    const err = false;
    return new Promise((resolve, reject) => {
      if (err) {
        reject(err);
      } else {
        resolve(_db.sort((a, b) => a.id - b.id).slice((page * limit - limit), (page * limit)));
      }
    });
  },

  async createRequirement(requirement) { // Crear requerimiento en la base de datos
    const err = false;
    return new Promise((resolve, reject) => {
      if (err) {
        reject(err);
      } else {
        const ordered = _db.sort((a, b) => a.id - b.id);
        _db.push({ id: ordered[ordered.length - 1].id + 1, ...requirement });
        resolve(true);
      }
    });
  },

  async readRequirement(id) { // Obtener requerimiento desde la base de datos según el id
    const err = false;
    return new Promise((resolve, reject) => {
      if (err) {
        reject(err);
      } else {
        resolve(_db.find(item => item.id == id));
      }
    });
  },

  async updateRequirement(id, title, description) { // Actualizar requerimiento en la base de datos
    const err = false;
    return new Promise((resolve, reject) => {
      if (err) {
        reject(err);
      } else {
        const index = _db.findIndex(item => item.id == id);
        if (index > -1) {
          _db[index] = { ..._db[index], title, description };
          resolve(true);
        } else {
          resolve(false);
        }
      }
    });
  },

  async deleteRequirement(id) { // Eliminar requerimiento en la base de datos
    const err = false;
    return new Promise((resolve, reject) => {
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
  },

  async getRequirementsQuantity() { // Obtener la cantidad de requerimientos
    const err = false;
    return new Promise((resolve, reject) => {
      if (err) {
        reject(err);
      } else {
        console.log(_db.length);
        resolve(_db.length);
      }
    });
  },

  async createRequirementComment(comment) {
    const err = false;
    return new Promise((resolve, reject) => {
      if (err) {
        reject(err);
      } else {
        const index = _db.findIndex(item => item.id == comment.id);
        if (index > -1) {
          const ordered = _db[index].comments.sort((a, b) => a.id - b.id);
          _db[index].comments.push({ ...comment, id: ordered[ordered.length - 1].id + 1 });
          resolve(true);
        } else {
          resolve(false);
        }
      }
    });
  },

  async updateRequirementComment(id, commentId, description) {
    const err = false;
    return new Promise((resolve, reject) => {
      if (err) {
        reject(err);
      } else {
        const index = _db.findIndex(item => item.id == id);
        if (index > -1) {
          const subindex = _db[index].comments.findIndex(item => item.id == commentId);
          if (subindex > -1) {
            _db[index].comments[subindex] = { ..._db[index].comments[subindex], description };
            resolve(true);
          } else {
            resolve(false);
          }
        } else {
          resolve(false);
        }
      }
    });
  },

  async deleteRequirementComment(id, commentId) {
    const err = false;
    return new Promise((resolve, reject) => {
      if (err) {
        reject(err);
      } else {
        const index = _db.findIndex(item => item.id == id);
        if (index > -1) {
          const subindex = _db[index].comments.findIndex(item => item.id == commentId);
          if (subindex > -1) {
            _db[index].comments.splice(subindex, 1);
            resolve(true);
          } else {
            resolve(false);
          }
        } else {
          resolve(false);
        }
      }
    });
  },

  async updateRequirementVote(id, userId, old, vote) { // Actualizar las votaciones en el requerimiento en la base de datos
    const err = false;
    return new Promise((resolve, reject) => {
      if (err) {
        reject(err);
      } else {
        const index = _db.findIndex(item => item.id == id);
        if (index > -1) {
          if (old) {
            _db[index].vote[old] = _db[index]?.vote?.[old]?.filter(id => id != userId);
          }
          if (vote === 0 || vote === 1) {
            _db[index].vote[`${vote === 1 ? 'positive' : 'negative'}`]?.unshift(userId);
          }
          resolve(true);
        } else {
          resolve(false);
        }
      }
    });
  }
};