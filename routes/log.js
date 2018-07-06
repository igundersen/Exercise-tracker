var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var exercise = require('../models/exercise')
var user = require('../models/user')

router.get('/', function (req, res, next) {
  var mongooseQuery = {};
  mongooseQuery.userID = req.query.userID;

  if (req.query.from || req.query.to) {
    mongooseQuery.date = {};
    if (req.query.to) {
      mongooseQuery.date.$lt = req.query.to
    }
    if (req.query.from) {
      mongooseQuery.date.$gt = req.query.from
    }
  }
  var limit = parseInt(req.query.limit);

  user.findById(mongooseQuery.userID, function (err, existingUser) {
    if (!err && existingUser) {
      exercise.find(mongooseQuery, function (err, exercises) {
        if (err) {
          return err
        }
        else {
          res.json(exercises);
        }
      }).limit(limit);
    } else {
      res.send("Unknow user");
    }
  });
});

module.exports = router;
