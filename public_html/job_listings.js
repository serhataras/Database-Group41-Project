var fields;
var cities;
var streets;
var selectedFields = [];
var range;

var offerListener = function(index){
  var ajaxRequest = $.ajax({
      url: "login.php",
      type: "GET",
      data: {type: 2,
      selected_job_ID: globalJobList[index].job_ID}
  });

  ajaxRequest.done(function (response, textStatus, jqXHR){
        if (response != 1) {
          document.location.href = "/public_html/offer.html";
        }else{
          alert("You need to be logged in to see details!");
        }
  });
}

var globalJobList;
var filteredJobsLabel = "<div class=\"row\">"+
  "<label>Filtered Jobs</label>"+
"</div>";

$(function(){

$("#header").load("nav-bar.html", function() {
  $.getScript("login.js");
});

  var ajaxRequestField;
  var ajaxRequestCity;
  var ajaxRequestStreet;
  var ajaxRequestFilter;

  ajaxRequestField = $.ajax({url: "create_account.php", type: "GET", data: { type: 6 } });
  ajaxRequestField.done(function (response, textStatus, jqXHR){
    fields = JSON.parse(response);
    for (var i = 0; i < fields.length; i++) {
      $('#field').append($('<option>', {value:i, text: fields[i].field_name}));
    }
    $('#field').multiselect({
      onChange: function(option, checked, select) {
        if (checked) {
          selectedFields.push($(option).val() + 1);
        }else{
          const index = selectedFields.indexOf($(option).val() + 1);
          if (index !== -1)
              selectedFields.splice(index, 1);
        }
      }
    });
  });

  ajaxRequestCity = $.ajax({url: "create_account.php", type: "GET", data: { type: 1 } });
  ajaxRequestCity.done(function (response, textStatus, jqXHR){
    cities = JSON.parse(response);
    for (var i = 0; i < cities.length; i++) {
      $('#city').append($('<option>', {value:i, text: cities[i].city_name}));
    }
  });

  ajaxRequestStreet = $.ajax({url: "create_account.php", type: "GET", data: { type: 2 } });
  ajaxRequestStreet.done(function (response, textStatus, jqXHR){
    streets = JSON.parse(response);
    for (var i = 0; i < streets.length; i++) {
      $('#street').append($('<option>', {value:i, text: streets[i].street_name}));
    }
  });

  $("#range").slider({
    tooltip: 'always',
    formatter: function(value) {
  		return 'Current value: ' + value;
  	}
  });

  $('#filter').click(function(){

    var data = {
      keyword: $('#keyword').val(),
      range_max: JSON.parse("["+$('#range').val()+"]")[1],
      range_min: JSON.parse("["+$('#range').val()+"]")[0],
      fields: selectedFields,
      duration: $('#duration').val(),
      start_date: $('#start_date').val(),
      city: $('#city').val() == -1 ? -1 : cities[$('#city').val()].city_ID,
      street: $('#street').val() == -1 ? -1 : streets[$('#street').val()].street_ID
    }

    console.dir(data);

    ajaxRequestFilter = $.ajax({url: "job_listings.php", type: "GET", data: data });
    ajaxRequestFilter.done(function (response, textStatus, jqXHR){
      // console.log(response);
      globalJobList = JSON.parse(response);
      $('#jobs').children().remove();
      $('#jobs').append(filteredJobsLabel);
      for (var i = 0; i < globalJobList.length; i++) {
        $('#jobs').append("<div class=\"row border\"> "+
          "<div class=\"col-lg-3\">" +
            "<label>" + globalJobList[i].job_title +"</label>"+
          "</div>" +
          "<div class=\"col-lg-3\">" +
            "<label>" + globalJobList[i].job_description + "</label>"+
          "</div>"+
          "<div class=\"col-lg-3\">" +
            "<label>" + globalJobList[i].job_description + "</label>"+
          "</div>"+
          "<div class=\"col-lg-3\">" +
            "<button onclick=\"offerListener(" + i + ")\" class=\"btn btn-success\">Offer</button>"+
          "</div>"+
        "</div>"+
        "<br>");
      }
    });
  });

})
