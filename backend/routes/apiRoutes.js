const { response } = require("express");
const express = require("express");
const router = express.Router();
const db = require("../models");
const { Op } = require("sequelize");
const Sequelize = require("sequelize");

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

//PURCHASES

//Get all of a specific user’s purchases
router.get("/:user_id/purchases", (req, res) => {
  db.purchases
    .findAll({
      where: {
        user_id: req.params.user_id,
      },
    })
    .then((purchases) => res.send(purchases))
    .catch((err) => console.log(err));
});

//Get a single purchase
router.get("/:user_id/purchases/:purchase_id", (req, res) => {
  db.purchases
    .findAll({
      where: {
        user_id: req.params.user_id,
        id: req.params.purchase_id,
      },
    })
    .then((purchase) => res.send(purchase))
    .catch((err) => console.log(err));
});

//Add a purchase
router.post("/:user_id/purchases/", (req, res) => {
  db.purchases
    .create({
      user_id: req.params.user_id,
      category_id: req.body.category_id,
      purchase_name: req.body.purchase_name,
      purchase_notes: req.body.purchase_notes,
      price: req.body.price,
    })
    .then((purchase) => res.send(purchase))
    .catch((err) => console.log(err));
});

//Get purchases by category id
router.get("/:user_id/purchases/category/:category_id", (req, res) => {
  db.purchases
    .findAll({
      where: {
        user_id: req.params.user_id,
        category_id: req.params.category_id,
      },
    })
    .then((purchases) => res.send(purchases))
    .catch((err) => console.log(err));
});

//Delete a purchase
router.delete("/:user_id/purchases/:purchase_id", (req, res) => {
  db.purchases
    .destroy({
      where: {
        user_id: req.params.user_id,
        id: req.params.purchase_id,
      },
    })
    .then((deletedPurchase) => res.send("Purchase deleted"))
    .catch((err) => console.log(err));
});

//Update a purchase
router.put("/:user_id/purchases/:purchase_id", (req, res) => {
  db.purchases
    .update(
      {
        category_id: req.body.category_id,
        purchase_name: req.body.purchase_name,
        purchase_notes: req.body.purchase_notes,
        price: req.body.price,
      },
      {
        where: {
          user_id: req.params.user_id,
          id: req.params.purchase_id,
        },
      }
    )
    .then(() => res.send("Purchase updated"))
    .catch((err) => console.log(err));
});

//Search purchases by name
router.get("/:user_id/search-purchases", (req, res) => {
  db.purchases
    .findAll({
      where: {
        user_id: req.params.user_id,
        purchase_name: {
          [Op.iLike]: "%" + req.query.purchase_name + "%",
        },
      },
    })
    .then((purchases) => res.send(purchases))
    .catch((err) => console.log(err));
});

//Get purchases by date range
router.get("/:user_id/search-dates", (req, res) => {
  console.log(req.query.start);
  db.purchases
    .findAll({
      where: {
        user_id: req.params.user_id,
        createdAt: {
          [Op.between]: [req.query.start, req.query.end],
        },
      },
    })
    .then((purchases) => res.send(purchases))
    .catch((err) => console.log(err));
});

//Get by price range
router.get("/:user_id/search-prices", (req, res) => {
  db.purchases
    .findAll({
      where: {
        user_id: req.params.user_id,
        price: {
          [Op.between]: [req.query.low, req.query.high],
        },
      },
    })
    .then((purchases) => res.send(purchases))
    .catch((err) => console.log(err));
});

module.exports = router;
