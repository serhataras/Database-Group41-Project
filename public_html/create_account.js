var cities;
var streets;
var educationLevels;
var universities;
var majors;
var fields;

$(function(){

  $("#header").load("nav-bar.html", function() {
    $.getScript("login.js");
});

  var ajaxRequestCity;
  var ajaxRequestStreet;
  var ajaxRequestEdLevel;
  var ajaxRequestUniversity;
  var ajaxRequestMajor;
  var ajaxRequestField;
  var ajaxRequestPost;

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

  ajaxRequestEdLevel = $.ajax({url: "create_account.php", type: "GET", data: { type: 3 } });
  ajaxRequestEdLevel.done(function (response, textStatus, jqXHR){
    educationLevels = JSON.parse(response);
    for (var i = 0; i < educationLevels.length; i++) {
      $('#education_level').append($('<option>', {value:i, text: educationLevels[i].education_level_name}));
    }
  });

  ajaxRequestUniversity = $.ajax({url: "create_account.php", type: "GET", data: { type: 4 } });
  ajaxRequestUniversity.done(function (response, textStatus, jqXHR){
    universities = JSON.parse(response);
    for (var i = 0; i < universities.length; i++) {
      $('#university').append($('<option>', {value:i, text: universities[i].university_name}));
    }
  });

  ajaxRequestMajor = $.ajax({url: "create_account.php", type: "GET", data: { type: 5 } });
  ajaxRequestMajor.done(function (response, textStatus, jqXHR){
    majors = JSON.parse(response);
    for (var i = 0; i < majors.length; i++) {
      $('#major').append($('<option>', {value:i, text: majors[i].major_name}));
    }
  });

  ajaxRequestField = $.ajax({url: "create_account.php", type: "GET", data: { type: 6 } });
  ajaxRequestField.done(function (response, textStatus, jqXHR){
    fields = JSON.parse(response);
    for (var i = 0; i < fields.length; i++) {
      $('#field').append($('<option>', {value:i, text: fields[i].field_name}));
    }
  });
  $('#create_account_button').click(function(){

    var accountType = 0;
    if ($('#customer').is(":checked") && $('#professional').is(":checked")) {
      accountType = 3;
    }else if ($('#professional').is(":checked")) {
      accountType = 2;
    }else{ accountType = 1; }
    var gender = "";
    if ($("input[name='gender']:checked") != undefined || $("input[name='gender']:checked") != null) {
      gender = $("input[name='gender']:checked").val();
    }

    var data = {
      account_type: accountType.toString(),
      name: $('#name').val(),
      surname: $('#surname').val(),
      username: $('#username').val(),
      email: $('#emailCreate').val(),
      password: $('#passwordCreate').val(),
      gender: gender,
      birthdate: $('#birthdate').val(),
      address: {
        city: cities[$('#city').val()].city_ID,
        street: streets[$('#street').val()].street_ID,
        zip_code: $('#zip_code').val()
      },
      education_info: {
        education_level: educationLevels[$('#education_level').val()].education_level_ID,
        university: universities[$('#university').val()].university_ID,
        major: majors[$('#major').val()].major_ID,
        entrance_year: $('#entrance_year').val(),
        graduation_year: $('#graduation_year').val()
      },
      field: fields[$('#field').val()].field_ID
    }

    ajaxRequestPost = $.ajax({url: "create_account.php", type: "POST", data: data });
    ajaxRequestPost.done(function (response, textStatus, jqXHR){
      // console.log(response);
      if (response == 'true') {
        document.location.href = "/public_html/";
      }
    });
  });

})
