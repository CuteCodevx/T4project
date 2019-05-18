var express = require('express');
var router = express.Router();
router.get('/', function(req, res, next) {
    // show detailed privacy info
    res.render('Privacy');
});
module.exports=router;