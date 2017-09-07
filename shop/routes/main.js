// Require needed modules
var db = require('../data'),
config = require('../config.json');

// Export functions
module.exports = {
  // Get shop home page
  getHome: function(req, res) {
    // Get categories for top nav
    db.getTopCategories(function(err, categories) {
      if (err) {console.log(err)}

      // Get featured products
      db.getFeatured(function(err, featured) {
        if (err) {console.log(err)}

        // Render home page
        res.render('main/home', {
          store: config.store.name,
          title: config.store.tagline,
          logged: req.isAuthenticated(),
          user: req.user,
          //cart: req.session.cart,
          categories: categories,
          featured: featured
        });
      });
    });
  },

  // Get about page
  getAbout: function(req, res) {

    // Get categories for top nav
    db.getTopCategories(function(err, categories) {
      if (err) {console.log(err)}

      // Render contact page
      res.render('main/about', {
        store: config.store.name,
        title: 'О нас',
        logged: req.isAuthenticated(),
        user: req.user,
        //cart: req.session.cart,
        categories: categories,
      });
    });
  },

  getServices: function(req, res) {

    db.getTopCategories(function(err, categories) {
      if (err) {console.log(err)}

      res.render('main/services', {
        store: config.store.name,
        title: 'Услуги',
        logged: req.isAuthenticated(),
        user: req.user,
        //cart: req.session.cart,
        categories: categories
      });
    });
  },

  getDoneOrders: function(req, res) {
      res.render('main/done_orders', {
        store: config.store.name,
        title: 'Выполненные услуги',
        logged: req.isAuthenticated(),
        user: req.user
      });
  },

  getEShops: function(req, res) {
    res.render('main/e_shops', {
      store: config.store.name,
      title: 'Интернет-магазины',
      logged: req.isAuthenticated(),
      user: req.user
    });
  },

  // Get contact page
  getContact: function(req, res) {

    // Get categories for top nav
    db.getTopCategories(function(err, categories) {
      if (err) {console.log(err)}

      // Render contact page
      res.render('main/contact', {
        store: config.store.name,
        title: 'Контакты',
        logged: req.isAuthenticated(),
        user: req.user,
        //cart: req.session.cart,
        categories: categories,
      });
    });
  }
};