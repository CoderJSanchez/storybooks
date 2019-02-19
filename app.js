const express = require("express");
const exphbs = require("express-handlebars");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const passport = require("passport");

require("./models/User");

//Passport Config
require("./config/passport")(passport);

//Load Routes
const auth = require("./routes/auth");
const index = require("./routes/index");

const app = express();

//Handlebars Middleware
app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main"
  })
);
app.set("view engine", "handlebars");

//Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

//Set Global Vars
app.use((req, res, next) => {
  res.locals.user = req.user || null;
  next();
});

const port = process.env.PORT || 5000;

const keys = require("./config/keys");

mongoose
  .connect(keys.mongoURI, { useNewUrlParser: true })
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch(err => {
    console.log(err);
  });

//Use Routes
app.use("/auth", auth);
app.use("/", index);

app.use(cookieParser());
app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: false
  })
);

app.listen(port, () => {
  console.log(`Listening on port.... ${port}`);
});
