var express = require('express');
var router = express.Router();
var db = {}

const PostManager = require('../models/PostManager')

/* GET /posts */
router.post('/', async function(req, res, next) {
	let insert = await PostManager.insert({
		title:"test"
	})
	res.json(insert)
});


module.exports = router
