const itemDB = require('../models/itemDB');

module.exports = {

  index(req, res, next) {
    itemDB.findAll()
      .then(allItems => {
        res.json({
          message: 'Getting all items',
          data: allItems
        })
      })
      .catch(err => {
        next(err);
      })
  },

  getOne(req, res, next) {
    itemDB.findById(req.params.id)
      .then(oneItem => {
        res.json({
          message: 'Getting one item',
          data: oneItem
        })
      })
      .catch(err => {
        next(err);
      })
  },

  create(req, res, next) {
    itemDB.save(req.body)
      .then(item => {
        res.json({
          message: 'Creating item',
          data: item
        })
        next();
      })
      .catch(err => {
        next(err);
      })
  },

  update(req, res, next) {
    itemDB.update(req.body)
      .then(item => {
        res.json({
          message: 'Updating items',
          data: item
        })
        next();
      })
      .catch(err => {
        next(err)
      })
  },

};
