var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('index', { 
		title: 'Express',
		projects: [{
			title: 'Avante Landscaping',
			subtitle: 'WordPress•Foundation6',
			image: '/images/portfolio/avante-1.jpg',
			description: 'some words here',
			link: 'http://avantelandscaping.com'	
		},{
			title: 'Unionville Skating Club',
			subtitle: 'WordPress•Foundation6',
			image: '/images/portfolio/usc-1.jpg',
			description: 'more words here',
			link: 'https://unionvilleskatingclub.com'
		},{
			title: 'Tzuyu',
			subtitle: '',
			image: 'http://via.placeholder.com/300x300',
			description: 'It\'s basically the best discord bot there is',
			link: 'https://github.com/Optykan/Tzuyu'
		},{
			title: 'Beat',
			subtitle: 'MongoDB•Angular•Ionic',
			image: 'http://via.placeholder.com/300x300',
			description: 'PennApps XVII Top 10! There\'s something about pitch perfect here and a riff-off',
			link: 'https://github.com/kpsuperplane/pennapps-beat/' 
		},{
			title: 'Project 5K',
			subtitle: 'Angular•Laravel•PHP',
			image: 'http://via.placeholder.com/300x300',
			description: 'Volunteer non-profit organization. I\'m just the web dude',
			link: 'https://project5k.ca'
		},{
			title: 'TeachAssist Scraper',
			subtitle: 'PHP',
			image: 'http://via.placeholder.com/300x300',
			description: 'Using 100% legitimate approved methods, it attempts to scrape your marks from YRDSB TeachAssist.',
			link: 'https://github.com/Optykan/TeachAssist'
		},{
			title: 'Boilerplate',
			subtitle: 'Node.js',
			image: 'http://via.placeholder.com/300x300',
			description: 'React + Foundation6 + Sass + Gulp.js + Browserify + Express.js + Babel makes for easy site setup. Just clone it and get started!',
			link: 'https://github.com/Optykan/site-boilerplate'
		}
		]
	});
});

module.exports = router;
