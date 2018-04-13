const express = require('express');
const shopController = require('../controllers/shopController');
const shopRouter = express.Router();

shopRouter.route('/sell')
  .put(shopController.sellItem)

module.exports = shopRouter;
