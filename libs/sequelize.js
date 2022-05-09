const { Sequelize } = require('sequelize');
const { config } = require('./../config/config');
const setupModels = require('../db/models');

/* const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);
const URI = `postgres://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`; */
/* const URI = `mysql://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`; */

const options = {
  dialect: 'postgres',
  logging: config.isProd ? false : true,
}

if (config.isProd) {
  options.dialectOptions = {
    ssl: {
      rejectUnauthorized: false
    }
  }
}

const sequelize = new Sequelize(config.dburl, options);

//PARA UTILIZARLO NORMAL SIN HEROKU
/* const sequelize = new Sequelize(URI, {
  dialect: 'postgres',
  logging: console.log,
}); */

// PARA MYSQL
/* const sequelize = new Sequelize(URI, {
  dialect: 'mysql',
  logging: console.log,
}); */

setupModels(sequelize);

//Peligroso sobreescribe informacion
/* sequelize.sync(); */

module.exports = sequelize;
