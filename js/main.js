console.log("%c Hey, Stop!", 
  "font-weight: bold; font-size: 50px;color: red; "+
  "text-shadow: 3px 3px 0 rgb(217,31,38) , 6px 6px 0 rgb(226,91,14) , 9px 9px 0 rgb(245,221,8) , 12px 12px 0 rgb(5,148,68) , 15px 15px 0 rgb(2,135,206) , 18px 18px 0 rgb(4,77,145) , 21px 21px 0 rgb(42,21,113)");
console.log("%c don't go further", "font-weight: bold; font-size: 50px; color:red;")
if('serviceWorker' in navigator) {
  navigator.serviceWorker
           .register('./js/sw.js')
           .then(function() { console.log("Service Worker 👷 Registered"); });
}

$(document).ready(function(){
  let firstPageRef = $('a.menu').attr('href');      
  callPage(firstPageRef);
  
  $('a.menu').on('click', function(e){  
      e.preventDefault();
      var pageRef = $(this).attr('href');       
      callPage(pageRef);
  });
});

function callPage(pageRefInput) {
  $.ajax({
    url: pageRefInput,
    type: "GET",
    dataType: "text",
    success: function( response ) {
      // console.log('the page was loaded', response);
      $('.content').html(response);
    },
    error: function( error ) {
      console.log('the page wasn\'t loaded', error);
      $('.content').html('the page wasn\'t loaded');
    },
    complete: function( xhr, status ) {
      // console.log('the request is complete');
    },
  });
}