var express = require('express');
var router = express.Router();
var db = {}

const PostManager = require('../models/PostManager')

/* GET /posts */
router.post('/', function(req, res, next) {
	PostManager.insert({
		title:"test"
	})
	res.json("things")
});


module.exports = router
