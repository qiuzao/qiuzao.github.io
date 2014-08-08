$(function($) {
 
    $.fn.parallax = function(options) {
 
        var windowHeight = $(window).height();
 
        // Establish default settings
        var settings = $.extend({
            speed        : 0.15
        }, options);
 
        // Iterate over each object in collection
        return this.each( function() {
 
        // Save a reference to the element
        var $this = $(this);

        // Set up Scroll Handler
        $(document).scroll(function(){

        var scrollTop = $(window).scrollTop();
            var offset = $this.offset().top;
            var height = $this.outerHeight();
 
        // Check if above or below viewport
        if (offset + height <= scrollTop || offset >= scrollTop + windowHeight) {
        return;
        }
         
        var yBgPosition = Math.round((offset - scrollTop) * settings.speed);
     
                    // Apply the Y Background Position to Set the Parallax Effect
        $this.css('background-position', 'center ' + yBgPosition + 'px');
                    
        });
        });
    }

$('.parallax-section').parallax({
speed : 0.5
});

});



jQuery(document).ready(function() {
    var offset = 220;
    var duration = 500;
    jQuery(window).scroll(function() {
        if (jQuery(this).scrollTop() > offset) {
            jQuery('.icon-up').fadeIn(duration);
        } else {
            jQuery('.icon-up').fadeOut(duration);
        }
    });
    
    jQuery('.icon-up').click(function(event) {
        event.preventDefault();
        jQuery('html, body').animate({scrollTop: 0}, duration);
        return false;
    })

        $('a[href*=#]').click(function(event){
        $('html, body').animate({
            scrollTop: $( $.attr(this, 'href') ).offset().top
        }, 500);
        event.preventDefault();
    });

        

var myimages=new Array()

function preloadimages("http://qiuzao.net/img/pv1-c.jpg","http://qiuzao.net/img/pv2-c.jpg","http://qiuzao.net/img/pv3-c.jpg","http://qiuzao.net/img/pv4-c.jpg","http://qiuzao.net/img/pv5-c.jpg","../img/pv6-c.jpg"){
for (i=0;i<preloadimages.arguments.length;i++){
myimages[i]=new Image()
myimages[i].src=preloadimages.arguments[i]
}
});

$(document).ready(preloadimages);






