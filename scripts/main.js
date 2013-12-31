$(function() {
	appUtil.initSlideshow();

	// header menu hover effect
	$(".section-index-item").mouseenter(function() {
		$("#" + $(this).html() + "-dot").addClass("active");
	});
	$(".section-index-item").mouseleave(function() {
		$("#" + $(this).html() + "-dot").removeClass("active");
	});
	// header menu click effect
	$(".section-index-item").click(function() {
		$('html, body').animate({
			scrollTop: $("#" + $(this).html() + "-section").offset().top
		}, 500);
	});

	// go back to top button
	$(window).scroll(function() {
		if($("#top-button").is(":animated")) {
			return;
		}

		var workTitleYPosition = $("#work-section").offset().top;
		if ($(this).scrollTop() > workTitleYPosition) {
			if($("#top-button").is(":visible")) {
				return;
			}
			$("#top-button").fadeIn();
		} else {
			if(!$("#top-button").is(":visible")) {
				return;
			}
			$("#top-button").fadeOut();
		}
	})

	$("#top-button").click(function() {
		$('html, body').animate({
			scrollTop: 0
		}, 300);
	});

	// small portrait click effect
	$("#portrait-small").click(function() {
		$(this).fadeOut("fast", function() {
			$("#about-section").animate({
				height: "30em"
			}, 500, function() {
				$(".portrait-big").fadeIn();
				$(".stat-charts").fadeIn();
			});
		});
	});

	// work tile click event. swap slideshow content
	$(".hex-tile-container").click(function() {
		$("#slides").fadeOut('fast', function(){
			$("#slideshow-container").children().remove();
			$("#slideshow-container").append("<div class='work-slideshow' id='slides'>\
				<div>4</div> \
	        			<div>5</div>\
	        			<div>6</div>\
	        			<div>7</div>\
	        			</div>");

			appUtil.initSlideshow();
		});

	});

	// work tile hover
	$(".hexagon-in2").mouseenter(function() {
		$(".overlay", this).stop(true, true).fadeIn(200);
	}).mouseleave(function() {
		$(".overlay", this).stop(true, true).fadeOut(200);
	})

	// footer ghosts effects
	var lastScrollY = 0;
	$(window).scroll(function() {
		if($(window).scrollTop() + $(window).height() > $(document).height() - 10) {
			if($("#yellow-ghost").is(":animated")) {
				return;
			}

			var yPosition = $(this).scrollTop();
			if (yPosition <= lastScrollY) {
				lastScrollY = yPosition;
				return;
			}
			lastScrollY = yPosition;

			$(".big-ghost").animate({
				bottom: "3em"
			}, 400, "swing", function() {
				$(this).animate({
					bottom: "0"
				}, 400, "swing", function() {
					$(this).animate({
						bottom: "1.3em"
					}, 300, "swing", function() {
						$(this).animate({
							bottom: "0"
						}, 300, "swing");
					});
				});
			});

			$("#green-ghost").animate({
				bottom: "5em"
			}, 400, "swing", function() {
				$(this).animate({
					bottom: "0"
				}, 400, "swing", function() {
					$(this).animate({
						bottom: "2em"
					}, 300, "swing", function() {
						$(this).animate({
							bottom: "0"
						}, 300, "swing");
					});
				});
			});
		}
	});

	// submit message
	var errorCount;
	$("#submit").click(function() {
		errorCount = 0;
		$(".error").removeClass("error");

		if ($("#name").val().length < 1) {
			errorCount += 1;
			$("#name").addClass("error");
		}
		if (!$("#email").val().match(/^[A-Z0-9._%-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i)) {
			errorCount += 1;
			$("#email").addClass("error");
			$("#email").attr("placeholder", "Please leave a valid email");
		}
		if ($("#msg").val().length < 5) {
			errorCount += 1;
			$("#msg").addClass("error");
			$("#msg").attr("placeholder", "Please leave a meaningful message");
		}

		if (errorCount === 0) {
			$.ajax({
			  type: "POST",
			  url: "https://mandrillapp.com/api/1.0/messages/send.json",
			  data: {
			    "key": "EjI3WNimhFe6HH1er37ZAg",
			    "message": {
			      "from_email": $("#email").val(),
			      "to": [
			          {
			            "email": "qiuzaozhang@gmail.com",
			            "name": "Qiuzao",
			            "type": "to"
			          },
			        ],
			      "subject": "message from " + encodeURIComponent($("#name").val()),
			      "html": encodeURIComponent($("#msg").val())
			    }
			  }
			 }).done(function(response) {
				$("#msg-title").html("Roger that!");
				$("#msg-body").html("Message sent");
				$('#msg-modal').modal('show');
			 }).error(function(e) {
			 	$("#msg-title").html("Sorry");
				$("#msg-body").html("There are some errors in your message.");
				$('#msg-modal').modal('show');
			 });
		} else {
			$("#msg-title").html("Sorry");
			$("#msg-body").html("There are some errors in your message.");
			$('#msg-modal').modal('show');
		}
	});
});

var appUtil = {
	initSlideshow: function() {
		// get width of the slideshow window
		var slideWidth = $('#slides').width();
		// 0.625 * ( 1 - 0.03 * 2 ) / ( 1 - 0.02 * 2 ) = 0.612 is the image ratio
		var slideHeight = slideWidth * 0.612;

		$("#slides").slidesjs({
			width: slideWidth,
			height: slideHeight,
			pagination: {
		      active: true,
		      effect: "slide"
		    }
		});
	}
}