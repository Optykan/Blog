var express = require('express');
var router = express.Router();
var db = {}

const PostManager = require('../models/PostManager')

/* GET /posts */
router.post('/', function(req, res, next) {
	res.json(PostManager.insert({
		title:"test"
	}))
});

function provideDB(conn){
	PostManager.db = conn
}

module.exports = {
	router: router,
	provideDB: provideDB
}
