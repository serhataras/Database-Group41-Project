var cities;
var streets;
var fields;
var industries;
var costRanges;
var jobInfo;
var offers;

var offerHTML = "<div class=\"row col-lg-12\">" +
  "<label>Offers Made</label>" +
"</div>";

var assignToOfferListener = function(index){
    console.log(index);
    $.ajax({url: "show_offers.php", type: "POST", data: { type: 2, p_user_ID: offers[index].user_ID, offering_ID: offers[index].offering_ID } }).done(function (response, textStatus, jqXHR){
      if (response == 'updated') {
        document.location.href = "/public_html/profile.html";
      }
    });
}

var detailsOfferListener = function(index){
    var id = "#collapsedDetails" + index;
    if ($(id).is(':visible')) {
      $(id).hide();
    }else{
      $(id).show();
    }
}

$(function(){

$("#header").load("nav-bar.html", function() {
  $.getScript("login.js");
});

  var ajaxRequestJobInfo = $.ajax({url: "show_offers.php", type: "GET", data: { type: 0 } });
  // ajaxRequestJobInfo.done(function (response, textStatus, jqXHR){
  //
  //   jobInfo = JSON.parse(response);
  //   $('#title').val(jobInfo[0].job_title);
  //   $('#description').val(jobInfo[0].job_description);
  //   $('#start_date').val(jobInfo[0].time_period_start);
  //   $('#duration').val(jobInfo[0].time_period_duration);
  //   $('#zip_code').val(jobInfo[0].zip_code);
  //   $('#cost_range options').filter(function() {
  //     return ($(this).val() == jobInfo[0].cost_range_ID);
  //   }).prop('selected', true).trigger("update");
  //   $('#city').val(jobInfo[0].city_ID).trigger("update");
  //   $('#street').val(jobInfo[0].street_ID).trigger("update");
  //   $('#field').val(jobInfo[0].field_ID).trigger("update");
  //   $('#industry').val(jobInfo[0].industry_ID).trigger("update");
  // });
  var purpose = sessionStorage.getItem('purpose');
  if (purpose == 1) {
    $("#update_jobForm input").prop("disabled", true);
    $("#update_jobForm select").prop("disabled", true);
    $("#update_jobForm textarea").prop("disabled", true);
    var ajaxRequestOffers = $.ajax({url: "show_offers.php", type: "GET", data: { type: 7 } });
    ajaxRequestOffers.done(function (response, textStatus, jqXHR){
      offers = JSON.parse(response);
       console.dir(offers);
      $('#offers_made').children().remove();
      $('#offers_made').append(offerHTML);

      for (var i = 0; i < offers.length; i++) {

        var avgRating;
        $.ajax({url: "show_offers.php", async: false, type: "GET", data: { type: 6, p_user_ID: offers[i].user_ID } }).done(function (response, textStatus, jqXHR){
          var customerInfo = JSON.parse(response);
          if (customerInfo.length == 0) {
            avgRating = "Not Rated"
          }else{
            var sum = 0;
            for (var j = 0; j < customerInfo.length; j++) {
              // console.log(customerInfo[j].manner + "  " + customerInfo[j].satisfaction + "  " + customerInfo[j].performance);
              sum = sum + parseInt(customerInfo[j].manner) + parseInt(customerInfo[j].satisfaction) + parseInt(customerInfo[j].performance);
            }
            console.log(sum + "   " + customerInfo.length);
            avgRating = sum/(3*customerInfo.length);
          }

          var appendString = "<div class=\"row col-lg-12 border\">" +
          "<div class=\"col col-lg-4\">" +
            "<div class=\"row\">" +
              "<label>Title: " + offers[i].offering_title + "</label>" +
            "</div>" +
          "</div>" +
          "<div class=\"col col-lg-4\">" +
            "<div class=\"row\">" +
              "<label>Start Date: " + offers[i].time_period_start + "</label>" +
            "</div>" +
            "<div class=\"row\">" +
              "<label>Price: " + offers[i].cost + "</label>" +
            "</div>" +
          "</div>" +
            "<div class=\"col col-lg-2\">" +
            "  <div class=\"row\">" +
              "  <label>remaining days: " + offers[i].time_period_duration + "</label>" +
            "  </div>" +
          "  </div>" +
            "<div class=\"col col-lg-1\">" +
            "<button onclick=\"assignToOfferListener(" + i + ")\" class=\"btn btn-primary btn-sm\" type=\"button\" name=\"button\">Assign</button>" +
                "<br> "+
                "</div>" +
              "<div class=\"col col-lg-1\">" +
              "  <button onclick=\"detailsOfferListener(" + i + ")\" class=\"btn btn-primary btn-sm\" type=\"button\" name=\"button\">Details</button>" +
            "  </div>" +
          "  </div>" +
          "  <br>" +
          "<div  id=\"collapsedDetails" + i + "\"> "+
          "<div class=\"row col-lg-12 border\">"+
          "<div class=\"col col-lg-4\">"+
          "<div class=\"row\">"+
          "<label >Username: "+offers[i].username+"</label>"+
          "</div>"+
          "<div class=\"row\">"+
          "<label>Email: "+offers[i].email+"</label>"+
          "</div>"+
          "<div class=\"row\">"+
          "<label >Birthdate:"+offers[i].birthdate+"</label>"+
          "</div>"+
          "</div>"+
          "<div class=\"col col-lg-4\">"+
        "  <div class=\"row\">"+
        "  <label >City: "+offers[i].city_name+"</label>"+
          "</div>"+
          "<div class=\"row\">"+
          "<label>Street:"+ offers[i].street_name+"</label>"+
        "  </div>"+
        "  <div class=\"row\">"+
        "  <label>Zip code:"+ offers[i].zip_code+"</label>"+
        "  </div>"+
          "</div>"+
          "<div class=\"col col-lg-4\">"+
        "  <div class=\"row\">"+
        "  <label >University:"+ offers[i].university_name+"</label>"+
          "</div>"+
          "<div class=\"row\">"+
          "<label >Major:"+ offers[i].major_name +"</label>"+
          "</div>"+
          "<div class=\"row\">"+
          "<label>Avg Rating: " + avgRating + "</label>"+
          "</div>"+
          "</div>"+
          "</div>"+
          "</div>";

          $('#offers_made').append(appendString);

        });
      }

    });
  }else if(purpose == 2){
    $("#update_jobForm input").prop("disabled", true);
    $("#update_jobForm select").prop("disabled", true);
    $("#update_jobForm textarea").prop("disabled", true);
  }else{
      $("#update_job_button").removeClass('d-none');
      $("#go_back_button").addClass('d-none');
  }

  var ajaxRequestCity;
  var ajaxRequestStreet;
  var ajaxRequestIndustry;
  var ajaxRequestField;
  var ajaxRequestPost;
  var ajaxRequestCostRange;

  ajaxRequestCostRange = $.ajax({url: "create_job.php", type: "GET", data: { type: 5 } });
  // ajaxRequestCostRange.done(function (response, textStatus, jqXHR){
  //   costRanges = JSON.parse(response);
  //   for (var i = 0; i < costRanges.length; i++) {
  //     $('#cost_range').append($('<option>', {value:i, text: costRanges[i].cost_range_desc}));
  //   }
  // });

  ajaxRequestCity = $.ajax({url: "create_job.php", type: "GET", data: { type: 1 } });
  // ajaxRequestCity.done(function (response, textStatus, jqXHR){
  //   cities = JSON.parse(response);
  //   for (var i = 0; i < cities.length; i++) {
  //     $('#city').append($('<option>', {value:i, text: cities[i].city_name}));
  //   }
  // });

  ajaxRequestStreet = $.ajax({url: "create_job.php", type: "GET", data: { type: 2 } });
  // ajaxRequestStreet.done(function (response, textStatus, jqXHR){
  //   streets = JSON.parse(response);
  //   for (var i = 0; i < streets.length; i++) {
  //     $('#street').append($('<option>', {value:i, text: streets[i].street_name}));
  //   }
  // });

  ajaxRequestIndustry = $.ajax({url: "create_job.php", type: "GET", data: { type: 3 } });
  // ajaxRequestIndustry.done(function (response, textStatus, jqXHR){
  //   industries = JSON.parse(response);
  //   for (var i = 0; i < industries.length; i++) {
  //     $('#industry').append($('<option>', {value:i, text: industries[i].industry_name}));
  //   }
  // });

  ajaxRequestField = $.ajax({url: "create_job.php", type: "GET", data: { type: 4 } });
  // ajaxRequestField.done(function (response, textStatus, jqXHR){
  //   fields = JSON.parse(response);
  //   for (var i = 0; i < fields.length; i++) {
  //     $('#field').append($('<option>', {value:i, text: fields[i].field_name}));
  //   }
  // });

  $.when( ajaxRequestCostRange, ajaxRequestCity, ajaxRequestStreet, ajaxRequestIndustry, ajaxRequestField, ajaxRequestJobInfo ).done(function ( v1, v2, v3, v4, v5, v6 ) {

    // console.log(v1[0]);
    // console.log(v2);
    // console.log(v3);
    // console.log(v4);
    // console.log(v5);
    // console.log(v6);

    costRanges = JSON.parse(v1[0]);
    for (var i = 0; i < costRanges.length; i++) {
      $('#cost_range').append($('<option>', {value:i, text: costRanges[i].cost_range_desc}));
    }

    cities = JSON.parse(v2[0]);
    for (var i = 0; i < cities.length; i++) {
      $('#city').append($('<option>', {value:i, text: cities[i].city_name}));
    }

    streets = JSON.parse(v3[0]);
    for (var i = 0; i < streets.length; i++) {
      $('#street').append($('<option>', {value:i, text: streets[i].street_name}));
    }

    industries = JSON.parse(v4[0]);
    for (var i = 0; i < industries.length; i++) {
      $('#industry').append($('<option>', {value:i, text: industries[i].industry_name}));
    }

    fields = JSON.parse(v5[0]);
    for (var i = 0; i < fields.length; i++) {
      $('#field').append($('<option>', {value:i, text: fields[i].field_name}));
    }

    jobInfo = JSON.parse(v6[0]);
    $('#title').val(jobInfo[0].job_title);
    $('#description').val(jobInfo[0].job_description);
    $('#start_date').val(jobInfo[0].time_period_start);
    $('#duration').val(jobInfo[0].time_period_duration);
    $('#zip_code').val(jobInfo[0].zip_code);
    $('#cost_range').val(jobInfo[0].cost_range_ID-1).trigger("update");
    $('#city').val(jobInfo[0].city_ID-1).trigger("update");
    $('#street').val(jobInfo[0].street_ID-1).trigger("update");
    $('#field').val(jobInfo[0].field_ID-1).trigger("update");
    $('#industry').val(jobInfo[0].industry_ID-1).trigger("update");
});

  $('#update_job_button').click(function(){

    var data = {
      type: 1,
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

    // console.dir(data);

    ajaxRequestPost = $.ajax({url: "show_offers.php", type: "POST", data: data });
    ajaxRequestPost.done(function (response, textStatus, jqXHR){
      // console.log(response);
      if (response == 'updated') {
        document.location.href = "/public_html/";
      }
    });
  });

});
