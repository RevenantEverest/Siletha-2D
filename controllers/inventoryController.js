const inventoryDB = require('../models/inventoryDB');

module.exports = {
  getByCharacterId(req, res, next) {
    inventoryDB.findByCharacterId(req.params.id)
      .then((inventory) => {
        res.json({
          message: "Getting characters inventory",
          data: inventory
        })
      })
      .catch(err => {
        next(err);
      })
  },

  getItem(req, res, next) {
    inventoryDB.save(req.body)
      .then((item) => {
        res.json({
          message: "Adding item to inventory",
          data: item
        })
      })
      .catch(err => {
        next(err)
      })
  },

  getItemName(req, res, next) {
    inventoryDB.findItemById(req.params.id)
      .then(item => {
        res.json({
          message: "Getting item name",
          data: item
        })
      })
      .catch(err => {
        next(err)
      })
  },

  getGold(req, res, next) {
    inventoryDB.getGold(req.body)
      .then(result => {
        res.json({
          message: "Gold rewarded",
          data: result
        })
      })
      .catch(err => {
        next(err);
      })
  },

  useItem(req, res, next) {
    inventoryDB.useItem(req.body)
      .then(item => {
        res.json({
          message: "Item used",
          data: item
        })
      })
      .catch(err => {
        next(err)
      })
  },

  findByEntryId(req, res, next) {
    inventoryDB.findByEntryId(req.params.id)
      .then(item => {
        res.json({
          message: "Item by entry_id info",
          data: item
        })
      })
      .catch(err => {
        next(err);
      })
  },

  removeItem(req, res, next) {
    inventoryDB.deleteItem(req.body)
      .then(() => next())
      .catch(err => next(err))
  }
};
