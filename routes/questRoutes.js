const express = require('express');
const questController = require('../controllers/questController');
const questRouter = express.Router();

questRouter.route('/')
  .get(questController.index)

questRouter.route('/:id')
  .get(questController.getOne)

questRouter.route('/questLog')
  .get(questController.questLogIndex)
  .post(questController.addQuest)
  .delete(questController.abandonQuest)

questRouter.route('/questLog/complete')
  .put(questController.completeQuest)

module.exports = questRouter;
