// Mix blend mode test
Modernizr.addTest('mix-blend-mode', function(){
    return Modernizr.testProp('mixBlendMode');
});

$(document).ready(function(){
	$('.icon-wrapper').click(function(){
		$(this).toggleClass('active');
	});
});