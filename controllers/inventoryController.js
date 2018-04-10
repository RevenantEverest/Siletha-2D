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
};
