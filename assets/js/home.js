/*
	Spectral by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function($) {

	var	$window = $(window),
		$body = $('body'),
		$wrapper = $('#page-wrapper'),
		$banner = $('#home'),
		$header = $('#header');

	// Play initial animations on page load.
		$window.on('load', function() {
			window.setTimeout(function() {
				$body.removeClass('is-preload');
			}, 100);
		});

	// Header.
		if ($banner.length > 0
		&&	$header.hasClass('alt')) {

			$window.on('resize', function() { $window.trigger('scroll'); });

			$banner.scrollex({
				bottom:		$header.outerHeight() + 1,
				terminate:	function() { $header.removeClass('alt'); },
				enter:		function() { $header.addClass('alt'); },
				leave:		function() { $header.removeClass('alt'); $body.removeClass('is-preload'); }
			});

		}
    
    /*$("#contact-form").submit(function(event) {
      event.preventDefault();
    });*/
    
    var validator = $("#contact-form").validate();
    
    $("#contact-form input, #contact-form textarea").focusout(function () {
      validator.element(this);
    });
    
    function submitForm() {
      if (!$("#contact-form").valid()) {
        return;
      }
      
      var data = {
        type: "contact",
        name: $("#contact-name").val(),
        email: $("#contact-email").val(),
        message: $("#contact-message").val()
      };

      $.ajax({
        type: "POST",
        url: "https://oa9v3vwu25.execute-api.us-east-2.amazonaws.com/amazon-ses-mail-stage/submit",
        dataType: "json",
        crossDomain: "true",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(data),
       
        success: function () {
          $("#form-response").html("<span class='bold'>Thank you</span>, your message has been sent.").removeClass().addClass("success");
          $("#form-response-container").slideDown(500);
          document.getElementById("contact-form").reset();
        },
        error: function () {
          $("#form-response").html("<span class='bold'>Oops, we're having technical difficulties!</span> Please contact us on <a href='tel:07752463226'>07752 463226</a> instead.").removeClass().addClass("error");
          $("#form-response-container").slideDown(500);
        }
      });
    }
    
    $("#submitButton").on("click", submitForm);
    
    $("#find-us-room, #find-us-mobile").on("click", function(event){
      if (!$(this).hasClass("find-us-active")) {
        $("#find-us-room, #find-us-mobile").toggleClass("find-us-active");
        $("#find-us-map-room, #find-us-map-mobile").toggle();
      }
    });
    
    $("#about-service button").on("click", function(event){
      $("#about-info").toggleClass("slide-right");
      window.setTimeout(function() {
        $("#about-info, #more-about-service").toggleClass("hide");
        window.setTimeout(function() {
          $("#more-about-service").toggleClass("slide");
        }, 100);
			}, 500);
    });
    
    $("#more-about-service button").on("click", function(event){
      $("#more-about-service").toggleClass("slide");
      window.setTimeout(function() {
        $("#about-info, #more-about-service").toggleClass("hide");
        window.setTimeout(function() {
          $("#about-info").toggleClass("slide-right");
        }, 100);
			}, 500);
    });
    
    $("#about-tom button").on("click", function(event){
      $("#about-info").toggleClass("fade");
      window.setTimeout(function() {
        $("#about-info, #more-about-tom").toggleClass("hide");
        window.setTimeout(function() {
          $("#more-about-tom").toggleClass("fade");
        }, 100);
			}, 500);
    });
    
    $("#more-about-tom button").on("click", function(event){
      $("#more-about-tom").toggleClass("fade");
      window.setTimeout(function() {
        $("#about-info, #more-about-tom").toggleClass("hide");
        window.setTimeout(function() {
          $("#about-info").toggleClass("fade");
        }, 100);
			}, 500);
    });
    
    $("#about-rating button").on("click", function(event){
      $("#about-info").toggleClass("slide-left");
      window.setTimeout(function() {
        $("#about-info, #more-about-rating").toggleClass("hide");
        window.setTimeout(function() {
          $("#more-about-rating").toggleClass("slide");
        }, 100);
			}, 500);
    });
    
    $("#more-about-rating button").on("click", function(event){
      $("#more-about-rating").toggleClass("slide");
      window.setTimeout(function() {
        $("#about-info, #more-about-rating").toggleClass("hide");
        window.setTimeout(function() {
          $("#about-info").toggleClass("slide-left");
        }, 100);
			}, 500);
    });
})(jQuery);