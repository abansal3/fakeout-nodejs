var express = require('express');
var router = express.Router();
const Flag = require('../models/Flag');
const User = require('../models/User');

/* GET users listing. */
router.post('/flag', function(req, res, next) {
    User.findById(req.body.userId, (err, existingUser) => {
        if (err) { return next(err); }
    
        if (existingUser) {
            var userId = existingUser._id;
        
            const flag = new Flag({
                linkUrl: req.body.link,
                domain: req.body.domain,
                flaggedBy: userId,
                isSuspicious: req.body.isSuspicious,
                comment: req.body.flagComment
            });

            flag.save((err) => {
                if (err) { return next(err); }
                console.log(flag, "Flag has been added to DB");
                res.send("Flag has been added");
            });
        } else {
            console.log("User is not authorized")
        }
      });
});

router.post('/check', function(req, res, next) {
    Flag.findOne({ linkUrl: req.body.url }, (err, existingFlag) => {
        if (err) { return next(err); }

        if (existingFlag) {
            console.log("Flagged url found");
            res.json({flagged: true})
        } else {
            console.error('No flagged link found');
            res.send('No flagged link found');
        }
    });
});

router.post('/checkIfAlreadyFlaggedByUser', function(req, res, next) {
    Flag.findOne({ linkUrl: req.body.link, flaggedBy: req.body.user }, (err, existingFlag) => {
        if (err) { return next(err); }

        if (existingFlag) {
            console.log("Flagged url found by this user");
            res.json({flaggedByUser: true})
        } else {
            console.error('No flagged link found');
            res.send('No flagged link found');
        }
    });
});

router.post('/getFlagsByUser', function(req, res, next) {
    Flag.find({ flaggedBy: req.body.user }, (err, flags) => {
        if (err) { return next(err); }

        if (flags) {
            console.log("Flags found for user");
            res.json({flags: flags});
        } else {
            console.error('No flagged link found');
            res.send('No flagged link found');
        }
    }).limit(5);
});

module.exports = router;
