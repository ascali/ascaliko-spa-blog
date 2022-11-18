console.log("%c Hey, Stop!", 
  "font-weight: bold; font-size: 50px;color: red; "+
  "text-shadow: 3px 3px 0 rgb(217,31,38) , 6px 6px 0 rgb(226,91,14) , 9px 9px 0 rgb(245,221,8) , 12px 12px 0 rgb(5,148,68) , 15px 15px 0 rgb(2,135,206) , 18px 18px 0 rgb(4,77,145) , 21px 21px 0 rgb(42,21,113)");
console.log("%c don't go further", "font-weight: bold; font-size: 50px; color:red;")
if('serviceWorker' in navigator) {
  navigator.serviceWorker
           .register('./js/sw.js')
           .then(function() { console.log("Service Worker 👷 Registered"); });
}

(function() {
  if (!localStorage.getItem('cookieconsent')) {
    document.body.innerHTML += '\
    <div class="cookieconsent" style="position:fixed;padding:20px;left:0;bottom:0;background-color:#000;color:#FFF;text-align:center;width:100%;z-index:99999;">\
      This site uses cookies. By continuing to use this website, you agree to their use. \
      <a href="#" style="color:#CCCCCC;">I Understand</a>\
    </div>\
    ';
    document.querySelector('.cookieconsent a').onclick = function(e) {
      e.preventDefault();
      document.querySelector('.cookieconsent').style.display = 'none';
      localStorage.setItem('cookieconsent', true);
    };
  }
})();

/*(function() {
  if (!localStorage.getItem('cookieconsent')) {
    var request = new XMLHttpRequest();
    request.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        var data = JSON.parse(request.responseText);
        var eu_country_codes = ['AL','AD','AM','AT','BY','BE','BA','BG','CH','CY','CZ','DE','DK','EE','ES','FO','FI','FR','GB','GE','GI','GR','HU','HR','IE','IS','IT','LT','LU','LV','MC','MK','MT','NO','NL','PO','PT','RO','RU','SE','SI','SK','SM','TR','UA','VA'];
        if (eu_country_codes.indexOf(data.countryCode) != -1) {
          document.body.innerHTML += '\
          <div class="cookieconsent" style="position:fixed;padding:20px;left:0;bottom:0;background-color:#000;color:#FFF;text-align:center;width:100%;z-index:99999;">\
            This site uses cookies. By continuing to use this website, you agree to their use. \
            <a href="#" style="color:#CCCCCC;">I Understand</a>\
          </div>\
          ';
          document.querySelector('.cookieconsent a').onclick = function(e) {
            e.preventDefault();
            document.querySelector('.cookieconsent').style.display = 'none';
            localStorage.setItem('cookieconsent', true);
          };
        }
      }
    };
    request.open('GET', 'http://ip-api.com/json', true);
    request.send();
  }
})();*/

$(document).ready(function(){
  let firstPageRef = $('a.menu').attr('href');      
  callPage(firstPageRef);
  
  $('a.menu').on('click', function(e){  
      e.preventDefault();
      var pageRef = $(this).attr('href');       
      callPage(pageRef);
  });

  let isCurrentDate = new Date().getFullYear();
  $("#current-date").html(isCurrentDate);

  /*setTimeout(function () {
      $("#cookieConsent").fadeIn(200);
   }, 4000);
  $("#closeCookieConsent, .cookieConsentOK").click(function() {
      $("#cookieConsent").fadeOut(200);
  });*/
});

function callPage(pageRefInput) {
  $.ajax({
    url: pageRefInput,
    type: "GET",
    dataType: "text",
    success: function( response ) {
      // console.log('the page was loaded', response);
      $('.content').html(response);
      if ($('#blog').length==1) {
        get_blog_dev();
      }
    },
    error: function( error ) {
      console.log('the page wasn\'t loaded', error);
      $('.content').html('the page wasn\'t loaded, sorry try again and check your internet connection!');
    },
    complete: function( xhr, status ) {
      // console.log('the request is complete');
    },
  });
}

function get_blog_dev() {
  $.ajax({
    url: `https://dev.to/api/articles?username=ascaliko`,
    type: "GET",
    dataType: "JSON",
    success: function( response ) {
      console.log('the page was loaded', response);
      $('#list-blog').html(" ");
      var list_blog = "";
      for (var i = response.length - 1; i >= 0; i--) {
        list_blog += `<li><a class="list-post" href="${response[i].canonical_url}" target="_blank">${response[i].readable_publish_date} - <b>${response[i].title}</b></a></li>`;
      }
      $('#list-blog').html(list_blog);
    },
    error: function( error ) {
      console.log('the api wasn\'t loaded', error);
    },
    complete: function( xhr, status ) {
      // console.log('the request is complete');
    },
  });
}