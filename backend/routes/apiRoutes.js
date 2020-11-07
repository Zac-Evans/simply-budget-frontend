const { response } = require("express");
const express = require("express");
const router = express.Router();
const db = require("../models");

// For bcrypt
const saltRounds = 10;
const bcrypt = require("bcrypt");
let userLoggedIn = false;

function authenticationMiddleware(req, res, next) {
  if (userLoggedIn) {
    console.log("User logged in.");
    next();
  } else {
    console.log("User not authenticated");
    res.redirect("/login");
  }
}

//Backend running
router.get("/", (req, res) => {
  res.send("Backend running!");
});

module.exports = router;
