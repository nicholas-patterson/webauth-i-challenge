const db = require("../data/db-config");
module.exports = {
  find,
  findBy,
  findById,
  register
};

function find() {
  return db("users");
}

function findBy(filter) {
  return db("users")
    .where(filter)
    .first();
}

function findById(id) {
  return db("users")
    .where({ id })
    .first();
}

function register(user) {
  return db("users")
    .insert(user)
    .then(([id]) => {
      return findById(id);
    });
}
