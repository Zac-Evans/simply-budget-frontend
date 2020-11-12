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

//Grab all the specific User's categories
router.get("/:user_id/budget", (req,res) => {
  db.budget_categories.findAll( {
    where: {
      user_id: req.params.user_id
    }
  } )
  .then((budget_categories) => res.send(budget_categories));
});

//create a budget category
router.post("/:user_id/budget/add", (req,res) =>{
  db.budget_categories
  .create({
      user_id: req.params.user_id,
      category_name: req.body.category_name,
      category_budget: req.body.category_budget
  }).then((addedBudget) => res.send(addedBudget))
  .catch((err) => console.log(err));
});




//see all purchases in a single category
router.get("/:user_id/budget/category/:category_id", (req,res) =>{
  db.budget_categories.findAll({
    where: {
      user_id: req.params.user_id,
      id: req.params.category_id
    }
  }).then((purchases) => res.send(purchases));
})

//Delete a category
router.delete("/:user_id/budget/category/:category_id", (req, res) =>{
  db.budget_categories.destroy({
    where: {
      user_id: req.params.user_id,
      id: req.params.category_id
    },
  })
  .then(() => res.send("success"))

  .catch(() => res.send("fail"));
});

//Update a category
router.put("/:user_id/budget/category/:category_id", (req,res) =>{
  db.budget_categories.update(
      {
      category_name: req.body.category_name,
      category_budget: req.body.category_budget,
      budget_remaining: req.body.budget_remaining
      },
      {
      where:{
          user_id: req.params.user_id,
          id: req.params.category_id
      },
  },
 )
 .then((budget) => res.json(budget))
 .catch((err) => console.log(err));
});


//Backend running
router.get("/", (req, res) => {
  res.send("Backend running!");
});
module.exports = router;
