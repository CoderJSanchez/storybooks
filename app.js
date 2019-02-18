const express = require("express");
const mongoose = require("mongoose");

const app = express();
const port = process.env.PORT || 5000;

const keys = require("./config/keys");

mongoose.connect(
  "mongodb://julio:1sanchez@ds159661.mlab.com:59661/storybook_db",
  { useNewUrlParser: true },
  () => {
    console.log(`Connected to MongoDB`);
  }
);

app.get("/", (req, res) => {
  res.send("Hello from index");
});

app.listen(port, () => {
  console.log(`Listening on port.... ${port}`);
});
