const express = require('express');

const OrderService = require('../services/orderService');
const {
  getOrderSchema,
  createOrderSchema,
  addItems,
} = require('../schemas/orderSchema');
const validationHandler = require('../middlewares/validationHandler');

const orderRouter = express.Router();
const service = new OrderService();

orderRouter.get(
  '/:id',
  validationHandler(getOrderSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const order = await service.findOne(id);
      res.status(200).json(order);
    } catch (error) {
      next(error);
    }
  }
);

orderRouter.post(
  '/',
  validationHandler(createOrderSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newOrder = await service.create(body);
      res.status(201).json(newOrder);
    } catch (error) {
      next(error);
    }
  }
);

orderRouter.post(
  '/add-item',
  validationHandler(addItems, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newOrder = await service.addItem(body);
      res.status(201).json(newOrder);
    } catch (error) {
      next(error);
    }
  }
);
module.exports = orderRouter;
