var cities;
var streets;
var fields;
var industries;
var costRanges;

$(function(){
  var ajaxRequestCity;
  var ajaxRequestStreet;
  var ajaxRequestIndustry;
  var ajaxRequestField;
  var ajaxRequestPost;
  var ajaxRequestCostRange;

  ajaxRequestCostRange = $.ajax({url: "create_job.php", type: "GET", data: { type: 5 } });
  ajaxRequestCostRange.done(function (response, textStatus, jqXHR){
    costRanges = JSON.parse(response);
    for (var i = 0; i < costRanges.length; i++) {
      $('#cost_range').append($('<option>', {value:i, text: costRanges[i].cost_range_desc}));
    }
  });

  ajaxRequestCity = $.ajax({url: "create_job.php", type: "GET", data: { type: 1 } });
  ajaxRequestCity.done(function (response, textStatus, jqXHR){
    cities = JSON.parse(response);
    for (var i = 0; i < cities.length; i++) {
      $('#city').append($('<option>', {value:i, text: cities[i].city_name}));
    }
  });

  ajaxRequestStreet = $.ajax({url: "create_job.php", type: "GET", data: { type: 2 } });
  ajaxRequestStreet.done(function (response, textStatus, jqXHR){
    streets = JSON.parse(response);
    for (var i = 0; i < streets.length; i++) {
      $('#street').append($('<option>', {value:i, text: streets[i].street_name}));
    }
  });

  ajaxRequestIndustry = $.ajax({url: "create_job.php", type: "GET", data: { type: 3 } });
  ajaxRequestIndustry.done(function (response, textStatus, jqXHR){
    industries = JSON.parse(response);
    for (var i = 0; i < industries.length; i++) {
      $('#industry').append($('<option>', {value:i, text: industries[i].industry_name}));
    }
  });

  ajaxRequestField = $.ajax({url: "create_job.php", type: "GET", data: { type: 4 } });
  ajaxRequestField.done(function (response, textStatus, jqXHR){
    fields = JSON.parse(response);
    for (var i = 0; i < fields.length; i++) {
      $('#field').append($('<option>', {value:i, text: fields[i].field_name}));
    }
  });

  $('#create_job_button').click(function(){

    var data = {
      title: $('#title').val(),
      description: $('#description').val(),
      start_date: $('#start_date').val(),
      duration: $('#duration').val(),
      minimum_cost: costRanges[$('#cost_range').val()].cost_range_ID,
      address: {
        city: cities[$('#city').val()].city_ID,
        street: streets[$('#street').val()].street_ID,
        zip_code: $('#zip_code').val()
      },
      field: fields[$('#field').val()].field_ID,
      industry: industries[$('#industry').val()].industry_ID
    }

    console.dir(data);

    ajaxRequestPost = $.ajax({url: "create_job.php", type: "POST", data: data });
    ajaxRequestPost.done(function (response, textStatus, jqXHR){
      console.log(response);
    });
  });

});
