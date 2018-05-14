var userInfo;
var offers;
var postedJobs;

var offerHTML = "<div class=\"row col-lg-12\">" +
  "<label>Offers</label>" +
"</div>";

var postedJobsHTML = "<div class=\"row col-lg-12\">" +
  "<label>Posted Jobs</label>" +
"</div>";

var signOut = function(){
  var ajaxRequest = $.ajax({
      url: "profile.php",
      type: "GET",
      data: {type: 0}
  });

  ajaxRequest.done(function (response, textStatus, jqXHR){
        if (response == 'logout') {
          document.location.href = "/public_html/";
        }
  });
}

var reviewOfferListener = function(index){
    console.log(index);
    sessionStorage.setItem('review_flow', 0);
    $.ajax({url: "login.php", type: "GET", data: {type: 2, selected_job_ID: offers[index].job_ID}})
    .done(function (response, textStatus, jqXHR){
          if (response == 'true') {
            document.location.href = "/public_html/review.html";
          }else{
            console.log("You need to be logged in to see details!");
          }
    });
  }

var reviewJobListener = function(index){
    console.log(index);
    sessionStorage.setItem('review_flow', 1);
    $.ajax({url: "login.php", type: "GET", data: {type: 2, selected_job_ID: postedJobs[index].job_ID}})
    .done(function (response, textStatus, jqXHR){
          if (response == 'true') {
            document.location.href = "/public_html/review.html";
          }else{
            console.log("You need to be logged in to see details!");
          }
    });
}

var quitListener = function(index){
  // console.log(index);
  $.ajax({ url: "profile.php", type: "POST", data: {type: 1, offering_ID: offers[index].offering_ID, time_period_ID: offers[index].time_period_ID}})
  .done(function (response, textStatus, jqXHR){
    // console.log(response);
    document.location.reload();
  });
}

var updateListener = function(index){
    sessionStorage.setItem('purpose', 3);
    $.ajax({ url: "profile.php", type: "POST", data: {type: 2, job_ID: postedJobs[index].job_ID}})
    .done(function (response, textStatus, jqXHR){
      // console.log(response);
      if (response == 'true') {
        document.location.href = "/public_html/show_offers.html";
      }else {
        console.log("there is a mistake with that!");
      }
    });
}

var doneListener = function(index){
    // console.log(index);
    $.ajax({ url: "profile.php", type: "POST", data: {type: 4, job_ID: postedJobs[index].job_ID}})
    .done(function (response, textStatus, jqXHR){
      console.log(response);
      if (response == 'true') {
        document.location.reload();
      }else {
        console.log("there is a mistake with that!");
      }
    });
}

var withdrawJobListener = function(index){
    // console.log(index);
    $.ajax({ url: "profile.php", type: "POST", data: {type: 3, job_ID: postedJobs[index].job_ID}})
    .done(function (response, textStatus, jqXHR){
      console.log(response);
      if (response == 'true') {
        document.location.reload();
      }else {
        console.log("there is a mistake with that!");
      }
    });
}

var detailsOfferListener = function(index){
  $.ajax({ url: "profile.php", type: "POST", data: {type: 5, offering_ID: offers[index].offering_ID}})
  .done(function (response, textStatus, jqXHR){
    console.log(response);
    if (response == 'true') {
      document.location.href = "/public_html/offer.html";
    }else {
      console.log("there is a mistake with that!");
    }
  });
}

var detailsJobListener = function(index){
    sessionStorage.setItem('purpose', 2);
    $.ajax({ url: "profile.php", type: "POST", data: {type: 2, job_ID: postedJobs[index].job_ID}})
    .done(function (response, textStatus, jqXHR){
      // console.log(response);
      if (response == 'true') {
        document.location.href = "/public_html/show_offers.html";
      }else {
        console.log("there is a mistake with that!");
      }
    });
}

var showOffersListener = function(index){
    sessionStorage.setItem('purpose', 1);
    $.ajax({ url: "profile.php", type: "POST", data: {type: 2, job_ID: postedJobs[index].job_ID}})
    .done(function (response, textStatus, jqXHR){
      // console.log(response);
      if (response == 'true') {
        document.location.href = "/public_html/show_offers.html";
      }else {
        console.log("there is a mistake with that!");
      }
    });
}

