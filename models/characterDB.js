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
    return db.one(`INSERT INTO characters (user_id, name, class_id, experience, level, gold)
    VALUES ($/user_id/, $/name/, $/class_id/, $/experience/, $/level/, $/gold/)
    RETURNING *`, character)
  },

  // updateCharacterName(character) {
  //   return db.one(`UPDATE characters
  //     SET
  //     name = $/name/
  //     WHERE character_id = $/character_id/
  //     RETURNING *`, character)
  // },

  updateExperience(character) {
    console.log("Hitting it big, in DB");
    return db.one(`UPDATE characters
      SET
      experience = experience + $/experience/
      WHERE character_id = $/character_id/
      RETURNING *`, character)
  },

  updateLevel(character) {
    return db.one(`UPDATE characters
      SET
      level = level + 1
      WHERE character_id = $/character_id/
      RETURNING *`, character)
  },

  delete(id) {
    return db.none(`DELETE FROM characters WHERE character_id = $1`, id)
  }

}
