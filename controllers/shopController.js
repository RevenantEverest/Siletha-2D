const shopDB = require('../models/shopDB');

module.exports = {

  sellItem(req, res, next) {
    shopDB.sellItem(req.body)
      .then(item => {
        res.json({
          message: "Item sold",
          data: item
        })
      })
      .catch(err => {
        next(err)
      })
  },

  buyHealthPotion(req, res, next) {
    shopDB.buyHealthPotion(req.body)
      .then(item => {
        res.json({
          message: "Purchased Item",
          data: item
        })
      })
      .catch(err => {
        next(err);
      })
  },

  removeGold(req, res, next) {
    shopDB.removeGold(req.body)
      .then(gold => {
        res.json({
          message: "Taking gold for sale",
          data: gold
        })
      })
      .catch(err => {
        next(err);
      })
  },

};
