$(document).foundation();

function parallax($elem){
	let newx = $(window).scrollTop();
	let parallax_scale = 0.5;
	$elem.css('background-position', 'center '+(-newx*parallax_scale)+'px');
}

