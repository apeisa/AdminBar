
jQuery(document).ready(function($) {

  //prepare all js-enhanced functions
	$('body').addClass('editbar-jsready');

	//prepare variable shortcuts
	var $e 		    = $('#editbar'),
		$m		    = $e.find('.main'),
		$s		    = $('<div class="collapse-switch"></div>').appendTo($m.find('.logged-in')),
		$sc		    = $e.find('ul.shortcuts:eq(0)'),
        $ml         = $('<div id="ab-modal" />'),
        $mlLink     = $e.find('.modal'),
        $mlBg       = $('<div id="ab-modal-bg" />');

	//various variables to save states, values, i.e.
	var eb_top = parseInt($e.css('top')),
		eb_width = parseInt($e.css('width')),
		eb_animate,
        mlGenerated  = false,
		main_height = $m.height();

	//prepare animating & fx functions
	function follow(){
		$e.animate({top: ($(window).scrollTop()+eb_top)+'px' }, 350);
	}

	function showShortcuts(){
		$sc.stop().animate({opacity:1},250);
	}

	function collapse(){
		$m.toggleClass('collapsed');
		if ($m.hasClass('collapsed')){
			$m.stop().animate({ height: '39px'},250);
			$e.stop().animate({ left: '-'+(eb_width-60)+'px'},250, function(){showShortcuts();});
		}else{
			$sc.stop().animate({opacity:0},100);
			$m.stop().animate({ height: main_height+'px'},250);
			$e.stop().animate({ left: '0px'},250);
		}
	}

	//CSS manipulation and FX/event handlers
	$s.css({opacity: 0})
	  .hover(function(){$(this).animate({opacity: 1},150);},
			function(){$(this).animate({opacity: 0},150);});

	$e.css({ position: 'absolute' })
	$(window).bind('scroll', function(){
		clearTimeout(eb_animate);
		eb_animate = setTimeout(function(){ follow(); }, 250);
	});

	$sc.css({display:'block', opacity: 0});

	$s.click(function(){ collapse(); });

	if ($m.hasClass('collapsed')) {
		$m.removeClass('collapsed');
		collapse();
	}

  $mlBg.
  bind('open', function(e) {
    var $this = $(this);
    $ml.removeClass('ab-modal-closed').addClass('ab-modal-open');
    $this.removeClass('ab-modal-bg-closed').addClass('ab-modal-bg-open');
    $this.css('height', $(document).height());
  }).
  bind('close', function(e) {
    var $this = $(this);
    if ($('#notices', frames['ab_modal_iframe'].document).length > 0) {
      window.location.reload();
    }
    $this.removeClass('ab-modal-bg-open').addClass('ab-modal-bg-closed');
  }).
  bind('click', function(e) {
    var $this = $(this);
    $this.trigger('close');
  });



  $('#ab-pagesaved-cont').delay(2400).slideUp("slow");

  $mlLink.click(function(e) {
    e.preventDefault();
    $(document).scrollTop(0)
    if (!$m.hasClass('collapsed')) {
		collapse();
	}
    $(this).text('Continue editing');

    // We want to add #ab-modal-bg to DOM only once
    if (!mlGenerated) {
      mlGenerated = true;
      $mlBg.prependTo('body');
      $ml.appendTo($mlBg);

      // Create iFrame for admin page
      $iframe = $('<iframe name="ab_modal_iframe" id="ab_modal_iframe" frameborder="0" src="'+ $(this).attr('href') +'"></iframe>')
      .css('width', '100%')
      .css('height', $(window).height() - 120)
      .appendTo($ml);

      $mlBg.trigger('open');
    } else {
      $mlBg.trigger('open');
    }


  })

});
