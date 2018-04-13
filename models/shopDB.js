const db = require('../config/connection');

module.exports = {

  sellItem(item) {
    return db.one(`UPDATE characters (gold)
    VALUES ($/gold/)
    WHERE character_id = $/character_id/`, item)
  },
}
