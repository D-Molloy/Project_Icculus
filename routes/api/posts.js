const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

// Pull in Models
const Post = require("../../models/Post");
const Profile = require("../../models/Profile");
// Custom Validation
const validatePostInput = require("../../validation/post");

// @route   GET api/posts/test
// @desc    Tests post route
// @access  Public
// res.json auto serves a 200 status
router.get("/test", (req, res) => res.json({ msg: "Post works" }));

// @route   GET api/posts/
// @desc    Get Posts
// @access  Public
router.get("/", (req, res) => {
  Post.find()
    .sort({ date: -1 })
    .then(posts => res.json(posts))
    .catch(err => res.status(404).json({ nopostsfound: "No posts found." }));
});

// @route   GET api/posts/:id
// @desc    Get Posts
// @access  Public
router.get("/:id", (req, res) => {
  Post.findById(req.params.id)
    .then(post => res.json(post))
    .catch(err =>
      res.status(404).json({ nopostfound: "No post found with that ID." })
    );
});

// @route   POST api/posts/
// @desc    Create post
// @access  Private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validatePostInput(req.body);

    //check validation
    if (!isValid) {
      //if any errors, send 400 with errors object
      return res.status(400).json(errors);
    }
    const newPost = new Post({
      text: req.body.text,
      name: req.body.name,
      avatar: req.body.avatar,
      user: req.user.id
    });
    newPost.save().then(post => res.json(post));
  }
);

// @route   DELETE api/posts/:id
// @desc    Delete a post by ID
// @access  Private
router.delete("/:id", passport.authenticate("jwt"), (req, res) => {
  Profile.findOne({ user: req.user.id }).then(profile => {
    Post.findById(req.params.id).then(post => {
      //check to make sure the person trying to delete is the Post Creator
      if (post.user.toString() !== req.user.id) {
        return res.status(401).json({ notauthorized: "User not authorized" });
      }

      //delete
      post
        .remove()
        .then(() => res.json({ success: true }))
        .catch(() => res.status(404).json({ postnotfound: "No post found" }));
    });
  });
});
module.exports = router;
