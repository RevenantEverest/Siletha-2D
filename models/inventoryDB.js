const db = require('../config/connection');

module.exports = {

  findByCharacterId(id) {
    return db.many(`SELECT * FROM inventory JOIN items ON items.item_id = inventory.item_id WHERE character_id = $1`, id);
  },

  save(inventory) {
    return db.one(`INSERT INTO inventory (character_id, item_id)
    VALUES ($/character_id/, $/item_id/) RETURNING *`, inventory)
  },

  findItemById(id) {
    return db.one(`SELECT * FROM items WHERE item_id = $1`, id)
  },

  getGold(data) {
    return db.one(`UPDATE characters
      SET
      gold = gold + $/gold/
      WHERE character_id = $/character_id/
      RETURNING *`, data)
  },

  useItem(data) {
    return db.one(`UPDATE characters
      SET
      health = health + $/health/
      WHERE character_id = $/character_id/
      RETURNING *`, data)
  },

  findByEntryId(id) {
    return db.many(`SELECT * FROM inventory WHERE entry_id = $1`, id)
  },

  deleteItem(data) {
    return db.none(`DELETE FROM inventory WHERE entry_id = $/entry_id/`, data)
  }

};
