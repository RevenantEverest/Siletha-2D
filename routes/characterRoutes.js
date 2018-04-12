const express = require(`express`);
const characterController = require(`../controllers/characterController`);
const characterRouter = express.Router();


characterRouter.get(`/user/:id`, characterController.getOneByUserId)

characterRouter.route(`/experience`)
  .put(characterController.updateCharacterExperience)

characterRouter.route(`/:id`)
  .get(characterController.getOne)
  // .put(characterController.updateCharacterName)
  .delete(characterController.delete)


characterRouter.route(`/`)
  .get(characterController.index)
  .post(characterController.create)

  module.exports = characterRouter;
