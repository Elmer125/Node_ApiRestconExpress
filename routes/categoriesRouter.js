const express = require('express');
const CategoryServices = require('../services/categoryService');
const validatorHandler = require('./../middlewares/validationHandler');
const {
  createCategorySchema,
  getCategorySchema,
  updateCategorySchema,
} = require('../schemas/categorySchema');

const categoriesRouter = express.Router();
const services = new CategoryServices();

categoriesRouter.get('/', async (req, res, next) => {
  try {
    const categories = await services.find();
    res.status(200).json(categories);
  } catch (error) {
    next(error);
  }
});

categoriesRouter.get(
  '/:id',
  validatorHandler(getCategorySchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const category = await services.findOne(id);
      res.status(200).json(category);
    } catch (error) {
      next(error);
    }
  }
);

categoriesRouter.post(
  '/',
  validatorHandler(createCategorySchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newCategory = await services.create(body);
      res.status(201).json(newCategory);
    } catch (error) {
      next(error);
    }
  }
);

categoriesRouter.patch(
  '/:id',
  validatorHandler(getCategorySchema, 'params'),
  validatorHandler(updateCategorySchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const category = await services.update(id, body);
      res.status(200).json(category);
    } catch (error) {
      next(error);
    }
  }
);

categoriesRouter.delete(
  '/:id',
  validatorHandler(getCategorySchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      await services.delete(id);
      res.status(200).json({ id });
    } catch (error) {
      next(error);
    }
  }
);

module.exports = categoriesRouter;
