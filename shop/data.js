// Require needed modules
var pg = require('pg');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

// Require data models
var User = require('../schemas/user');
var Product = require('../schemas/product');
var Category = require("../schemas/category");

// Passport methods
passport.use(new LocalStrategy({usernameField: 'email'},function(email, password, done) {User.authenticate(email, password, function(err, user) {return done(err, user)})}));
passport.serializeUser(function(user, done) {done(null, user.id)});
passport.deserializeUser(function(id, done) {User.findById(id, function (err, user) {done(err, user)})});

const db = require('../db').db;

// Export functions
module.exports = {

    // Connect to database
    startup: function(dbToUse) {
        
        // Connect pg and select db
        pg.connect(dbToUse);
        
        // Add listener for opened connection
        /*pg.connection.on('open', function() {
            console.log('Connected to database!');
        });*/
    },

    // Get categories for top nav
    getTopCategories: function(callback){ 
        //var query = Category.find({topnav : true});
        /*query.exec(function(err, categories) {
            
            // Execute callback
            callback(null, categories);
        });*/
        var categories = [
            {name:'Помпоны', seo: 'помпоны', topnav: true},
            {name:'Опушки', seo: 'опушки', topnav: true},
            {name:'Наушники', seo: 'наушники', topnav: true},
            {name:'Муфты', seo: 'муфты', topnav: false},
            {name:'Воротники', seo: 'воротники', topnav: false},
        ];

        callback(null, categories);
    },

  getDoneOrders: (callback) => {
    db.products.done_orders()
      .then((data) => {
          console.log("done_orders", data);
          callback(null, data);
        })
      .catch((error) => {
        console.error(error);
        callback(error);
      });
  },

  getServicesToProvide: (callback) => {
    db.products.get_services_to_provide()
      .then((data) => {
        callback(null, data);
      })
      .catch((error) => {
        console.error(error);
        callback(error);
      });
  },

  getCatalogAll: (productGroupId, callback) => {
    db.products.catalog_all({"product_group_id": productGroupId})
      .then((data) => {
        console.log("catalog all", data);
        callback(null, data);
      })
      .catch((error) => {
        console.error(error);
        callback(error);
      });
  },
  
    // Get featured products
    getFeatured: function(callback) {
        
        // Find products where featured is true
        /*var query = Product.find({featured : true});
        query.exec(function(err, featuredProducts) { 
            
            // Execute callback
            callback(null, featuredProducts);
        });*/
        var featuredProducts = [
            {
            name: "a",
            make: "make1",
            model: "model1",
            category: "category1",
            seo: "seo1",
            sku: "sku1",
            upc: "upc1",
            featured: true,
            date: new Date(),

            pricing: {
                retail: 100,
                sale: 90,
                cost: 50,
            },

            details: {
                description: "a description",
                attributes: ["a_attrib", "b_attrib"]
            },

            image: ["abcdefgImage"]
            },

            {
                name: "b",
                make: "make2",
                model: "model2",
                category: "category2",
                seo: "seo2",
                sku: "sku2",
                upc: "upc2",
                featured: true,
                date: new Date(),

                pricing: {
                    retail: 200,
                    sale: 180,
                    cost: 100,
                },

                details: {
                    description: "b description",
                    attributes: ["c_attrib", "d_attrib"]
                },

                image: ["abcdefgImage2"]
            }
        ];
        callback(null, featuredProducts);
    },
  
    // Get products in a category
    getCategoryProducts: function(category, callback) {
    
        // Find category for url
        var categoryQuery = Category.findOne({seo : category});
        
        // Execute query
        categoryQuery.exec(function(err, category){
            
            // Callback with error if error
            if (err) return callback(err);
            
            // Check if category exists
            if (!category) {
                
                // Pass an error if not
                callback(new Error('Category not found!'));
                
            // Continue if it does
            } else {
                
                // Find products in given category
                var productQuery = Product.find({category : category.name});
                productQuery.exec(function(err, categoryProducts) {
                        
                    // Execute callback passed from route
                    callback(err, categoryProducts, category.name);
                });
            }
        });
    },
  
    // Find product for url
    findProductBySEO: function(seo, callback) {
        var query = Product.findOne({seo : seo});
        query.exec(function(err, product) {  
            
            // Check if product exists
            if (!product) {
                
                // Pass an error if not
                callback(new Error('Product not found!'));
                
            // Continue if it does
            } else {
            
                // Execute callback
                callback(null, product);
            }
        });
    },
  
    // Find product for ID
    findProductByID: function(id, callback) {
        
        // Find product where _id matches given ID
        var query = Product.findOne({_id : id});
        query.exec(function(err, product) {  
            
            // Execute callback passed from route
            callback(null, product);
        });
    },

    // Save new user
    saveUser: function(userInfo, callback) {
        
        // Build user object
        var newUser = new User ({
            name : { 
                first: userInfo.fname,
                last: userInfo.lname
            },
            address : { 
                address1: userInfo.address1,
                address2: userInfo.address2,
                town: userInfo.town,
                province: userInfo.province,
                pcd: userInfo.pcd,
                country : userInfo.country
            },
            contactNum : userInfo.contactNum,
            email: userInfo.email,
            password: userInfo.password
        });
        
        // Save into database
        newUser.save(function(err) {
            if (err) {throw err;}
            
            
            // Execute callback passed from route
            callback(null, newUser);
        });
    },

    // Close DB connection
    closeDB: function() {
        pg.disconnect();
    }
};