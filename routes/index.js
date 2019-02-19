const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("Hello from index");
});

router.get("/dashboard", (req, res) => {
  res.send("Hello from dashboard");
});

module.exports = router;
