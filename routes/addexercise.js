var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var exercise = require('../models/exercise')
var user = require('../models/user')

router.post('/', function (req, res, next) {
  if (!req.body.userID) {
    return res.send("UserID is missing");
  }
  user.findById(req.body.userID, function (err, existingUser) {
    if (!err && existingUser) {
      exercise.create(req.body, function (err, data) {
        if (err) return next(err);
        res.send(data)
      });
    } else {
      res.send("Unknow user");
    }
  });
});

module.exports = router;
