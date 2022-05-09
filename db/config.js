const { config } = require('../config/config');

/* const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);
const URI = `postgres://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`;
 */

//Para utilizar con base de datos mysql se cambia por mysql

module.exports = {
  development: {
    url: config.dburl,
    dialect: 'postgres',
  },
  production: {
    url: config.dburl,
    dialect: 'postgres',
    dialectOptions: {
      ssl: {
        rejectUnauthorized: false
      }
    }
  }
}
