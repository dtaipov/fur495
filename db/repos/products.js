'use strict';
const sql = require('../sql').products;
module.exports = (rep, pgp) => {

  return {
    done_orders: () =>
      rep.any(sql.done_orders)
  }
};