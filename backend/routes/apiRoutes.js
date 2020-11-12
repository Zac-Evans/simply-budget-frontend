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

      ///////////////
      /////Users/////
      ///////////////


// Register a new user
router.post("/register", (req, res, next) => {
  if (!req.body.first_name) {
    res.status(404).send("First name is required");
  }
  if (!req.body.last_name) {
    res.status(404).send("Last name is required");
  }
  if (!req.body.email) {
    res.status(404).send("Email is required");
  }
  if (!req.body.password) {
    res.status(404).send("Password is required");
  }
  if (isNaN(req.body.income) || !req.body.income) {
    res.status(409).send("Valid income is required");
    return;
  }
  let first_name = req.body.first_name;
  let last_name = req.body.last_name;
  let email = req.body.email;
  let password = req.body.password;
  let income = req.body.income;
  bcrypt.hash(password, saltRounds, function (err, hash) {
    let encrypted_password = hash;
    db.users
      .create({
        first_name: first_name,
        last_name: last_name,
        email: email,
        password: encrypted_password,
        income: income,
      })
      .then((results) => {
        res.json(results);
      })
      .catch((e) => {
        res.status(409).send("Please input valid data.");
        console.log(e);
      });
  });
});


// Login to an existing account
router.post("/login", (req, res) => {
  let email = req.body.email;
  let password = req.body.password;

  db.users
    .findAll({
      where: {
        email: email,
      },
    })
    .then((user) => {
      if (!req.body.email) {
        res.status(404).send("Email is required");
      }
      if (!req.body.password) {
        res.status(404).send("Password is required");
      }
      let storedPassword = user[0].password;

      bcrypt.compare(password, storedPassword, function (err, result) {
        if (result) {
          res.json(user);
        } else { 
          res.status(409).send("Incorrect password"); 
        }
      });
    })
    .catch((e) => { res.status(404).send("Email/Password combination did not match") });
});


// Update an existing user
router.put("/user/:id", (req, res) => {
  if(isNaN(req.body.income)) {
    res.send("Enter a number");
  }

  db.users
    .update(
      { income: req.body.income },
      {
        where: {
          id: req.params.id,
        },
      })
    .then((user) => res.json(user))
    .catch((err) => res.send(err));
});


      ///////////////
      /////Bills/////
      ///////////////


// Create a bill
router.post("/bills/create/:id", (req, res) => {
  if(!req.body.bill_name) {
    res.status(409).send('Please enter the bill name');
  }
  if(!req.body.bill_amount || isNaN(req.body.bill_amount)) {
    res.status(409).send('Please enter bill amount')
  }

  db.bills
    .create(
      { 
        bill_name: req.body.bill_name,
        bill_amount: req.body.bill_amount,
        user_id: req.params.id
      })
    .then((user) => res.json(user))
    .catch((err) => res.send(err));
});


// Get all of the logged in users bills
router.get("/bills/:id", (req, res) => {
  db.bills
    .findAll({
      where: {
        user_id: req.params.id
      }
    })
    .then((bills) => res.json(bills))
    .catch((err) => res.send(err))
})


// Get a single bill
router.get("/bills/:id", (req, res) => {
  db.bills
    .findAll({
      where: {
        id: req.params.idd
      }
    })
    .then((bills) => res.json(bills))
    .catch((err) => res.send(err))
})


// Update a bill
router.put("/bills/update/:id", (req, res) => {
  if(req.body.bill_amount && isNaN(req.body.bill_amount)) {
    res.send('Please enter a number');
    return;
  }

  db.bills
    .update(
      { 
        bill_name: req.body.bill_name,
        bill_amount: req.body.bill_amount
      },
      {
        where: {
          id: req.params.id
        },
      })
    .then((user) => res.json(user))
    .catch((err) => res.send(err));
});


// Delete a bill
router.delete("/bills/delete/:id", (req, res) => {
  db.bills
    .destroy({
      where: {
        id: req.params.id,
      },
    })
    .then(() => res.send("success"))
    .catch(() => res.send("fail"));
});


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
