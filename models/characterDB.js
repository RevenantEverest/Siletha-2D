const db = require('../config/connection');

module.exports = {

  findAll() {
    return db.many(`SELECT * FROM characters`);
  },

  findById(id) {
    return db.one(`SELECT * FROM characters WHERE character_id = $1`, id);
  },

  findAllByUserId(id) {
    return db.many(`SELECT * FROM characters WHERE user_id = $1`, id);
  },

  save(character) {
    return db.one(`INSERT INTO characters (user_id, character_id, name, class_id, experience, level)
    VALUES ($/user_id/, $/character_id/, $/name/, $/class_id/, $/experience/, $/level/)
    RETURNING *`, character)
  },

  update(character) {
    return db.one(`UPDATE characters
      SET
      name = $/name/
      WHERE character_id = $/character_id/
      RETURNING *`, character)
  },

  delete(id) {
    return db.none(`DELETE FROM characters WHERE character_id = $1`, id)
  }

}
