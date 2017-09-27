const express = require('express');
const app = express();
const passport = require('passport');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const i18n = require('i18n');
const config = require('./shop/config.json');
const info = require('./package.json');

i18n.configure({
  locales: ['en', 'ru'],
  defaultLocale: 'en',
  cookie: 'smm_locale',
  directory: __dirname + '/locales'
});
  
// Configure Express
//app.configure(function(){

app.set('views', __dirname + '/shop/views');
app.set('view engine', 'pug');

//app.use(express.favicon());
const cookieParserWithSecrets = cookieParser('novanova');
app.use(cookieParserWithSecrets);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.locals.env = process.env;

app.use(passport.initialize());
app.use(passport.session());

// Define public assets
app.use(express.static(__dirname + '/shop/public'));
app.use(i18n.init);
  
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