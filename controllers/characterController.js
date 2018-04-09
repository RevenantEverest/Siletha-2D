const characterDB = require(`../models/characterDB`);

module.exports = {

  index(req, res, next) {
    characterDB.findAll()
      .then((characters) => {
        res.json({
          message: "Getting characters",
          data: characters
        })
      })
      .catch(err => {
        next(err);
      })
  },

  getOne(req, res, next) {
    characterDB.findById(req.params.id)
      .then((character) => {
        res.json({
          message: "Getting a character",
          data: character
        })
      })
      .catch(err => {
        next(err);
      })
  },

  getOneByUserId(req, res, next) {
    characterDB.findAllByUserId(req.params.id)
      .then((characters) => {
        res.json({
          message: "Getting character by User ID",
          data: characters
        })
      })
      .catch(err => {
        next(err);
      })
  },

  create(req, res, next) {
    characterDB.save(req.body)
      .then((character) => {
        res.json({
          message: "Creating character",
          data: character
        })
      })
      .catch(err => {
        next(err);
      })
  },

  update(req, res, next) {
    characterDB.update(req.body)
      .then((character) => {
        res.json({
          message: "Updating character",
          data: character
        })
      })
      .catch(err => {
        next(err);
      })
  },

  delete(req, res, next) {
    characterDB.delete(req.params.id)
      .then(() => next())
      .catch(err => next(err))
  }

};
