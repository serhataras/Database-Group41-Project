<?php

include 'connect.php';

if ($_SERVER["REQUEST_METHOD"] == "GET") {
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
  $address_ID = 0;
  $zip_code_ID = 0;
  $time_period_ID = 0;
  $job_ID = 0;
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
  $sql = "INSERT INTO job VALUES (0, '{$_POST['title']}', '{$_POST['description']}', '{$current_time}', '{$current_time}', {$_POST['field']}, {$_POST['minimum_cost']},".
  " {$address_ID}, {$time_period_ID}, null, {$user_ID})";
  $result = $conn->query($sql);
  $job_ID = $conn->insert_id;

  $sql = "INSERT INTO state VALUES (1, {$job_ID})";
  $result = $conn->query($sql);
  echo "created";
}
?>
