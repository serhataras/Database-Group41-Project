var userInfo;
var offers;
var postedJobs;

var offerHTML = "<div class=\"row col-lg-12\">" +
  "<label>Offers</label>" +
"</div>";

var postedJobsHTML = "<div class=\"row col-lg-12\">" +
  "<label>Posted Jobs</label>" +
"</div>";

var reviewOfferListener = function(index){
    console.log(index);
}

var reviewJobListener = function(index){
    console.log(index);
}

var quitListener = function(index){
    console.log(index);
}

var updateListener = function(index){
    console.log(index);
}

var doneListener = function(index){
    console.log(index);
}

var withdrawOfferListener = function(index){
    console.log(index);
}

$(function(){
  var ajaxRequestUserInfo;
  var ajaxRequestOffers;
  var ajaxRequestPostedJob;

  ajaxRequestCity = $.ajax({url: "profile.php", type: "GET", data: { type: 1 } });
  ajaxRequestCity.done(function (response, textStatus, jqXHR){
    userInfo = JSON.parse(response)[0];
    //console.dir(userInfo);
    $('#name').append(userInfo.name + " " + userInfo.surname);
    $('#username').append("Username: " + userInfo.username);
    $('#email').append("Email: " + userInfo.email);
    $('#birthdate').append("Birthdate: " + userInfo.birth_date);
    $('#city').append("City: " + userInfo.city_name);
    $('#street').append("Street: " + userInfo.street_name);
    $('#zip_code').append("Zip Code: " + userInfo.zip_code);
    $('#university').append("University: " + userInfo.university_name);
    $('#major').append("Major: " + userInfo.major_name);
  });

  ajaxRequestOffers = $.ajax({url: "profile.php", type: "GET", data: { type: 2 } });
  ajaxRequestOffers.done(function (response, textStatus, jqXHR){
    offers = JSON.parse(response);

    $('#offers').children().remove();
    $('#offers').append(offerHTML);

    for (var i = 0; i < offers.length; i++) {

      $('#offers').append(
        "<div class=\"row col-lg-12 border\">" +
        "<div class=\"col col-lg-4\">" +
          "<div class=\"row\">" +
            "<label>Title: " + offers[i].offering_title + "</label>" +
          "</div>" +
          "<div class=\"row\">" +
            "<p>Description: " + offers[i].job_description + "</p>" +
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
          "  <div class=\"row\">" +
            "  <label>current stat: " + offers[i].job_status_name + "</label>" +
          "  </div>" +
        "  </div>" +
          "<div class=\"col col-lg-1\">" +
            "<button onclick=\"reviewOfferListener(" + i + ")\" class=\"btn btn-primary btn-sm\" type=\"button\" name=\"button\">Review</button>" +
        "  </div>" +
          "<div class=\"col col-lg-1\">" +
          "  <button onclick=\"quitListener(" + i + ")\" class=\"btn btn-danger btn-sm\" type=\"button\" name=\"button\">Quit</button>" +
        "  </div>" +
      "  </div>" +
      "  <br>"
      );
    }

  });

  ajaxRequestPostedJob = $.ajax({url: "profile.php", type: "GET", data: { type: 3 } });
  ajaxRequestPostedJob.done(function (response, textStatus, jqXHR){
    postedJobs = JSON.parse(response);

    $('#posted_jobs').children().remove();
    $('#posted_jobs').append(postedJobsHTML);

    for (var i = 0; i < postedJobs.length; i++) {
      $('#posted_jobs').append(
        "<div class=\"row col-lg-12 border\">" +
        "<div class=\"col col-lg-4\">" +
          "<div class=\"row\">" +
            "<label>Title: " + postedJobs[i].job_title + "</label>" +
          "</div>" +
          "<div class=\"row\">" +
            "<p>Description: " + postedJobs[i].job_description + "</p>" +
          "</div>" +
        "</div>" +
        "<div class=\"col col-lg-4\">" +
          "<div class=\"row\">" +
            "<label>Start Date: " + postedJobs[i].time_period_start + "</label>" +
          "</div>" +
          "<div class=\"row\">" +
            "<label>Price: " + postedJobs[i].cost_range_desc + "</label>" +
          "</div>" +
        "</div>" +
          "<div class=\"col col-lg-2\">" +
          "  <div class=\"row\">" +
            "  <label>remaining days: " + postedJobs[i].time_period_duration + "</label>" +
          "  </div>" +
          "  <div class=\"row\">" +
            "  <label>current stat: " + postedJobs[i].job_status_name + "</label>" +
          "  </div>" +
        "  </div>" +
          "<div class=\"col col-lg-1\">" +
            "<button onclick=\"reviewJobListener(" + i + ")\" class=\"btn btn-primary btn-sm\" type=\"button\" name=\"button\">Review</button>" +
            "<br>" +
            "<button onclick=\"updateListener(" + i + ")\" class=\"btn btn-success btn-sm\" type=\"button\" name=\"button\">Update</button>" +
        "  </div>" +
          "<div class=\"col col-lg-1\">" +
          "  <button onclick=\"doneListener(" + i + ")\" class=\"btn btn-warning btn-sm\" type=\"button\" name=\"button\">Done</button>" +
            "<br>" +
          "  <button onclick=\"withdrawOfferListener(" + i + ")\" class=\"btn btn-danger btn-sm\" type=\"button\" name=\"button\">Withdraw</button>" +
        "  </div>" +
      "  </div>" +
      "  <br>"
      );
    }
  });

  $('#filter').click(function(){

  });

})
