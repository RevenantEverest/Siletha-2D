const db = require('../config/connection');

module.exports = {

  findByCharacterId(id) {
    return db.many(`SELECT * FROM inventory JOIN items ON items.item_id = inventory.item_id WHERE character_id = $1`, id);
  },

  save(inventory) {
    return db.one(`INSERT INTO inventory (character_id, item_id)
    VALUES ($/character_id/, $/item_id/) RETURNING *`, inventory)
  },

  deleteItem(data) {
    return db.none(`DELETE FROM inventory WHERE entry_id = $/entry_id/`, data)
  }

};
