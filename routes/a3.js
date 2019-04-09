var express = require('express');
var router = express.Router();
var handledata = require('../service/HandleData');
/* GET users listing. */
router.get('/', function (req, res){

    res.render('A3',{"aresult":req.session.admin[0]});

})
module.exports=router;