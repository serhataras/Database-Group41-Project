$(function(){
   
    $('#login').popover({
        placement: 'bottom',
        title: 'Welcome To HI-FI',
        html:true,
        content:  $('#myForm').html()
    }).on('click', function(){
      // had to put it within the on click action so it grabs the correct info on submit
      console.log("clicked to the lkalsd;lnldnalsd");
      $('.btn-primary').click(function(){
        var ajaxRequest;
        var values = $('#loginForm').serialize();

        ajaxRequest = $.ajax({
            url: "login.php",
            type: "POST",
            datatype : 'html',
            data: values
        });

        ajaxRequest.done(function (response, textStatus, jqXHR){
              alert(response);
        });

        ajaxRequest.fail(function (jqXHR, textStatus, errorThrown){
          alert(textStatus + " , " + errorThrown);
        });

      })
  })
})
