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
app.use("/ru", express.static(__dirname + '/shop/public'));
app.use("/en", express.static(__dirname + '/shop/public'));
app.use(i18n.init);
//});

app.get('/', (req, res, next) => {
  res.redirect(`/${req.getLocale()}/`);
});

app.use("/:locale", (req, res, next) => {
  if (req.params.locale !== "ru" && req.params.locale !== "en") {
    res.status(404).send('Not found');
  }
  const locale = req.params.locale === "ru" ? "ru" : "en"; //in case of unsupported url such as /fr/about
  res.setLocale(locale);
  res.locals.locale_opposite = (locale === "ru" ? "en" : "ru");
  res.locals.path = req.path;
  next();
});


require('./shop/router')(app, passport);

// Listen for requests
const port = process.env.PORT || 5001;
app.listen(port);

console.log('NodeShop v' + info.version + ' listening on port ' + port);

// Handle all uncaught errors
process.on('uncaughtException', function(err) {
    console.log(err);
});