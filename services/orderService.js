const { models } = require('../libs/sequelize');
const boom = require('@hapi/boom');

class OrderService {
  constructor() {}

  async create(data) {
    const newOrder = await models.Order.create(data);
    return newOrder;
  }

  async addItem(data) {
    const newOrder = await models.OrderProduct.create(data);
    return newOrder;
  }
  async find() {
    return [];
  }

  async findOne(id) {
    const order = await models.Order.findByPk(id, {
      include: [
        {
          association: 'customer',
          include: ['user'],
        },
        'items',
      ],
    });
    if (!order) {
      throw boom.notFound('customer not found');
    }
    return order;
  }
  async update(id, changes) {
    return {
      id,
      changes,
    };
  }

  async delete(id) {
    return { id };
  }
}
module.exports = OrderService;
