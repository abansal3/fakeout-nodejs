var express = require('express');
var router = express.Router();
const Flag = require('../models/Flag');
const User = require('../models/User');

/* GET users listing. */
router.post('/flag', function(req, res, next) {
    User.findOne({ email: req.body.email }, (err, existingUser) => {
        if (err) { return next(err); }
    
        if (existingUser) {
            var userId = existingUser._id;
        
            const flag = new Flag({
                linkUrl: req.body.link,
                domain: req.body.domain,
                flaggedBy: userId,
                isSuspicious: req.body.isSuspicious,
                comment: ""
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

module.exports = router;
