const questDB = require('../models/questDB');

module.exports = {

  index(req, res, next) {
    questDB.findAll()
      .then(quests => {
        res.json({
          message: "Getting all quests",
          data: quests
        })
      })
      .catch(err => {
        next(err);
      })
  },

  getOne(req, res, next) {
    questDB.findById(req.params.id)
      .then(quest => {
        res.json({
          message: "Getting one quest",
          data: quest
        })
      })
      .catch(err => {
        next(err);
      })
  },

  questLogIndex(req, res, next) {
    questDB.findQuestLog(req.params.id)
      .then(quests => {
        res.json({
          message: "Getting all in quest log",
          data: quests
        })
      })
      .catch(err => {
        next(err);
      })
  },

  getQuestInfo(req, res, next) {
    questDB.getQuestInfo(req.params.id)
      .then(quest => {
        res.json({
          message: "Getting quest info",
          data: quest
        })
      })
      .catch(err => {
        next(err);
      })
  },

  addQuest(req, res, next) {
    questDB.addQuest(req.body)
      .then(quest => {
        res.json({
          message: "Adding quest to log",
          data: quest
        })
      })
      .catch(err => {
        next(err);
      })
  },

  completeQuest(req, res, next) {
    questDB.completeQuest(req.body)
      .then(quest => {
        res.json({
          message: "Quest is complete",
          data: quest
        })
      })
      .catch(err => {
        next(err);
      })
  },

  updateQuest(req, res, next) {
    questDB.updateQuest(req.body)
      .then(result => {
        res.json({
          message: "Updating quest",
          data: result
        })
      })
      .catch(err => {
        next(err);
      })
  },

  abandonQuest(req, res, next) {
    questDB.abandonQuest(req.body)
      .then(quest => {
        res.json({
          message: "Abandoning quest",
          data: quest
        })
      })
      .catch(err => {
        next(err);
      })
  }
};
