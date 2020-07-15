/*
	Spectral by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function($) {
		$(window).on('load', function() {
			$("#form").show();
		});
    
    var thisYear = new Date().getFullYear();
    var minYear = (thisYear - 125);
    var maxYear = (thisYear - 1);
    $("#dob-year").attr({
      "min": minYear, 
      "max": maxYear,
      "data-msg-min": "Please enter a year greater than or equal to " + minYear + ".",
      "data-msg-max": "Please enter a year less than or equal to " + maxYear + "."
    });
    
    var validator = $("#form").validate({
      groups: {
        dob: "dob-day dob-month dob-year"
      },
      errorPlacement: function(error, element) {
        if (element.attr("name") == "dob-day" || element.attr("name") == "dob-month" || element.attr("name") == "dob-year") {
          error.insertAfter("#dob-year");
        } 
        else if (element.attr("name") == "terms-agree") {
          error.insertAfter("#terms-agree-label");
        } else {
          error.insertAfter(element);
        }
      }
    });

    
    $("#form input, #form textarea").focusout(function () {
      validator.element(this);
    });

    $("#dob-day, #dob-month").on('input', function() {
      if (this.value.length > 2) this.value = this.value.slice(0, 2);
    });
    $("#dob-day").on('focusout', function() {
      if (this.value.length == 1) this.value = "0" + this.value.toString();
    });
    $("#dob-month").on('focusout', function() {
      if (this.value.length == 1) this.value = "0" + this.value.toString();
      validator.element("#dob-day");
    });
    $("#dob-year").on('focusout', function() {
      validator.element("#dob-day");
      validator.element("#dob-month");
    });
    
    function submitForm() {
      if (!$("#form").valid()) {
        $(window).scrollTop($(".error:visible:first").prev().offset().top - 50);
        return;
      }
      
      var hasHadMassage = "N/A";
      if ($("#had-massage-yes").prop('checked')) hasHadMassage = "Yes";
      else if ($("#had-massage-no").prop('checked')) hasHadMassage = "No";
      
      var data = {
        type: "consultation",
        name: $("#first-name").val() + " " + $("#last-name").val(),
        dob: $("#dob-day").val() + "/" + $("#dob-month").val() + "/" + $("#dob-year").val(),
        phone: $("#phone").val(),
        email: $("#email").val(),
        notes: $("#client-notes").val(),
        
        // optional
        hadMassage: hasHadMassage,
        treatmentType: $("#treatment-type").val(),
        pressureLevel: $("#pressure-level").val(),
        desiredOutcome: $("#desired-outcome").val(),
        avoidAreas: $("#avoid-areas").val(),
        
        termsAgree: $("#terms-agree").val(),
        mailingList: ($("#mailing-list").prop('checked') ? $("#mailing-list").val() : "DO NOT add me to the mailing list")
      };

      $.ajax({
        type: "POST",
        url: "https://oa9v3vwu25.execute-api.us-east-2.amazonaws.com/amazon-ses-mail-stage/submit",
        dataType: "json",
        crossDomain: "true",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(data),
       
        success: function () {
          $("#form-response").html("<span class='bold'>Thank you</span>, your consultation form has been submitted.").removeClass().addClass("success");
          $("#form-response-container").slideDown(500);
          document.getElementById("form").reset();
        },
        error: function () {
          $("#form-response").html("<span class='bold'>Oops, we're having technical difficulties!</span> You will have to complete a paper form at the time of your treatment instead.").removeClass().addClass("error");
          $("#form-response-container").slideDown(500);
        }
      });
    }
    
    $("#submitButton").on("click", submitForm);
})(jQuery);