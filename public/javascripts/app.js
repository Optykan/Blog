'use strict';

$(document).foundation();

function parallax($elem) {
	var newx = $(window).scrollTop();
	var parallax_scale = 0.5;
	$elem.css('background-position', 'center ' + -newx * parallax_scale + 'px');
}

// $(document).scroll(e=>{
// 	parallax($('#hero-left')) 
// })