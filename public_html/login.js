$(document).ready(function(){

var loggedIn = false;
  var ajaxRequest = $.ajax({
      url: "login.php",
      type: "GET",
      data: {type: 1}
  });

  ajaxRequest.done(function (response, textStatus, jqXHR){
        if (response == 'true') {
          loggedIn = true;
          $('#login').addClass('d-none');
          $('#sign_up').addClass('d-none');
          $('#profile').removeClass('d-none');
        }
  });

  var loginForm = "<form id=\"loginForm\">" +
        "<label for=\"email\">Email | Username:</label>" +
        "<input type=\"text\" name=\"email\" id=\"form_email\" class=\"form-control input-md\" required>" +
        "<label for=\"password\">Password:</label>" +
        "<input type=\"password\" name=\"password\" id=\"form_password\" class=\"form-control input-md\" required>" +
        "<button type=\"button\" id=\"login_button\" class=\"btn btn-primary\">Login</button>" +
  "</form>";

    $('#login').popover({
        placement: 'bottom',
        title: 'Welcome To HI-FI',
        html:true,
        content:  function(){return loginForm}
    }).on('click', function(){
      // had to put it within the on click action so it grabs the correct info on submit
      $('#login_button').click(function(){
        var ajaxRequest;
        var email = $('#form_email').prop('value');
        var password = $('#form_password').prop('value');
        var data = {
          email: email,
          password: password
        };
        ajaxRequest = $.ajax({
            url: "login.php",
            type: "POST",
            data: data
        });

        ajaxRequest.done(function (response, textStatus, jqXHR){
          //  console.log(response);
          if (response == 'done') {
            // console.log("login is ok");
            $('#login').each(function() {
              $(this).popover('hide');
            });
            loggedIn = true;
            $('#login').addClass('d-none');
            $('#sign_up').addClass('d-none');
            $('#profile').removeClass('d-none');
          }
        });

        ajaxRequest.fail(function (jqXHR, textStatus, errorThrown){
          alert(textStatus + " , " + errorThrown);
        });

      })
  })

  $('#create_job').click(function(){
    if (loggedIn) {
      document.location.href = "/public_html/create_job.html";
    }else{
      alert("You must be logged in to create a new job!");
    }
  })
})
