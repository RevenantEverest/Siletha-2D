const express = require('express');
const questController = require('../controllers/questController');
const questRouter = express.Router();

questRouter.route('/')
  .get(questController.index)

questRouter.route('/:id')
  .get(questController.getOne)

questRouter.route('/questLog')
  .put(questController.updateQuest)
  .post(questController.addQuest)
  .delete(questController.abandonQuest)

questRouter.route('/questLog/:id')
  .get(questController.questLogIndex)

questRouter.route('/questLog/questInfo/:id')
  .get(questController.getQuestInfo)

questRouter.route('/questLog/complete')
  .put(questController.completeQuest)

module.exports = questRouter;
