const express = require('express');

const router = express.Router();

// @route   GET api/posts/test
// @desc    Tests post route
// @access  Public
// res.json auto serves a 200 status
router.get('/test', (req, res)=> res.json({msg: "Post works"}))


module.exports = router;