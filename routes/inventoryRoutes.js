const express = require('express');
const inventoryController = require('../controllers/inventoryController');
const inventoryRouter = express.Router();

inventoryRouter.route(`/:id`)
  .get(inventoryController.getByCharacterId)
  .post(inventoryController.getItem)

inventoryRouter.route('/')
  .delete(inventoryController.removeItem)

inventoryRouter.route('/gold')
  .put(inventoryController.getGold)

inventoryRouter.route('/items/:id')
  .get(inventoryController.getItemName)

module.exports = inventoryRouter;
