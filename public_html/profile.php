<?php
include 'connect.php';

$user_ID = $_SESSION['user_ID'];

if ($_SERVER["REQUEST_METHOD"] == "GET") {

  if ($_GET['type'] == 0) {
    session_unset();
    session_destroy();
    echo "logout";
    exit(0);
  }

  if ($_GET['type'] == 1) {
    $sql = "SELECT * FROM (SELECT * FROM user WHERE user_ID = {$user_ID}) AS selected_user NATURAL JOIN address"
    ." AS with_address NATURAL JOIN cities NATURAL JOIN streets NATURAL JOIN zip_codes NATURAL JOIN user_types"
    ." NATURAL JOIN education_info AS with_education NATURAL JOIN university NATURAL JOIN major";
  }

  if ($_GET['type'] == 2) {
    $sql = "SELECT * FROM offerings NATURAL JOIN time_period AS crossed JOIN (SELECT job_ID, job_title, job_description, field_ID,"
    ." cost_range_ID, address_ID, p_user_ID, c_user_ID FROM job) AS filtered_job ON offerings.job_ID = filtered_job.job_ID"
    ." JOIN state ON filtered_job.job_ID = state.job_ID NATURAL JOIN job_status WHERE user_ID = {$user_ID}";
  }

  if ($_GET['type'] == 3) {
    $sql = "SELECT * FROM job NATURAL JOIN time_period NATURAL JOIN cost_range"
    ." NATURAL JOIN state NATURAL JOIN job_status WHERE c_user_ID = {$user_ID}";
  }

  $elements = array();
  $result = $conn->query($sql);
  $numberOfRows=mysqli_num_rows($result);
  for ($i=0;$i<$numberOfRows;$i++){
      $elements[]=mysqli_fetch_assoc($result);
  }
  echo json_encode($elements);
}

if ($_SERVER['REQUEST_METHOD'] == "POST") {
  if ($_POST['type'] == 1) {
    $offeringID = $_POST['offering_ID'];
    $timePeriodID = $_POST['time_period_ID'];

    $sql = "DELETE FROM offerings WHERE offering_ID = {$offeringID}";
    $result = $conn->query($sql);

    $sql = "DELETE FROM time_period WHERE time_period_ID = {$timePeriodID}";
    $result = $conn->query($sql);
    echo var_dump($result);
  }
  if ($_POST['type'] == 2) {
    $_SESSION['selected_job_ID'] = $_POST['job_ID'];
    echo isset($_SESSION['selected_job_ID']) ? "true" : "false";
  }

  if ($_POST['type'] == 3) {
    $_SESSION['selected_job_ID'] = $_POST['job_ID'];

    $sql = "DELETE FROM offerings WHERE job_ID = {$_SESSION['selected_job_ID']}";
    $result = $conn->query($sql);

    $sql = "DELETE FROM state WHERE job_ID = {$_SESSION['selected_job_ID']}";
    $result = $conn->query($sql);

    $sql = "DELETE FROM job WHERE job_ID = {$_SESSION['selected_job_ID']}";
    $result = $conn->query($sql);

    echo $result ? "true" : "false";
  }

  if ($_POST['type'] == 4) {
    $_SESSION['selected_job_ID'] = $_POST['job_ID'];

    $sql = "DELETE FROM offerings WHERE job_ID = {$_SESSION['selected_job_ID']}";
    $result = $conn->query($sql);

    $sql = "UPDATE state SET job_status_ID = 4 WHERE job_ID = {$_SESSION['selected_job_ID']}";
    $result = $conn->query($sql);

    echo $result ? "true" : "false";
  }

  if ($_POST['type'] == 5) {
    $_SESSION['selected_offer_ID'] = $_POST['offering_ID'];
    echo isset($_SESSION['selected_job_ID']) ? "true" : "false";
  }
}
?>
