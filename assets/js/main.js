/*
	Hyperbolic by Pixelarity
	pixelarity.com | hello@pixelarity.com
	License: pixelarity.com/license
*/

(function($) {

	var	$window = $(window),
		$body = $('body'),
		$sections = $('#wrapper > section'),
		$header = $sections.eq(0),
		$nav = $('#nav'),
		//$navList = $('#nav li'),
		$banner = $sections.eq(1);
		/*$about = $sections.eq(2);
		$who = $sections.eq(3);
		$benefits = $sections.eq(4);
		$how = $sections.eq(5);
		$contact = $sections.eq(6);*/

	// Breakpoints.
		breakpoints({
			default:   ['1681px',   null       ],
			xlarge:    ['1281px',   '1680px'   ],
			large:     ['981px',    '1280px'   ],
			medium:    ['737px',    '980px'    ],
			small:     ['481px',    '736px'    ],
			xsmall:    ['361px',    '480px'    ],
			xxsmall:   [null,       '360px'    ]
		});

	// Play initial animations on page load.
		$window.on('load', function() {
			window.setTimeout(function() {
				$body.removeClass('is-preload');
			}, 100);
		});

	// Dropdowns.
		$('#nav > ul').dropotron({
			alignment: 'right',
			hideDelay: 350,
			baseZIndex: 100000
		});

	// Menu.
		$('<a href="#navPanel" class="navPanelToggle">Menu</a>')
			.appendTo($header);

		$(	'<div id="navPanel">' +
				'<nav>' +
					$nav.navList() +
				'</nav>' +
				'<a href="#navPanel" class="close"></a>' +
			'</div>')
				.appendTo($body)
				.panel({
					delay: 500,
					hideOnClick: true,
					hideOnSwipe: true,
					resetScroll: true,
					resetForms: true,
					target: $body,
					visibleClass: 'is-navPanel-visible',
					side: 'right'
				});

	// Scrolly.
		$('.scrolly').scrolly({
			offset: function() { return $nav.is(":visible") ? 64 : 0; }
		});
    $('.scrolly-alt').scrolly({
			offset: function() { return $nav.is(":visible") || $header.height() < 50 ? - 5 - 64 : - 90; }
		});

	// Header.
		if ($banner.length > 0
		&&	$header.hasClass('alt')) {

			$body.addClass('header-alt');

			$window.on('resize', function() { $window.trigger('scroll'); });

			$banner.scrollex({
				bottom:		$nav.is(":visible") ? $header.outerHeight() - 64 : $header.outerHeight() - 28,
				terminate:	function() { /*$navList.eq(0).removeClass('current');*/ $header.removeClass('alt'); $body.removeClass('header-alt'); },
				enter:		function() { /*$navList.eq(0).addClass('current');*/ $header.addClass('alt'); $body.addClass('header-alt'); },
				leave:		function() { /*$navList.eq(0).removeClass('current');*/ $header.removeClass('alt'); $body.removeClass('header-alt'); $header.addClass('reveal'); }
			});

		}
    
  // Nav List
    /*$about.scrollex({
      top: $banner.offset().bottom,
      terminate:	function() { $navList.eq(1).removeClass('current'); },
      enter:		function() { $navList.eq(1).addClass('current'); },
      leave:		function() { $navList.eq(1).removeClass('current'); }
    });
    
    $who.scrollex({
      top: $about.offset().bottom,
      terminate:	function() { $navList.eq(2).removeClass('current'); },
      enter:		function() { $navList.eq(2).addClass('current'); },
      leave:		function() { $navList.eq(2).removeClass('current'); }
    });
    
    $benefits.scrollex({
      terminate:	function() { $navList.eq(3).removeClass('current'); },
      enter:		function() { $navList.eq(3).addClass('current'); },
      leave:		function() { $navList.eq(3).removeClass('current'); }
    });
    
    $how.scrollex({
      terminate:	function() { $navList.eq(4).removeClass('current'); },
      enter:		function() { $navList.eq(4).addClass('current'); },
      leave:		function() { $navList.eq(4).removeClass('current'); }
    });
    
    $contact.scrollex({
      terminate:	function() { $navList.eq(5).removeClass('current'); },
      enter:		function() { $navList.eq(5).addClass('current'); },
      leave:		function() { $navList.eq(5).removeClass('current'); }
    });*/

	// Banner.

		// Hack: Fix flex min-height on IE.
			if (browser.name == 'ie') {
				$window.on('resize.ie-banner-fix', function() {

					var h = $banner.height();

					if (h > $window.height())
						$banner.css('height', 'auto');
					else
						$banner.css('height', h);

				}).trigger('resize.ie-banner-fix');
			}

	// Signup Form.
		(function() {

			// Vars.
				var $form = document.querySelectorAll('#signup-form')[0],
					$email = document.querySelectorAll('#signup-form input[type="email"]')[0],
					$submit = document.querySelectorAll('#signup-form input[type="submit"]')[0],
					$message;

			// Bail if addEventListener isn't supported.
				if (!('addEventListener' in $form))
					return;

			// Message.
				$message = document.createElement('span');
					$message.classList.add('message');
					$form.appendChild($message);

				$message._show = function(type, text) {

          $message.classList.remove('visible');
					$message.innerHTML = text;
					$message.classList.remove('success');
					$message.classList.remove('failure');
					$message.classList.add(type);
					$message.classList.add('visible');

					window.setTimeout(function() {
						$message._hide();
					}, 10000);

				};

				$message._hide = function() {
					$message.classList.remove('visible');
				};

			// Events.
			// Note: If you're *not* using AJAX, get rid of this event listener.
				$form.addEventListener('submit', function(event) {

					event.stopPropagation();
					event.preventDefault();

					// Hide message.
						$message._hide();

					// Disable submit.
						$submit.disabled = true;

					// Process form.
					// Note: Doesn't actually do anything yet (other than report back with a "thank you"),
					// but there's enough here to piece together a working AJAX submission call that does.
						window.setTimeout(function() {
              
              var body = new FormData;
              body.append("email", $email.value);
              
              fetch($form.action, {method: 'POST', body: body}).then(function (response) {
                return response;
              }).then(function(response) {
                if (response.status === 200) $message._show('success', 'Thank you! We will contact you when classes begin.');
                else if (response.status === 400) $message._show('failure', "The email you entered is invalid or doesn't exist, please try again.");
                else {
                  $message._show('failure', 'Whoops, something went wrong. Please try again later.');
                  return;
                }
                
                $form.reset();
                $submit.disabled = false;
              }).catch(function(err) {
                $message._show('failure', 'Whoops, something went wrong. Please try again later');
              });
              
						}, 750);

				});

		})();

})(jQuery);