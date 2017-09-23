// Require express
const express = require('express');
// Set up express
const app = express();
// Require mongostore session storage
//var mongoStore = require('connect-mongo')(express);
const passport = require('passport');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
// Require needed files
//const database = require('./shop/data');
const config = require('./shop/config.json');
const info = require('./package.json');

console.log('NodeShop Started!');

// Connect to database
//database.startup(config.connection);
console.log('Connecting to database...');
  
// Configure Express
//app.configure(function(){
    
    // Set up jade
    app.set('views', __dirname + '/shop/views');
    app.set('view engine', 'pug');
    
    //app.use(express.favicon());
    const cookieParserWithSecrets = cookieParser('novanova');
    app.use(cookieParserWithSecrets);
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());
    app.locals.env = process.env;

    // Set up sessions
    /*app.use(express.session({
        // Set up MongoDB session storage
        store: new mongoStore({url:config.connection}),
        // Set session to expire after 21 days
        cookie: { maxAge: new Date(Date.now() + 181440000)},
        // Get session secret from config file
        secret: config.cookie_secret
        }));
    
    // Set up passport*/
    app.use(passport.initialize());
    app.use(passport.session());
    
    // Define public assets
    app.use(express.static(__dirname + '/shop/public'));
  
//});
    
// Require router, passing passport for authenticating pages
require('./shop/router')(app, passport);

// Listen for requests
const port = process.env.PORT || 5001;
app.listen(port);

console.log('NodeShop v' + info.version + ' listening on port ' + port);

// Handle all uncaught errors
process.on('uncaughtException', function(err) {
    console.log(err);
});