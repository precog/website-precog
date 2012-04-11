$(document).ready(function(){
//ADMIN
$("#admin-your-info").click(function(){
    $("#body-content-admin-slider").animate({
        'left': '0px'
        }, {queue: false}
        );
    }
    );
$("#admin-your-pa").click(function(){
    $("#body-content-admin-slider").animate({
      'left': '-840px'
   }, {queue: false});
});

$("#admin-your-tolkens").click(function(){
    $("#body-content-admin-slider").animate({
        'left': '-1680px'
        }, {queue: false}
        );
    }
    );

$('.admin-apps').sortable({  
    connectWith: '.admin-apps',  
    handle: 'h2',  
    cursor: 'move',  
    placeholder: 'placeholder',  
    forcePlaceholderSize: true,  
    opacity: 0.4,  
})
.disableSelection(); 