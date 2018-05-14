<?php

include 'connect.php';

if ($_SERVER["REQUEST_METHOD"] == "GET") {

  if ($_GET['type'] == 6) {
    $sql = "SELECT * FROM user JOIN job ON user.user_ID = job.p_user_ID NATURAL JOIN reviews  WHERE user_ID = {$_GET['p_user_ID']}";
    $elements = array();
    $result = $conn->query($sql);
    $numberOfRows=mysqli_num_rows($result);
    for ($i=0;$i<$numberOfRows;$i++){
        $elements[]=mysqli_fetch_assoc($result);
    }
    echo json_encode($elements);
    exit(0);
  }

  if ($_GET['type'] == 7) {
    $sql = "SELECT * FROM user NATURAL JOIN offerings AS with_offerings NATURAL JOIN time_period AS with_time NATURAL JOIN address"
    ." AS with_address NATURAL JOIN cities NATURAL JOIN streets NATURAL JOIN zip_codes"
    ." NATURAL JOIN education_info AS with_education NATURAL JOIN university NATURAL JOIN major WHERE job_ID = {$_SESSION['selected_job_ID']}";
    $elements = array();
    $result = $conn->query($sql);
    $numberOfRows=mysqli_num_rows($result);
    for ($i=0;$i<$numberOfRows;$i++){
        $elements[]=mysqli_fetch_assoc($result);
    }
    echo json_encode($elements);
    exit(0);
  }

  if ($_GET['type'] == 0) {
    $sql = "SELECT * FROM job NATURAL JOIN time_period NATURAL JOIN cost_range NATURAL JOIN address NATURAL JOIN cities NATURAL JOIN streets NATURAL JOIN zip_codes"
    ." NATURAL JOIN field NATURAL JOIN industry WHERE job_ID = {$_SESSION['selected_job_ID']}";
  }
  if ($_GET['type'] == 1) {
    $sql = "SELECT * FROM cities";
  }
  if ($_GET['type'] == 2) {
    $sql = "SELECT * FROM streets";
  }
  if ($_GET['type'] == 3) {
    $sql = "SELECT * FROM industry";
  }
  if ($_GET['type'] == 4) {
    $sql = "SELECT * FROM field";
  }
  if ($_GET['type'] == 5) {
    $sql = "SELECT * FROM cost_range";
  }
  $elements = array();
  $result = $conn->query($sql);
  $numberOfRows=mysqli_num_rows($result);
  for ($i=0;$i<$numberOfRows;$i++){
      $elements[]=mysqli_fetch_assoc($result);
  }
  echo json_encode($elements);
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
  if ($_POST['type'] == 1) {
    $address_ID = 0;
    $zip_code_ID = 0;
    $time_period_ID = 0;
    $job_ID = $_SESSION['selected_job_ID'];
    $user_ID = $_SESSION['user_ID'];
    $sql = "INSERT INTO zip_codes VALUES (0, {$_POST['address']['zip_code']})";
    $result = $conn->query($sql);
    $zip_code_ID = $conn->insert_id;

    $sql = "INSERT INTO address VALUES (0, 0, {$_POST['address']['street']}, {$_POST['address']['city']}, {$zip_code_ID})";
    $result = $conn->query($sql);
    $address_ID = $conn->insert_id;

    $start_date = date('Y-m-d', strtotime($_POST['start_date']));
    $end_date = date('Y-m-d', strtotime($start_date." + {$_POST['duration']} days"));
    $sql = "INSERT INTO time_period VALUES (0, '{$start_date}', {$_POST['duration']})";
    $result = $conn->query($sql);
    $time_period_ID = $conn->insert_id;

    $current_time = date('Y-m-d H:i:s');
    $sql = "UPDATE job SET job_title = '{$_POST['title']}', job_description = '{$_POST['description']}', updated_at = '{$current_time}', field_ID = {$_POST['field']}, cost_range_ID = {$_POST['minimum_cost']},".
    " address_ID = {$address_ID}, time_period_ID = {$time_period_ID} WHERE job_ID = {$job_ID}";
    $result = $conn->query($sql);
    $job_ID = $conn->insert_id;
    echo "updated";
  }

  if ($_POST['type'] == 2) {
    $job_ID = $_SESSION['selected_job_ID'];
    $sql = "UPDATE job SET p_user_ID = '{$_POST['p_user_ID']}' WHERE job_ID = {$job_ID}";
    $result = $conn->query($sql);

    $sql = "DELETE FROM offerings WHERE job_ID = {$_SESSION['selected_job_ID']} AND offering_ID <> {$_POST['offering_ID']}";
    $result = $conn->query($sql);

    $sql = "UPDATE state SET job_status_ID = 3 WHERE job_ID = {$job_ID}";
    $result = $conn->query($sql);

    echo "updated";
  }
}
?>
