const express = require('express');
const ProductsServices = require('../services/productsServices');
const validationHandler = require('../middlewares/validationHandler');
const {
  createProductSchema,
  updateProductSchema,
  getProductSchema,
  queryProducts,
} = require('../schemas/productSchema');

const productsRouter = express.Router();
const service = new ProductsServices();

productsRouter.get(
  '/',
  validationHandler(queryProducts, 'query'),
  async (req, res, next) => {
    try {
      const listProducts = await service.find(req.query);
      res.status(200).json(listProducts);
    } catch (error) {
      next(error);
    }
  }
);

productsRouter.get(
  '/:id',
  validationHandler(getProductSchema, 'params'),
  async (req, res, next) => {
    try {
      const id = req.params.id;
      const product = await service.findOne(id);
      res.status(200).json(product);
    } catch (error) {
      next(error);
    }
  }
);

productsRouter.post(
  '/',
  validationHandler(createProductSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newProduct = await service.create(body);
      res.status(201).json(newProduct);
    } catch (error) {
      next(error);
    }
  }
);

productsRouter.patch(
  '/:id',
  validationHandler(getProductSchema, 'params'),
  validationHandler(updateProductSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const product = await service.update(id, body);
      res.json(product);
    } catch (error) {
      next(error);
    }
  }
);

productsRouter.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await service.delete(id);
    res.json(product);
  } catch (error) {
    next(error);
  }
});

module.exports = productsRouter;
