
var jobInfo;
var customerInfo;
var timeInfo;

$(function(){
  var ajaxRequestGetJobInfo;
  var ajaxRequestTimeInfo;
  var ajaxRequestGetCustomerInfo;
  var ajaxRequestGetCustomerName;
  var ajaxRequestPost;
  var timePeriodId = 0;

  ajaxRequestGetJobInfo = $.ajax({url: "offer.php", type: "GET", data: { type: 1 } });
  ajaxRequestGetJobInfo.done(function (response, textStatus, jqXHR){
    jobInfo = JSON.parse(response);

    $("#title_label").eq(0).html("Title: " + jobInfo[0].job_title);
    $("#description").eq(0).html("Description: " + jobInfo[0].job_description);
    timePeriodId = jobInfo[0].time_period_ID;
    $("#start_date_label").eq(0).html("Start Date: " + jobInfo[0].time_period_start);
    $("#duration_label").eq(0).html("Duration: " + jobInfo[0].time_period_duration + " days");
  });

  ajaxRequestGetCustomerInfo = $.ajax({url: "offer.php", type: "GET", data: { type: 2 } });
  ajaxRequestGetCustomerInfo.done(function (response, textStatus, jqXHR){
    customerInfo = JSON.parse(response);
    if (customerInfo.length == 0) {
      $("#rating_label").eq(0).html("Avg. Rating: Not Rated");
      ajaxRequestGetCustomerName = $.ajax({url: "offer.php", type: "GET", data: { type: 3 } });
      ajaxRequestGetCustomerName.done(function (response, textStatus, jqXHR){
        var name = JSON.parse(response);
        console.dir(name);
        $("#name_label").eq(0).html("Name: " + name[0].name);
      });
    }else{
      console.dir(customerInfo[0]);
      var sum = 0;
      for (var i = 0; i < customerInfo.length; i++) {
        sum = sum + customerInfo[i].manner + customerInfo[i].satisfaction + customerInfo[i].performance;
      }
      $("#rating_label").eq(0).html("Avg. Rating: " + sum/3*customerInfo.length);
      $("#name_label").eq(0).html("Name: " + customerInfo[0].name);
    }

  });
  $('#make_offer').click(function(){

    var data = {
      offer: $('#offer').val(),
      title: jobInfo[0].job_title
    }

    console.dir(data);

    ajaxRequestPost = $.ajax({url: "offer.php", type: "POST", data: data });
    ajaxRequestPost.done(function (response, textStatus, jqXHR){
      console.log(response);
    });

    ajaxRequestPost.fail(function (jqXHR, textStatus ){
      console.log(jqXHR);
      console.log(textStatus);
    });
  });

})
