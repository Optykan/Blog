var express = require('express');
var router = express.Router();
const admin = require("firebase-admin")
const Response = require('./Response')
const fetch = require("node-fetch")

router.use(function(req, res, next){
	let cookie = req.cookies.session || ""
	
	admin.auth().verifySessionCookie(cookie, true).then(decodedClaims =>{
		next()
	}).catch(err=>{
		let error = new Error('Unauthorized')
		error.status = Response.STATUS_UNAUTHORIZED;
		return next(error)
	})
})

/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('admin/template', { title: 'Admin', page: 'admin' });
});

router.get('/posts', function(req, res, next) {
	let origin = req.get("host")
	let url = req.protocol + '://' + origin + '/api/posts'

	fetch(url).then(body=>{
		if(body.status === Response.STATUS_NO_CONTENT){
			return res.render('admin/template', { 
				title: 'Admin', 
				page: 'posts', 
				posts: []
			});
		} else {
			return body.json()
		}
	}).then(json=>{
		let data = json.response
		res.render('admin/template', { 
			title: 'Admin', 
			page: 'posts', 
			posts: data
		});
	})
});

router.get('/posts/edit', function(req, res, next) {
	res.render('admin/template', { 
		title: 'Admin', 
		page: 'edit-posts',
		post:{
				title: "",
				subtitle: "",
				content: "",
				id: ""
			} 
		});
});

router.get('/posts/edit/:id', function(req, res, next) {
	let origin = req.get("host")
	let url = req.protocol + '://'+origin+'/api/posts/'+req.params.id
	
	fetch(url).then(body=>{
		return body.json()
	}).then(json=>{
		if(json.status === Response.STATUS_NOT_FOUND){
			let err = new Error(json.message);
			err.status = 404;
			next(err)
		}
		let data = json.response
		res.render('admin/template', { 
			title: 'Admin', 
			page: 'edit-posts', 
			post:{
				title: data.title,
				subtitle: data.subtitle,
				content: data.content,
				id: req.params.id,
				image: data.image
			} 
		});
	}).catch(err=>{
		next('error')
	})
});


router.get('/portfolio', function(req, res, next) {
	res.render('admin/template', { title: 'Admin', page: 'portfolio' });
});

router.get('/logout', function(req, res, next) {
	res.clearCookie("session")
	res.redirect('../')
});

module.exports = router;
