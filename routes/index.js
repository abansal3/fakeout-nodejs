var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send("You have reached the API")
});

router.post('/', function(req, res, next) {
  console.log(req.body);
  res.send("JSON received");
});

module.exports = router;
