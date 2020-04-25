var express = require('express');
var router = express.Router();
const User = require('../models/User');

/* GET users listing. */
router.post('/signup', function(req, res, next) {
  console.log('Email', req.body.email);
  console.log('Password', req.body.password);

  const user = new User({
    email: req.body.email,
    password: req.body.password
  });

  User.findOne({ email: req.body.email }, (err, existingUser) => {
    if (err) { return next(err); }

    if (existingUser) {
      console.error("no user found");
      res.send('Account with that email address already exists.');
    }

    user.save((err) => {
      if (err) { return next(err); }
      res.send("User has been created");
    });
  });
});

router.post('/signin', function(req, res, next) {
  console.log('Email', req.body.email);
  console.log('Password', req.body.password);

  User.findOne({ email: req.body.email }, (err, existingUser) => {
    if (err) { return next(err); }

    if (existingUser) {
      existingUser.comparePassword(req.body.password, function(err, isMatch) {
        if (err) throw err;
        console.log(req.body.password, isMatch); // -> Password123: true
        // res.send("user found");
        res.json(existingUser)
      });
    } else {
      console.error("no user found");
      res.send('No user found with this email address');
    }
  });
});

router.post('/upvote', function(req, res, next) {
  User.findById(req.body.userId, (err, existingUser) => {
    if (err) { return next(err); }

    console.log(existingUser);

    var currentVotes = existingUser.upVotes
    currentVotes += 1;
    existingUser.upVotes = currentVotes

    existingUser.save((err) => {
      if (err) { return next(err); }
      res.send("User has been created");
    });
  });
});

module.exports = router;
