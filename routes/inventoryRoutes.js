const express = require('express');
const inventoryController = require('../controllers/inventoryController');
const inventoryRouter = express.Router();

inventoryRouter.route(`/:id`)
  .get(inventoryController.getByCharacterId)
  // .delete(inventoryController.deleteItem)

// inventoryRouter.route('/')
//   .get(inventoryController)
//   .post(inventoryController.create)

module.exports = inventoryRouter;
