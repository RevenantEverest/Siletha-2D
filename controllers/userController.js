const userDB = require('../models/userDB');

module.exports = {

  index(req, res, next) {
    userDB.findAll()
      .then(allUsers => {
        res.json({
          message: 'Got all users',
          data: allUsers
        })
      })
      .catch(err => {
        next(err)
      })
  },

  getOne(req, res, next) {
    userDB.getOne()
      .then(oneUser => {
        res.json({
          message: 'Got a user',
          data: oneUser
        })
      })
      .catch(err => {
        next(err)
      })
  },

  create(req, res, next) {
    userDB.save(req.body)
      .then(createUser => {
        res.json({
          message: 'Creating User',
          data: createUser
        })
        next();
      })
      .catch(err => {
        next(err);
      })
  }
};
