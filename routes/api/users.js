//AUTHENTICATION
const express = require("express");
const router = express.Router();
const keys = require("../../config/keys");

const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const passport = require("passport");

// Load Input Validation
const validateRegisterInput = require("../../validation/register");

// Load user model
const User = require("../../models/User");

// @route   GET api/users/test
// @desc    Tests users route
// @access  Public
router.get("/test", (req, res) => res.json({ msg: "Users works" }));

// @route   POST api/users/register
// @desc    Register a user
// @access  Public
router.post("/register", (req, res) => {
  // pulling in the errors and isValid value from register.js
  const { errors, isValid } = validateRegisterInput(req.body);

  //initial check validation of the inputs
  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      errors.email = "Email already exists.";
      // don't proceed because the user exists
      return res.status(400).json(errors);
    } else {
      const avatar = gravatar.url(req.body.email, {
        s: "200",
        rating: "pg",
        default: "mm"
      });

      // if user doesn't exist, create new User
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        avatar,
        password: req.body.password
      });

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user => res.json(user))
            .catch(err => console.log(err));
        });
      });
    }
  });
});

// @route   GET api/users/login
// @desc    Login user / Returning JWT
// @access  Public
router.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  //Find user by email
  User.findOne({ email }).then(user => {
    //check for user
    if (!user) {
      return res.status(404).json({ email: "User not found." });
    }
    //check password
    bcrypt
      .compare(password, user.password)
      //returns a boolean
      .then(isMatch => {
        if (isMatch) {
          //user matched
          //create JWT payload
          const payload = {
            id: user.id,
            name: user.name,
            avatar: user.avatar
          };

          //sign token
          //  payload - what we want included
          //  secret - key
          //	expiration
          jwt.sign(
            payload,
            keys.secretOrKey,
            { expiresIn: 3600 },
            (err, token) => {
              res.json({
                success: true,
                token: "Bearer " + token
              });
            }
          );
        } else {
          return res
            .status(400)
            .json({ password: "Incorrect password entered." });
        }
      });
  });
});

// @route   GET api/users/current
// @desc    return the current user
// @access  Private
router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    //if the user is logged in, user info will be on req.user (obj with all user data)
    res.json({
      id: req.user.id,
      name: req.user.name,
      email: req.user.email
    });
  }
);

module.exports = router;
