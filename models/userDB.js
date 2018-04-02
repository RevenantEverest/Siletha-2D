const db = require('./config/connection');

module.exports = {

  findAll() {
    return db.many(`SELECT * FROM users;`);
  },

  findById(id) {
    return db.one(`SELECT * FROM users where user_id = $1`, id);
  },

  save(user) {
    return db.one(`INSERT INTO users (user_id, username, password)
    VALUES ($/user_id/, $/username/, $/password/)
    RETURNING *`, user)
  }
};
