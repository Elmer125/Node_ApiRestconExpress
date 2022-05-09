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
    res.send(`<h1>Api de ventas con node utilizando docker y sequelize con postgres</h1>
              <a href="https://guarded-anchorage-24500.herokuapp.com/api/v1/products">Productos</a>
              <a href="https://guarded-anchorage-24500.herokuapp.com/api/v1/users">usuarios</a>
              <a href="https://guarded-anchorage-24500.herokuapp.com/api/v1/categories">Categorias</a>
    `);
  });
  router.use('/products', productsRouter);
  router.use('/users', usersRouter);
  router.use('/categories', categoriesRouter);
  router.use('/customers', customerRouter);
  router.use('/orders', orderRouter);
}

module.exports = routerApi;