$(function(){
  $("#header").load("nav-bar.html", function() {
    $.getScript("login.js");
});

  var ajaxRequestUserInfo;
  var ajaxRequestOffers;
  var ajaxRequestPostedJob;

  ajaxRequestUserInfo = $.ajax({url: "profile.php", type: "GET", data: { type: 1 } });
  ajaxRequestUserInfo.done(function (response, textStatus, jqXHR){
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


    ajaxRequestOffers = $.ajax({url: "profile.php", type: "GET", data: { type: 2 } });
    ajaxRequestOffers.done(function (response, textStatus, jqXHR){
      offers = JSON.parse(response);
      // console.dir(offers);
      $('#offers').children().remove();
      $('#offers').append(offerHTML);

      for (var i = 0; i < offers.length; i++) {

        var appendString = "<div class=\"row col-lg-12 border\">" +
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
          "<div class=\"col col-lg-1\">";
          switch (offers[i].job_status_ID) {
            case "2":
              appendString += "  </div>" +
            "<div class=\"col col-lg-1\">" +
            "  <button onclick=\"quitListener(" + i + ")\" class=\"btn btn-danger btn-sm\" type=\"button\" name=\"button\">Quit</button>" +
            "<br> "+
            "  <button onclick=\"detailsOfferListener(" + i + ")\" class=\"btn btn-primary btn-sm\" type=\"button\" name=\"button\">Details</button>" +
          "  </div>" +
        "  </div>" +
        "  <br>";
              break;
            case "3":
              if (offers[i].p_user_ID == userInfo.user_ID) {
                appendString += "  </div>" +
              "<div class=\"col col-lg-1\">" +
              "  <button onclick=\"quitListener(" + i + ")\" class=\"btn btn-danger btn-sm\" type=\"button\" name=\"button\">Quit</button>" +
              "<br> "+
              "  <button onclick=\"detailsOfferListener(" + i + ")\" class=\"btn btn-primary btn-sm\" type=\"button\" name=\"button\">Details</button>" +
            "  </div>" +
          "  </div>" +
          "  <br>";
        }else{
          appendString += "  </div>" +
        "<div class=\"col col-lg-1\">" +
      "  </div>" +
    "  </div>" +
    "  <br>";
        }

              break;
            case "4":
            if (offers[i].p_user_ID == userInfo.user_ID) {
              appendString += "<button onclick=\"reviewOfferListener(" + i + ")\" class=\"btn btn-primary btn-sm\" type=\"button\" name=\"button\">Review</button>" +
              "<br> "+
              "  <button onclick=\"detailsOfferListener(" + i + ")\" class=\"btn btn-primary btn-sm\" type=\"button\" name=\"button\">Details</button>" +
          "  </div>" +
            "<div class=\"col col-lg-1\">" +
          "  </div>" +
        "  </div>" +
        "  <br>";
      }else{
        appendString += "  </div>" +
      "<div class=\"col col-lg-1\">" +
    "  </div>" +
  "  </div>" +
  "  <br>";
      }
              break;
            default:

          }

        $('#offers').append(appendString);

      }

    });


  });

  ajaxRequestPostedJob = $.ajax({url: "profile.php", type: "GET", data: { type: 3 } });
  ajaxRequestPostedJob.done(function (response, textStatus, jqXHR){
    postedJobs = JSON.parse(response);
    // console.dir(postedJobs);
    $('#posted_jobs').children().remove();
    $('#posted_jobs').append(postedJobsHTML);

    for (var i = 0; i < postedJobs.length; i++) {
      var appendString = "<div class=\"row col-lg-12 border\">" +
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
        "<div class=\"col col-lg-1\">";

        switch (postedJobs[i].job_status_ID) {
          case "1":
            appendString += "<button onclick=\"updateListener(" + i + ")\" class=\"btn btn-success btn-sm\" type=\"button\" name=\"button\">Update</button>" +
            " <br>"+
           "<button onclick=\"detailsJobListener(" + i + ")\" class=\"btn btn-primary btn-sm\" type=\"button\" name=\"button\">Details</button>" +
        "  </div>" +
          "<div class=\"col col-lg-1\">" +
          "  <button onclick=\"withdrawJobListener(" + i + ")\" class=\"btn btn-danger btn-sm\" type=\"button\" name=\"button\">Withdraw</button>" +
        "  </div>" +
      "  </div>" +
      "  <br>";
            break;
          case "2":
            appendString += "<button onclick=\"updateListener(" + i + ")\" class=\"btn btn-success btn-sm\" type=\"button\" name=\"button\">Update</button>" +
            " <br>"+
            "<button onclick=\"showOffersListener(" + i + ")\" class=\"btn btn-primary btn-sm\" type=\"button\" name=\"button\">Offers</button>" +
        "  </div>" +
          "<div class=\"col col-lg-1\">" +
          "  <button onclick=\"withdrawJobListener(" + i + ")\" class=\"btn btn-danger btn-sm\" type=\"button\" name=\"button\">Withdraw</button>" +
        "  </div>" +
      "  </div>" +
      "  <br>";
            break;
          case "3":
            appendString += " <br>"+
            "<button onclick=\"detailsJobListener(" + i + ")\" class=\"btn btn-primary btn-sm\" type=\"button\" name=\"button\">Details</button>" +
            "  </div>" +
          "<div class=\"col col-lg-1\">" +
          "  <button onclick=\"doneListener(" + i + ")\" class=\"btn btn-warning btn-sm\" type=\"button\" name=\"button\">Done</button>" +
        "  </div>" +
      "  </div>" +
      "  <br>";
            break;
          case "4":
            appendString += "<button onclick=\"reviewJobListener(" + i + ")\" class=\"btn btn-primary btn-sm\" type=\"button\" name=\"button\">Review</button>" +
            " <br>"+
           "<button onclick=\"detailsJobListener(" + i + ")\" class=\"btn btn-primary btn-sm\" type=\"button\" name=\"button\">Details</button>" +
        "  </div>" +
      "  </div>" +
      "  <br>";
            break;
          default:
            appendString = "";
        }
      $('#posted_jobs').append(appendString);
    }
  });

})
