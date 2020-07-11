/*
	Spectral by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function($) {
		$(window).on('load', function() {
			$("#form").show();
      $("#dob-day, #dob-month").on('input', function() {
        if (this.value.length > 2) this.value = this.value.slice(0, 2);
      });
      $("#dob-day, #dob-month").on('focusout', function() {
        if (this.value.length == 1) this.value = "0" + this.value.toString();
      });
      
      /*$("#submitButton").click( function() {
        $.ajax({
          url: '#',
          type: 'post',
          dataType: 'text',
          data: "Hello World",
          success: function(data) {alert(data);},
          error: function(data) {alert(data);}
        });
      });*/
      
      $("#form").validate();
		});
})(jQuery);