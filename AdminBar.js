
jQuery(document).ready(function($) {

	//prepare all js-enhanced functions
	$('body').addClass('adminbar-loaded');
	
	var $adminbar = $('#adminbar');
	var $li = $adminbar.find('li');
	var $links = $adminbar.find('a').not('admin');
	var $modalLinks = $adminbar.find('a.modal');
	var $browse = $adminbar.find('.browse a');
	
	
	var $modal = $('<div id="ab-modal"></div>').data('active', 'browse');
	
	var clicked = false;
	
	$links.click(function(){
		setActive($(this));
	});
	
	
	
	$modalLinks.click(function(){
		if(!clicked) {
			$modal.prependTo('body');
		};

		if ($adminbar.data('active') == $(this).attr('class')) {
			slideUp(true);
		} else {
			
			$modal.addClass('loading').find('iframe').remove();
			
			
			slideDown($(this));
			// We "preload" this so it should be shown pretty fast after animation
			$iframe = $('<iframe name="ab_modal_iframe" id="ab_modal_iframe" frameborder="0" src="'+ $(this).attr('href') +'"></iframe>')
			.css('width', '100%')
			.css('height', 0)
			.appendTo($modal);
		
			
			$adminbar.data('active', $(this).attr('class'));
		};
		

		return false;
	});
	
	$browse.click(function(){
		slideUp(true);
		return false;
	});
	
	function setActive(link) {
		$li.removeClass('active');
		link.parent().addClass('active');
	}
	
	function slideDown(link) {
		
		modalHeight = $(window).height() - 40; 
		$modal.animate({
			height: modalHeight + 'px'
		},
		
		// Animation time
		300,
		
		// After slide is done
		function(){
			$iframe.hide().css('height', $modal.height()).show();
		});
		document.body.style.overflow='hidden';
	};
	
	function slideUp(clean) {
		if (clean) {
			$adminbar.data('active', 'browse');
			$modal.find('iframe').attr('src', '').remove();
			setActive($browse);
		}
		$adminbar.data('active', 'browse');
		$modal.removeClass('loading').stop().animate({
			height: '0px'
		}, 300, function(){
			$modal.addClass('loading');
		});
		document.body.style.overflow='auto';
		
	};
	
	$(window).resize(function() {
		if ($modal.height() > 1) {
			modalHeight = $(window).height() - 40; 
			$modal.stop().animate({
				height: modalHeight + 'px'
			},
			
			// Animation time
			100, function(){
				$iframe.css('height', $modal.height());
			});
		}
		
	});
	
	$("#ab-pagesaved").delay(3000).slideUp("normal");
	
	

});
