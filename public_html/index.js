var detailsListener = function(index){
    console.log(index);
}

var globalJobList;
var exampleJobsLabel = "<div class=\"row\">"+
  "<label>Example Jobs</label>"+
"</div>";

$(function(){
  $("#header").load("nav-bar.html");
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
          console.dir(globalJobList);
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
    console.log(keyword);
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
    });

    ajaxRequest.fail(function (jqXHR, textStatus, errorThrown){
      alert(textStatus + " , " + errorThrown);
    });
  })

})
