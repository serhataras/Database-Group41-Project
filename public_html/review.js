//$(function(){
// with plugin options
$(document).ready(function() {
  var ajaxRequestPost;
  $('#upload').click(function(){

    var performance = $('#performance').val();
    var manner = $('#manner').val();
    var satisfaction = $('#satisfaction').val();

    var data = {
      performance: performance,
      manner: manner,
      satisfaction: satisfaction
    }

    console.dir(data);

    ajaxRequestPost = $.ajax({url: "review.php", type: "POST", data: data });
    ajaxRequestPost.done(function (response, textStatus, jqXHR){
      console.log(response);
    });
  });
});
//});
