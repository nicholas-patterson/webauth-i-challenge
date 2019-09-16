const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const User = require("./user-helpers");

router.get("/users", (req, res) => {
  const { username, password } = req.headers;

  if (username && password) {
    User.find().then(users => {
      res.status(200).json(users);
    });
  } else {
    res.status(401).json({ error: "You shall not pass" });
  }
});

router.get("/users/:id", (req, res) => {
  User.findById(id)
    .then(user => {
      if (!user) {
        res.status(400).json({ error: `Could not get user with id: ${id}` });
      } else {
        res.status(200).json(user);
      }
    })
    .catch(error => {
      res.status(500).json({ error: "Server could not get user" });
    });
});

router.post("/register", (req, res) => {
  const { username, password } = req.body;

  const hash = bcrypt.hashSync(password, 8);

  User.register({ username, password: hash })
    .then(newUser => {
      res.status(201).json(newUser);
    })
    .catch(error => {
      res.status(500).json({ error: "Server coould not register user" });
    });
});

router.post("/login", (req, res) => {
  let { username, password } = req.body;

  User.findBy({ username })
    .then(user => {
      const authenticate = bcrypt.compareSync(password, user.password);

      if (user && authenticate) {
        console.log(authenticate);
        res.status(200).json({ message: `Welcome, ${user.username}` });
      } else {
        res.status(401).json({ error: "You shall not pass!" });
      }
    })
    .catch(error => {
      res.status(500).json({ error: "Server could not login user" });
    });
});

module.exports = router;
