const db = require('../config/connection');

module.exports = {

  sellItem(item) {
    return db.one(`UPDATE characters
    SET
    gold = gold + $/gold/
    WHERE character_id = $/character_id/
    RETURNING *`, item)
  },

  buyHealthPotion(item) {
    return db.one(`INSERT INTO inventory (character_id, item_id)
    VALUES ($/character_id/, $/item_id/) RETURNING *`, item)
  },

  removeGold(gold) {
    return db.one(`UPDATE characters
      SET
      gold = gold - $/gold/
      WHERE character_id = $/character_id/
      RETURNING *`, gold)
  },
}
