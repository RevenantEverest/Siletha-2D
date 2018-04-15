const db = require('../config/connection');

module.exports = {

  findAll() {
    return db.many(`SELECT * FROM quests`)
  },

  findById(id) {
    return db.one(`SELECT * FROM quests WHERE quest_id = $1`, id)
  },

  findAllInQuestLog(questLog) {
    return db.many(`SELECT * FROM questLog WHERE character_id = $/character_id/ RETURNING *`, questLog)
  },

  addQuest(character) {
    return db.one(`INSERT INTO questLog (character_id, quest_id, requirements)
      VALUES ($/character_id/, $/quest_id/, $/requirements/)
      RETURNING *`, character)
  },

  updateQuest(character) {
    return db.one(`UPDATE questLog
      SET
      requirements = requirements + 1
      WHERE entry_id = $/entry_id/
      RETURNING *`, character)
  },

  completeQuest(character) {
    return db.one(`UPDATE questLog
      SET
      isComplete = true
      WHERE entry_id = $/entry_id/
      RETURNING *`, character)
  },

  abandonQuest(character) {
    return db.none(`DELETE FROM questLog
      WHERE entry_id = $/entry_id/`, character)
  }
};
