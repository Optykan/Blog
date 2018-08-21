var express = require('express');
var router = express.Router();
const fetch = require("node-fetch");
const Response = require('./Response');

/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('blog', { 
		title: 'Blog | Samuel Yang',
		page: 'blog',
	});
});

router.get('/post/:id', function(req, res, next){
	let origin = req.get("host")
	let postId = req.params.id
	let url = req.protocol + '://' + origin + '/api/posts/'+postId
	console.log(url)

	fetch(url).then(body=>{
		if(body.status === Response.STATUS_NO_CONTENT){
			throw new Error('Page not found')
		} else {
			return body.json()
		}
	}).then(json=>{
		let data = json.response
		res.render('blog-page', { 
			title: data.title ,
			content: data.content,
			snippet: data.snippet
		})
	}).catch(e=>{
		console.error(e)
	})
});

module.exports = router;
