(function($){
	'use strict';
	$.fn.parallax = function(options){

		var deafults = {
			dataSpeed : 0,
			animationCarv : 'ease',
			animationDuration : 0,
			animationStyle  : 'all',
			parallaxContainer : 'parallax-container',
			zIndex				: 999
		}

		var settings = $.extend({},deafults,options);
		var $this = $(this),
			transition = (settings.animationDuration != 0) ? settings.animationStyle+' '+settings.animationDuration+'ms '+settings.animationCarv : ' ';
		$('.'+settings.parallaxContainer).css({
			width 		: '100%',
			height 		: '100%',
			minHeight   : '100px',
			position 	: 'relative',
			overflow 	: 'hidden',
		});
		$(window).scroll(function(){

			/* Adjust size according to device screen */
	        addEventListener('resize', setScreen);
	        setScreen();
		 
		  	$.each($this, function() {
		    	var $parallax = $(this);
		    		settings.dataSpeed = ($parallax.data('speed') != undefined) ? $parallax.data('speed') : settings.dataSpeed;
			    //check to see if this current container is within viewport
			    if (isViewElementTop($parallax)) {

			      $parallax.addClass('scrolling');
						
						if ($parallax.hasClass('scrolling')) {

							if (settings.dataSpeed <= 0) {
								$parallax.css({
									height : '100%',
									width : '100%',
									backgroundAttachment: 'fixed',
									backgroundSize: 'cover',
									zIndex : -settings.zIndex,
								});
							}else{
								var scrollTop     = $(window).scrollTop(),
								    elementOffset = (getElementTop($parallax)+getElementBottom($parallax))/2,
								    distance      = (elementOffset - scrollTop),
								    positionTop = distance/settings.dataSpeed;
								    //console.log('element : '+elementOffset);
								    //console.log('scroll : '+scrollTop);
								$parallax.css({
									height : '190%',
									width : '100%',
									position: 'absolute',
									left: 0,
									backgroundAttachment: 'scroll',
									backgroundSize: 'cover',
									top : (positionTop < 0) ? positionTop+'px' : -positionTop+'px',
									zIndex : -settings.zIndex,
									transition : transition
								});	
							}
						}

			    } else {
			      $parallax.removeClass('scrolling');
			    }
			});
		});

		  function setScreen(){
		  	$.each($this, function() {
		    	var $parallax = $(this);
		    	settings.dataSpeed = ($parallax.data('speed') != undefined) ? $parallax.data('speed') : settings.dataSpeed;
				var scrollTop     = $(window).scrollTop(),
				    elementOffset = (getElementTop($parallax)+getElementBottom($parallax))/2,
				    distance      = (elementOffset - scrollTop),
					positionTop = distance/settings.dataSpeed;
				    //console.log('element : '+elementOffset);
					//console.log('scroll : '+scrollTop);
				if (settings.dataSpeed <= 0) {
					
					$parallax.css({
						height : '100%',
						width : '100%',
						position: 'absolute',
						left: 0,
						backgroundAttachment: 'fixed',
						backgroundSize: 'cover',
						top : 0,
						zIndex : -settings.zIndex
					});	
				}else{
					$parallax.css({
						height : '190%',
						width : '100%',
						position: 'absolute',
						left: 0,
						backgroundAttachment: 'scroll',
						backgroundSize: 'cover',
						top : (positionTop < 0) ? positionTop+'px' : -positionTop+'px',
						zIndex : -settings.zIndex
					});	
				}
			});
		  }
		$(window).trigger('scroll');

		/* Document and Element Related Functions*/

		function getElementView(element){

			var win = $(window);
    
		    var viewport = {
		        top : win.scrollTop(),
		        left : win.scrollLeft()
		    };
		    viewport.right = viewport.left + win.width();
		    viewport.bottom = viewport.top + win.height();
		    
		    var bounds = element.offset();
		    bounds.right = bounds.left + element.outerWidth();
		    bounds.bottom = bounds.top + element.outerHeight();
		    return (!(viewport.right < bounds.left || viewport.left > bounds.right || viewport.bottom < bounds.top || viewport.top > bounds.bottom));

			
		}

		function getElementTop(element){

			return $(element).offset().top;
		}

		function getDocumentTop(){

			return $(window).scrollTop();
		}
			
		function getDocumentBottom(){

			var docViewTop = getDocumentTop();
			var docViewBottom = docViewTop + $(window).height();

			return docViewBottom;
		}

			

		function getElementBottom(element){

			var $element = $(element);
			var elementTop = getElementTop(element)
			var elementBottom = elementTop + $element.height();

			return elementBottom;
		}

		function isScrolledIntoView(element){
				
			var docViewTop = getDocumentTop();

			var elementTop = getElementTop(element);

			var docViewBottom = getDocumentBottom();

			var elementBottom = getElementBottom(element);

			return ((elementBottom <= docViewBottom) && (elementTop >= docViewTop));
		}

		function isViewElementTop(element){
			/*
			var window_height = $window.height();
		  var window_top_position = $window.scrollTop();
		  var window_bottom_position = (window_top_position + window_height);
			var element_height = element.outerHeight();
		    var element_top_position = element.offset().top;
		    var element_bottom_position = (element_top_position + element_height);
		    */
		    var docViewTop = getDocumentTop();

			var elementTop = getElementTop(element);

			var docViewBottom = getDocumentBottom();

			var elementBottom = getElementBottom(element);

		    return ((elementBottom >= docViewTop) && 
		    	(elementTop <= docViewBottom));
		}

	};
})(jQuery);