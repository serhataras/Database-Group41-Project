
$(document).ready(function() {

  $("#header").load("nav-bar.html", function() {
    $.getScript("login.js");
});

var data = {
  review_flow: sessionStorage.getItem('review_flow')
}

$.ajax({url: "review.php", type: "GET", data: data })
.done(function (response, textStatus, jqXHR){
  console.log(response);
  if (response == "true") {
    $("#upload").addClass("d-none");
    $("#go_back_review").removeClass("d-none");
    $("#warning").removeClass("d-none");
  }
});

  var ajaxRequestPost;
  $('#upload').click(function(){

    var performance = $('#performance').val();
    var manner = $('#manner').val();
    var satisfaction = $('#satisfaction').val();

    var data = {
      review_flow: sessionStorage.getItem('review_flow'),
      performance: performance,
      manner: manner,
      satisfaction: satisfaction
    }

    // console.dir(data);

    ajaxRequestPost = $.ajax({url: "review.php", type: "POST", data: data });
    ajaxRequestPost.done(function (response, textStatus, jqXHR){
      if (response == "true") {
        document.location.href = "/public_html/profile.html";
      }
    });
  });
});
