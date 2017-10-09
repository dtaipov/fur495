const db = require('../data');

module.exports = {
  getHome: (req, res) => {
    res.render('main/home', {
      title: req.__("Fur_Atelier"),
      logged: req.isAuthenticated(),
      user: req.user
    });
  },

  getAbout: (req, res) => {
    res.render('main/about', {
      title: req.__("Menu_About_Us"),
      logged: req.isAuthenticated(),
      user: req.user,
    });
  },

  getServices: (req, res) => {
    res.render('main/services', {
      title: req.__("Menu_Services"),
      logged: req.isAuthenticated(),
      user: req.user,
    });
  },

  getCatalog: (req, res) => {
    res.render('main/catalog', {
      title: req.__("Menu_Catalog"),
      logged: req.isAuthenticated(),
      user: req.user,
    });
  },

  getDoneOrders: (req, res) => {
    db.getDoneOrders((err, doneOrders) => {
      res.render('main/done_orders', {
        title: req.__("Menu_Done_Orders"),
        logged: req.isAuthenticated(),
        doneOrders,
        user: req.user
      });
    });
  },

  getEShops: (req, res) => {
    res.render('main/e_shops', {
      title: req.__("Menu_Online_Shops"),
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
      title: req.__("Menu_FAQ"),
      logged: req.isAuthenticated(),
      user: req.user,
    });
  }
};