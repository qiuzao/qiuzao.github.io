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

    $("#joanna").hover(
        function()
        {
            console.log("log")
            $(this).attr("src", "image/joanna.gif");
        },
        function()
        {
            $(this).attr("src", "image/joanna.png");
        }                         
    ); 

    preload([
    'image/xiaoming.gif'
    ]); 

    preload([
    'image/joanna.gif'
    ]);              
});

function preload(arrayOfImages) {
    $(arrayOfImages).each(function () {
        $('<img />').attr('src',this).appendTo('body').css('display','none');
    });
}

