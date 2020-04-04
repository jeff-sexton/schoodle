// load .env data into process.env
require('dotenv').config();

// Web server config
const PORT       = process.env.PORT || 8080;
const ENV        = process.env.ENV || "development";
const KEYS       = process.env.KEYS ? [process.env.KEYS] : ['backup default key'];

const express          = require("express");
const bodyParser       = require("body-parser");
const cookieSession    = require('cookie-session');
const sass             = require("node-sass-middleware");
const app              = express();
const morgan           = require('morgan');

const userDb = require('./lib/userQueries');

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cookieSession({
  name: 'session',
  keys: KEYS,

  //Cookie Options
  maxAge: 24 * 60 * 60 * 1000 // 24 Hours
}));

app.use("/styles", sass({
  src: __dirname + "/styles",
  dest: __dirname + "/public/styles",
  debug: true,
  outputStyle: 'expanded'
}));
app.use(express.static("public"));

// Middleware to associate every visitor with a db user - req.user should now be available in every request
app.use((req, res, next) => {
  const userId = req.session.user_id;

  if (userId) {
    userDb.getUser(userId)
      .then(user => {
        req.user = user;
        next();
      });

  } else {
    userDb.addUser()
      .then(user => {
        // assign session
        req.session.user_id = user.id;
        //attach user object to request
        req.user = user;
        next();
      });
  }

});

// Separated Routes for each Resource
// Note: Feel free to replace the example routes below with your own
const usersRoutes = require("./routes/users");
const widgetsRoutes = require("./routes/widgets");

// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
app.use("/api/users", usersRoutes(userDb));
app.use("/api/widgets", widgetsRoutes(userDb));
// Note: mount other resources here, using the same pattern above


// Development route to "log in" as an existing user by id
app.get('/login/:id', (req, res) => {
  req.session.user_id = req.params.id;
  res.redirect('/');
});


// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).
app.get("/", (req, res) => {
  res.render("index");
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
