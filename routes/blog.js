var express = require('express');
var router = express.Router();
const fetch = require("node-fetch");
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

	fetch(url).then(body=>{
		if(body.status === Response.STATUS_NO_CONTENT){
			throw new Error('Page not found')
		} else {
			return body.json()
		}
	}).then(json=>{
		let data = json.response
		res.render('blog-page', { title: title })
	}).catch(e=>{
		console.error(e)
	})
	res.render('blog-page', { title: 'Some Post' });
});

module.exports = router;
