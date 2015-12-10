$.fn.animateRotate = function(angle, duration, easing, complete) {
  var args = $.speed(duration, easing, complete);
  var step = args.step;
  return this.each(function(i, e) {
    args.complete = $.proxy(args.complete, e);
    args.step = function(now) {
      $.style(e, 'transform', 'rotate(' + now + 'deg)');
      $.style(e, 'transform-origin', '50% 65%');
      if (step) return step.apply(e, arguments);
    };

    $({deg: 0}).animate({deg: angle}, args);
  });
};

$.fn.visible = function(partial) {

    var $t            = $(this),
      $w            = $(window),
      viewTop       = $w.scrollTop(),
      viewBottom    = viewTop + $w.height(),
      _top          = $t.offset().top,
      _bottom       = _top + $t.height(),
      compareTop    = partial === true ? _bottom : _top,
      compareBottom = partial === true ? _top : _bottom;

    return ((compareBottom <= viewBottom) && (compareTop >= viewTop));
};

// challenges data
var challenges = [{
	imgsrc: "image/challenges/BookGuess.gif",
	title: "Book & Book",
	link: "pages/challenges.html#1",
	week: "Week 1"
}, {
	imgsrc: "image/challenges/winter.gif",
	title: "Winter Hunt",
	link: "pages/challenges.html#8",
	week: "Week 8"
}];


$(function() {
	randomizeChallengeSection();

	topEffect();

	if (isRetinaDisplay()) {
		$.each($(".works-image"), function(index, el) {
			var imgsrc = $(el).attr("src");
			var newsrc = imgsrc.slice(0, imgsrc.length - 4) + "@2x" + imgsrc.slice(imgsrc.length - 4);
			$(el).attr("src", newsrc);
		});
	};

	// rotate the "+" sign in weekly challenges section when hovering
	$(".challenge-relative-wrapper").hover(function() {
		$("#hangover-plus").animateRotate(90, 700);
	}, function() {
		$("#hangover-plus").animateRotate(0, 600);
	});

	scrollInEffect();
	// emit a trigger event to load bottom in blocks
	$(window).trigger("scroll");

	function randomizeChallengeSection() {
		var count = challenges.length;
		var num = Math.floor(Math.random() * count);
		$("#challenge-gif").attr("src", challenges[num].imgsrc);
		$("#challenge-name").text(challenges[num].title);
		$("#challenge-week").text(challenges[num].week);
		$("#challenge-link").attr("href", challenges[num].link);
	}

	function bottomIn(els) {
		for (var i = 0; i < els.length; i++) {
			var el = $(els[i]);
			if (el.visible(true)) {
				el.addClass("bottom-in");
			};
		};
	}

	function topEffect() {
		$(".top-decor").fadeTo(0, 0);
	 	$("#slogan-text").fadeTo(0, 0);

		$.each($(".top-decor"), function(index, el) {
			window.setTimeout(function() {
				$(el).addClass("top-in");
			}, Math.random()*(700 - 400) + 400);
		});

		$("#slogan-text").delay(700).fadeTo(700, 1);
	}

	function isRetinaDisplay() {
        if (window.matchMedia) {
            var mq = window.matchMedia("only screen and (min--moz-device-pixel-ratio: 1.3), only screen and (-o-min-device-pixel-ratio: 2.6/2), only screen and (-webkit-min-device-pixel-ratio: 1.3), only screen  and (min-device-pixel-ratio: 1.3), only screen and (min-resolution: 1.3dppx)");
            return (mq && mq.matches || (window.devicePixelRatio > 1)); 
        }
    }

    function scrollInEffect() {
		$(window).scroll(function(event) {
			// move in work units of the same row in sequence
			var works = $(".works-unit");
			var delay = 0;
			var lastTop = -999;
			for (var i = 0; i < works.length; i++) {
				var el = $(works[i]);
				
				if (el.visible(true)) {
					// check if it's in the same row
					if (el.position().top == lastTop) {
						delay += 200;
					} else {
						delay = 0;
					}

					window.setTimeout(function(e) {
						return function() {
							e.addClass("bottom-in");
						};
					}(el), delay);
					
				}
				lastTop = el.position().top;
			};

			// ghost moves
			var orangeGhost = $(".monster-orange.animated");
			if (orangeGhost.length > 0 && orangeGhost.visible(true)) {
				orangeGhost.addClass("left-in");
			};
			var blueGhost = $(".monster-blue.animated");
			if (blueGhost.length > 0 && blueGhost.visible(true)) {
				blueGhost.addClass("right-in");
			};
			var greenGhost = $(".monster-green.animated");
			if (greenGhost.length > 0 && greenGhost.visible(true)) {
				greenGhost.addClass("right-in-2");
			};

			// detail pages
			var imgs = $(".image-wrapper > img");
			var titles = $(".image-wrapper > div.animated");
			bottomIn(imgs);
			bottomIn(titles);
		});
	}
});