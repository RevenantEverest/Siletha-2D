const express = require(`express`);
const characterController = require(`../controllers/characterController`);
const characterRouter = express.Router();


characterRouter.get(`/user/:id`, characterController.getOneByUserId)

characterRouter.route(`/:id`)
  .get(characterController.getOne)
  .put(characterController.update)
  .delete(characterController.delete)

characterRouter.route(`/`)
  .get(characterController.index)
  .post(characterController.create)

  module.exports = characterRouter;
