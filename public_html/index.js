var detailsListener = function(index){
  var ajaxRequest = $.ajax({
      url: "login.php",
      type: "GET",
      data: {type: 2,
      selected_job_ID: globalJobList[index].job_ID}
  });

  ajaxRequest.done(function (response, textStatus, jqXHR){
        if (response == 'true') {
          document.location.href = "/public_html/offer.html";
        }else{
          alert("You need to be logged in to see details!");
        }
  });
}

var createJobListener = function(){
  var ajaxRequest = $.ajax({
      url: "login.php",
      type: "GET",
      data: {type: 1}
  });

  ajaxRequest.done(function (response, textStatus, jqXHR){
        if (response == 'true') {
          document.location.href = "/public_html/create_job.html";
        }else{
          alert("You need to be logged in to create a new job!");
        }
  });
}

var globalJobList;
var exampleJobsLabel = "<div class=\"row\">"+
  "<label>Example Jobs</label>"+
"</div>";

$(document).ready(function(){
  $("#header").load("nav-bar.html", function() {
    $.getScript("login.js");
});

    var ajaxRequest1;
    ajaxRequest1 = $.ajax({
        url: "index.php",
        type: "GET",
        data: {
          type: 1
        }
    });

    ajaxRequest1.done(function (response, textStatus, jqXHR){
          globalJobList = JSON.parse(response);
          // console.dir(globalJobList);
          $('#jobs').children().remove();
          $('#jobs').append(exampleJobsLabel);
          for (var i = 0; i < globalJobList.length; i++) {
            $('#jobs').append("<div class=\"row border\"> "+
              "<div class=\"col-md-4\">" +
                "<label>" + globalJobList[i].job_title +"</label>"+
              "</div>" +
              "<div class=\"col-md-4\">" +
                "<label>" + globalJobList[i].job_description + "</label>"+
              "</div>"+
              "<div class=\"col-md-4\">" +
                "<button onclick=\"detailsListener(" + i + ")\" class=\"btn btn-success\">Details</button>"+
              "</div>"+
            "</div>"+
            "<br>");
          }
    });

    ajaxRequest1.fail(function (jqXHR, textStatus, errorThrown){
      alert(textStatus + " , " + errorThrown);
    });

  $('#searchKeyword').click(function(){
    var ajaxRequest;
    var keyword = $('#searchBar').val();
    // console.log(keyword);
    ajaxRequest = $.ajax({
        url: "index.php",
        type: "GET",
        data: {
          type: 2,
          keyword: keyword
        }
    });

    ajaxRequest.done(function (response, textStatus, jqXHR){
      globalJobList = JSON.parse(response);
      $('#jobs').children().remove();
      $('#jobs').append(exampleJobsLabel);
      for (var i = 0; i < globalJobList.length; i++) {
        $('#jobs').append("<div class=\"row border\"> "+
          "<div class=\"col-md-4\">" +
            "<label>" + globalJobList[i].job_title +"</label>"+
          "</div>" +
          "<div class=\"col-md-4\">" +
            "<label>" + globalJobList[i].job_description + "</label>"+
          "</div>"+
          "<div class=\"col-md-4\">" +
            "<button onclick=\"detailsListener(" + i + ")\" class=\"btn btn-success\">Details</button>"+
          "</div>"+
        "</div>"+
        "<br>");
      }

      if (globalJobList.length == 0) {
        $('#jobs').append("No results found for " + keyword + " !");
      }
    });

    ajaxRequest.fail(function (jqXHR, textStatus, errorThrown){
      alert(textStatus + " , " + errorThrown);
    });
  })

})
