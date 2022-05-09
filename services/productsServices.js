/* const faker = require('faker'); */
/* const boom = require('@hapi/boom'); */
const { models } = require('../libs/sequelize');
/* const pool = require('../libs/postgresPool'); */
/* const sequelize = require('../libs/sequelize'); */

class ProductsServices {
  constructor() {
    /*  this.products = []; */
    /*   this.generate(); */
    /*  this.pool = pool;
    this.pool.on('error', (err) => console.error(err)); */
  }

  /*  generate() {
    const limit = 20;
    for (let i = 0; i < limit; i++) {
      this.products.push({
        id: faker.datatype.uuid(),
        name: faker.commerce.productName(),
        price: parseInt(faker.commerce.price()),
        image: faker.image.imageUrl(),
        isBlock: faker.datatype.boolean(),
      });
    }
  } */

  async create(data) {
    const newProduct = await models.Product.create(data);
    return newProduct;
  }

  async find(query) {
    /*     const query = 'SELECT * FROM tasks';
    const rta = await this.pool.query(query); */
    /*   const query = 'SELECT * FROM tasks';
    const [data] = await sequelize.query(query); */
    const {limit, offset}=query;
    const options = {
      include: ['category']
    };
    if (limit && offset) {
      options.limit = parseInt(limit);
      options.offset = parseInt(offset);
    }

    const products = await models.Product.findAll(options);
    return products;
  }

  async findOne(id) {
    const product = await models.Product.findByPk(id);
    return product;
  }

  async update(id, changes) {
    const product = await this.findOne(id);
    const rta = await product.update(changes);
    return rta;
  }

  async delete(id) {
    const product = await this.findOne(id);
    await product.destroy();
    return id;
  }
}

module.exports = ProductsServices;
