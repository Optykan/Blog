var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('index', { 
		title: 'Express',
		projects: [{
			title: 'Avante Landscaping',
			image: '/images/portfolio/avante-1.jpg',
			description: 'some words here',
			link: 'http://avantelandscaping.com'	
		},{
			title: 'Unionville Skating Club',
			image: '/images/portfolio/usc-1.jpg',
			description: 'more words here',
			link: 'https://unionvilleskatingclub.com'
		},{
			title: 'Project 5K',
			image: 'http://via.placeholder.com/300x300',
			description: 'even more words',
			link: 'https://project5k.ca'
		},{
			title: 'Tzuyu',
			image: 'http://via.placeholder.com/300x300',
			description: 'It\'s basically the best discord bot there is',
			link: 'https://github.com/Optykan/Tzuyu'
		},{
			title: 'Beat',
			image: 'http://via.placeholder.com/300x300',
			description: 'PennApps XVII Top 10! There\'s something about pitch perfect here and a riff-off',
			link: 'https://github.com/kpsuperplane/pennapps-beat/' 
		},{
			title: 'Project 5K',
			image: 'http://via.placeholder.com/300x300',
			description: 'Volunteer non-profit organization. I\'m just the web dude',
			link: 'https://project5k.ca'
		},{
			title: 'TeachAssist Scraper',
			image: 'http://via.placeholder.com/300x300',
			description: 'Using 100% legitimate approved methods, it attempts to scrape your marks from YRDSB TeachAssist.',
			link: 'https://github.com/Optykan/TeachAssist'
		},{
			title: 'Boilerplate',
			image: 'http://via.placeholder.com/300x300',
			description: 'React + Foundation6 + Sass + Gulp.js + Browserify + Express.js + Babel makes for easy site setup. Just clone it and get started!',
			link: 'https://github.com/Optykan/site-boilerplate'
		}
		]
	});
});

module.exports = router;
