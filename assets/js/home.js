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
    $("#about-info-container").toggleClass("slide-right");
    window.setTimeout(function() {
      $("#about-info-container, #more-about-service").toggleClass("hide");
      window.setTimeout(function() {
        $("#more-about-service").toggleClass("slide");
      }, 100);
    }, 500);
  });
  
  $("#more-about-service button").on("click", function(event){
    $("#more-about-service").toggleClass("slide");
    window.setTimeout(function() {
      $("#about-info-container, #more-about-service").toggleClass("hide");
      window.setTimeout(function() {
        $("#about-info-container").toggleClass("slide-right");
      }, 100);
    }, 500);
  });
  
  $("#about-tom button").on("click", function(event){
    $("#about-info-container").toggleClass("fade");
    window.setTimeout(function() {
      $("#about-info-container, #more-about-tom").toggleClass("hide");
      window.setTimeout(function() {
        $("#more-about-tom").toggleClass("fade");
      }, 100);
    }, 500);
  });
  
  $("#more-about-tom button").on("click", function(event){
    $("#more-about-tom").toggleClass("fade");
    window.setTimeout(function() {
      $("#about-info-container, #more-about-tom").toggleClass("hide");
      window.setTimeout(function() {
        $("#about-info-container").toggleClass("fade");
      }, 100);
    }, 500);
  });
  
  $("#about-rating button").on("click", function(event){
    $("#about-info-container").toggleClass("slide-left");
    window.setTimeout(function() {
      $("#about-info-container, #more-about-rating").toggleClass("hide");
      window.setTimeout(function() {
        $("#more-about-rating").toggleClass("slide");
      }, 100);
    }, 500);
  });
  
  $("#more-about-rating button").on("click", function(event){
    $("#more-about-rating").toggleClass("slide");
    window.setTimeout(function() {
      $("#about-info-container, #more-about-rating").toggleClass("hide");
      window.setTimeout(function() {
        $("#about-info-container").toggleClass("slide-left");
      }, 100);
    }, 500);
  });
  
  // Instanciate Google Reviews in Testimonials section
  var numReviews = 4;
  var shortenNames = true;

  var shortenName = function(name) {
    if (name.split(" ").length > 1) {
      var shortenedName = "";
      shortenedName = name.split(" ");
      return shortenedName[0] + " " + shortenedName[1][0] + ".";
    }
  };

  var convertTime = function(UNIX_timestamp) {
    var newDate = new Date(UNIX_timestamp * 1000);
    var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    var time = newDate.getDate() + ". " + months[newDate.getMonth()] + " " + newDate.getFullYear();
    return time;
  };

  // Also filters any reviews with no text
  var filterReviewsByMinRating = function(reviews) {
    if (reviews === void 0) {
      return [];
    } else {
      for (var i = reviews.length - 1; i >= 0; i--) {
        if (reviews[i].rating < 5 || reviews[i].text == "") {
          reviews.splice(i, 1);              
        }
      }

      reviews.splice(0, reviews.length - numReviews);
      
      // Sort reviews by date
      reviews.sort(function(a,b){
        return (a.time > b.time) ? -1 : (b.time > a.time) ? 1 : 0;
      });
      
      return reviews;
    }
  };

  var renderReviews = function(reviews) {
    var html = "";
    for (var i = 0; i < numReviews; i++) {
      var date = convertTime(reviews[i].time);
      var name = shortenNames ? shortenName(reviews[i].author_name) : reviews[i].author_name;
      var tempHtml = "<div class='review-item'><div class='review-header'><div class='review-photo'><img src=" + reviews[i].profile_photo_url + " alt='' width='87' height='87'></div><div class='review-header-data'><div class='review-meta'><span class='review-author'>" + name + "</span><span class='review-sep'></span></div><span class='review-date'>" + date + "</span><div class='review-stars'><ul><li><i class='star'></i></li><li><i class='star'></i></li><li><i class='star'></i></li><li><i class='star'></i></li><li><i class='star'></i></li></ul></div></div></div><p class='review-text'>&quot;" + reviews[i].text + "&quot;</p></div>";
      html = html + tempHtml;
    }
    $("#google-reviews").append(html);
  };

  // GOOGLE PLACES API CALL STARTS HERE
  // see documentation here:  https://developers.google.com/maps/documentation/javascript/3.exp/reference#PlacesService

  // initiate a Google Places Object
  var service = new google.maps.places.PlacesService(document.getElementById('google-reviews'));
  const request = {
    placeId: "ChIJSXeTMXWFdUgRDMOBQsGOlsU"
  };
  // the callback is what initiates the rendering if Status returns OK
  var callback = function(place, status) {
    if (status == google.maps.places.PlacesServiceStatus.OK) {
      var filteredReviews = filterReviewsByMinRating(place.reviews);
      if (filteredReviews.length > 0) {
        renderReviews(filteredReviews);
      }
    }
  }

  // Runs the Plugin
  service.getDetails(request, callback);
})(jQuery);