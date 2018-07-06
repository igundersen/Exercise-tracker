var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var user = require('../models/user')

router.post('/', function (req, res, next) {
  if (!req.body.username) {
    res.send("Username missing.")
  } else {
    user.create(req.body, function (err, user) {
      if (err) {
        if (err.code === 11000) {
          res.send("username already taken")
        } else {
          return next(err)
        }
      } else {
        res.json({
          username: user.username,
          id: user["_id"]
        });
      }
    });
  }
});

module.exports = router;
