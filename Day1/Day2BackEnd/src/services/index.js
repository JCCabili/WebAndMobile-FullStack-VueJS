const orders = require('./orders/orders.service.js');
const items = require('./items/items.service.js');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(orders);
  app.configure(items);
};
