const express = require('express');
const CustomerService = require('./../services/customerService');
const validationHandler = require('./../middlewares/validationHandler');

const {
  getCustomerSchema,
  createCustomerSchema,
  updateCustomerSchema,
} = require('./../schemas/customerSchema');

const customersRouter = express.Router();
const service = new CustomerService();

customersRouter.get('/', async (req, res, next) => {
  try {
    res.json(await service.find());
  } catch (error) {
    next(error);
  }
});

customersRouter.post(
  '/',
  validationHandler(createCustomerSchema, 'body'),
  async (req, res, next) => {
    console.log(req.body);
    try {
      const body = req.body;
      const newCustomer = await service.created(body);
      res.status(201).json(newCustomer);
    } catch (error) {
      next(error);
    }
  }
);

customersRouter.patch(
  '/:id',
  validationHandler(getCustomerSchema, 'params'),
  validationHandler(updateCustomerSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      res.status(201).json(await service.update(id, body));
    } catch (error) {
      next(error);
    }
  }
);

customersRouter.delete(
  '/:id',
  validationHandler(getCustomerSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      res.status(200).json(await service.delete(id));
    } catch (error) {
      next(error);
    }
  }
);

module.exports = customersRouter;
