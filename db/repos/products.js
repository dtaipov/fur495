'use strict';
const sql = require('../sql').products;
module.exports = (rep, pgp) => {

  return {
    done_orders: () =>
      rep.any(sql.done_orders),

    get_services_to_provide: () =>
      rep.any(sql.services_to_provide),

    catalog_all: values =>
      rep.any(sql.catalog_all, values)
  }
};
