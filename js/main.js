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
    },
    complete: function( xhr, status ) {
      // console.log('the request is complete');
    },
  });
}