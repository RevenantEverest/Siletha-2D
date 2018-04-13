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
  }
};
