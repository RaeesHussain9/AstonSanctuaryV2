if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const passport = require('passport');
const flash = require('connect-flash');
const session = require('express-session');

const app = express();

// IMPORTING PASSPORT CONFIG FILE
require('./config/passport')(passport);

// GETTING DATABASE URL FROM MY .ENV FILE
const db = process.env.DB_PASSWORD;

// CONNECTING TO MONGODB
mongoose
  .connect(
    db,
    { useNewUrlParser: true ,useUnifiedTopology: true, useFindAndModify: false}
  )
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

// EJS
app.use(expressLayouts);
app.set('view engine', 'ejs');

// Express body parser
app.use(express.urlencoded({ extended: true }));

// Express session
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true
  })
);

// PASSPORT MIDDLEWARE
app.use(passport.initialize());
app.use(passport.session());

// CONNECT FLASH
app.use(flash());

// GLOBAL VARIABLES FOR LOGIN AND REGISTER MESSAGES
app.use(function(req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});

// ROUTES
app.use('/', require('./routes/index.js'));
app.use('/users', require('./routes/users.js'));
app.use('/adoption', require('./routes/adoption.js'));
app.use('/addAnimal', require('./routes/addAnimal.js'));

//CONNECTING TO A PORT
const PORT = process.env.PORT || 3000;

app.listen(PORT, console.log(`Server running on  ${PORT}`));
