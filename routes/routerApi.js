const express = require('express');
const categoriesRouter = require('./categoriesRouter');
const productsRouter = require('./productsRouter');
const usersRouter = require('./usersRouter');
const customerRouter = require('./customerRouter');
const orderRouter = require('./orderRouter');

function routerApi(app) {
  const router = express.Router();
  app.use('/api/v1', router);

  router.get('/', (req, res) => {
    res.send('Hola mi server en express');
  });
  router.use('/products', productsRouter);
  router.use('/users', usersRouter);
  router.use('/categories', categoriesRouter);
  router.use('/customers', customerRouter);
  router.use('/orders', orderRouter);
}

module.exports = routerApi;
