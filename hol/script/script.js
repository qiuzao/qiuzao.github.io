$(document).ready(function()
{
    $("#xiaoming").hover(
        function()
        {
            console.log("log")
            $(this).attr("src", "image/xiaoming.gif");
        },
        function()
        {
            $(this).attr("src", "image/xiaoming.png");
        }                         
    );  

    preload([
    'image/xiaoming.gif'
    ]);               
});

function preload(arrayOfImages) {
    $(arrayOfImages).each(function () {
        $('<img />').attr('src',this).appendTo('body').css('display','none');
    });
}

