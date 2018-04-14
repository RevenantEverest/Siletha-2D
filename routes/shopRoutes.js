const express = require('express');
const shopController = require('../controllers/shopController');
const shopRouter = express.Router();

shopRouter.route('/sell')
  .put(shopController.sellItem)

shopRouter.route('/buy')
  .post(shopController.buyHealthPotion)
  .put(shopController.removeGold)

module.exports = shopRouter;
