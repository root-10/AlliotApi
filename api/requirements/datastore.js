let _db = require('../../database/requirements');
let _usersDb = require('../../database/users');

module.exports = {
  async getRequirements(page, limit, option) { // Obtener los requerimientos desde la base de datos según los parámetros
    const err = false;
    return new Promise((resolve, reject) => {
      if (err) {
        reject(err);
      } else {
        let requirements = [];
        switch (option) {
          case 1:
            const pos = JSON.parse(JSON.stringify(_db.map((req) => ({ ...req, positive: req.vote.positive.length }))));
            requirements = JSON.parse(JSON.stringify(pos.sort((a, b) => b.positive - a.positive).slice((page * limit - limit), (page * limit))));
            requirements.forEach((req) => { delete req.positive });
            break;
          case 2:
            const neg = JSON.parse(JSON.stringify(_db.map((req) => ({ ...req, negative: req.vote.negative.length }))));
            requirements = JSON.parse(JSON.stringify(neg.sort((a, b) => b.negative - a.negative).slice((page * limit - limit), (page * limit))));
            requirements.forEach((req) => { delete req.negative });
            break;
          case 3:
            requirements = JSON.parse(JSON.stringify(_db.sort((a, b) => a.title.toUpperCase() < b.title.toUpperCase() ? -1 : a.title.toUpperCase() > b.title.toUpperCase() ? 1 : 0).slice((page * limit - limit), (page * limit))));
            break;
          case 4:
            requirements = JSON.parse(JSON.stringify(_db.sort((a, b) => a.title.toUpperCase() > b.title.toUpperCase() ? -1 : a.title.toUpperCase() < b.title.toUpperCase() ? 1 : 0).slice((page * limit - limit), (page * limit))));
            break;
          default:
            requirements = JSON.parse(JSON.stringify(_db.sort((a, b) => a.id - b.id).slice((page * limit - limit), (page * limit))));
        }
        requirements.forEach((requirement) => {
          requirement.comments = requirement.comments.map((comment) => ({ ...comment, ..._usersDb.find((user) => user.id === comment.creator) }));
          requirement.vote.positive = requirement.vote.positive.map((vote) => ({ ..._usersDb.find((user) => user.id === vote) }));
          requirement.vote.negative = requirement.vote.negative.map((vote) => ({ ..._usersDb.find((user) => user.id === vote) }));
        });
        resolve(requirements);
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
        let requirement = JSON.parse(JSON.stringify(_db.find(item => item.id == id)));
        requirement.comments = requirement.comments.map((comment) => ({ ...comment, ..._usersDb.find((user) => user.id === comment.creator) }));
        requirement.vote.positive = requirement.vote.positive.map((vote) => ({ ..._usersDb.find((user) => user.id === vote) }));
        requirement.vote.negative = requirement.vote.negative.map((vote) => ({ ..._usersDb.find((user) => user.id === vote) }));
        resolve(requirement);
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
        console.log('index', index);
        if (index > -1) {
          const ordered = _db[index].comments.sort((a, b) => a.id - b.id);
          _db[index].comments.push({ ...comment, id: ordered.length ? ordered[ordered.length - 1].id + 1 : 1 });
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