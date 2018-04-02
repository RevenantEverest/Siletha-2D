const db = require('./config/connection');

module.exports = {

  findAll() {
    return db.many(`SELECT * FROM items`);
  },

  findById(id) {
    return db.one(`SELECT * FROM items WHERE item_id = $1`, id);
  },

  save(item) {
    return db.one(`INSERT INTO items (item_id, item_name, item_type)
    VALUE ($/item_id/, $/item_name/, $/item_type/)
    RETURNING *`, item);
  },

  update(item) {
    return db.one(`UPDATE items
      SET
      item_name = $/item_name/,
      item_type = $/item_type/
      WHERE item_id = $/item_id/
      RETURNING *`, item);
  },

  destroy(id) {
    return db.none(`DELETE FROM items WHERE item_id = $1`, id);
  }
}
