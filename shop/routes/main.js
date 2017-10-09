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
    res.render('main/services', {
      logged: req.isAuthenticated(),
      user: req.user,
    });
  },

  getCatalog: (req, res) => {
    res.render('main/catalog', {
      logged: req.isAuthenticated(),
      user: req.user,
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