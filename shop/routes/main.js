const db = require('../data');

module.exports = {
  getHome: (req, res) => {
    res.render('main/home', {
      title: "Fur_Atelier",
      logged: req.isAuthenticated(),
      user: req.user
    });
  },

  getAbout: (req, res) => {
    res.render('main/about', {
      title: "Menu_About_Us",
      logged: req.isAuthenticated(),
      user: req.user,
    });
  },

  getServices: (req, res) => {
    res.render('main/services', {
      title: "Menu_Services",
      logged: req.isAuthenticated(),
      user: req.user,
    });
  },

  getDoneOrders: (req, res) => {
    db.getDoneOrders((err, doneOrders) => {
      res.render('main/done_orders', {
        title: "Menu_Done_Orders",
        logged: req.isAuthenticated(),
        doneOrders,
        user: req.user
      });
    });
  },

  getEShops: (req, res) => {
    res.render('main/e_shops', {
      title: "Menu_Online_Shops",
      logged: req.isAuthenticated(),
      user: req.user
    });
  },

  getContact: (req, res) => {
    res.render('main/contact', {
      title: "Menu_Contacts",
      logged: req.isAuthenticated(),
      user: req.user,
    });
  }
};