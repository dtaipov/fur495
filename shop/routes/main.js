const db = require('../data');

module.exports = {
  getHome: (req, res) => {
    res.render('main/home', {
      logged: req.isAuthenticated(),
      user: req.user
    });
  },

  getAbout: (req, res) => {
    res.render('main/about', {
      logged: req.isAuthenticated(),
      user: req.user,
    });
  },

  getServices: (req, res) => {
    db.getServicesToProvide((err, services) => {
      res.render('main/services', {
        logged: req.isAuthenticated(),
        services,
        user: req.user,
      });
    });
  },

  getCatalog: (req, res) => {
    let categoryId = null;
    const nameToId = {
      "toys": 23,
      "finnishFox": 9,
      "raccoonDog": 10
    };
    if (nameToId.hasOwnProperty(req.params.category_id)) {
      categoryId = nameToId[req.params.category_id];
    }

    db.getCatalogAll(categoryId, (err, products) => {
      res.render('main/catalog', {
        logged: req.isAuthenticated(),
        products,
        user: req.user,
      });
    });
  },

  getDoneOrders: (req, res) => {
    db.getDoneOrders((err, doneOrders) => {
      res.render('main/done_orders', {
        logged: req.isAuthenticated(),
        doneOrders,
        user: req.user
      });
    });
  },

  getPaymentOptions: (req, res) => {
    res.render('main/payment_options', {
      logged: req.isAuthenticated(),
      user: req.user
    });
  },

  getTrimCalculator: (req, res) => {
    res.render('main/trim_calculator', {
      logged: req.isAuthenticated(),
      user: req.user
    });
  },

  getEShops: (req, res) => {
    res.render('main/e_shops', {
      logged: req.isAuthenticated(),
      user: req.user
    });
  },

  getContact: (req, res) => {
    res.render('main/contact', {
      logged: req.isAuthenticated(),
      user: req.user,
    });
  },

  getFAQ: (req, res) => {
    res.render('main/faq', {
      logged: req.isAuthenticated(),
      user: req.user,
    });
  }
};