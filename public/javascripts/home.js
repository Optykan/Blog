'use strict';

$('#credit-icon').hover(function () {
  $(this).css('color', $(this).data('hover-color'));
}, function () {
  $(this).css('color', '#cacaca');
});

var wow = new WOW({
  boxClass: 'wow', // animated element css class (default is wow)
  animateClass: 'animated', // animation css class (default is animated)
  offset: 0, // distance to the element when triggering the animation (default is 0)
  mobile: true, // trigger animations on mobile devices (default is true)
  live: true, // act on asynchronously loaded content (default is true)
  scrollContainer: '#home'
});
wow.init();