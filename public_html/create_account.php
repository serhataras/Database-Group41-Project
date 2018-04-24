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
    $sql = "SELECT * FROM education_level";
  }
  if ($_GET['type'] == 4) {
    $sql = "SELECT * FROM university";
  }
  if ($_GET['type'] == 5) {
    $sql = "SELECT * FROM major";
  }
  if ($_GET['type'] == 6) {
    $sql = "SELECT * FROM field";
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
  $education_info_ID = 0;
  $zip_code_ID = 0;
  $user_ID = 0;
  $user_email = " ";
  $user_password = " ";
  $sql = "INSERT INTO zip_codes VALUES (0, {$_POST['address']['zip_code']})";
  $result = $conn->query($sql);
  $zip_code_ID = $conn->insert_id;

  $sql = "INSERT INTO address VALUES (0, 0, {$_POST['address']['street']}, {$_POST['address']['city']}, {$zip_code_ID})";
  $result = $conn->query($sql);
  $address_ID = $conn->insert_id;

  $sql = "INSERT INTO education_info VALUES (0, {$_POST['education_info']['entrance_year']},".
  " {$_POST['education_info']['graduation_year']}, {$_POST['education_info']['university']}, {$_POST['education_info']['education_level']}, {$_POST['education_info']['major']})";
  $result = $conn->query($sql);
  $education_info_ID = $conn->insert_id;

  $current_time = date('Y-m-d H:i:s');
  $birthdate = date('Y-m-d', strtotime($_POST['birthdate']));
  $sql = "INSERT INTO user VALUES (0, {$_POST['name']}, {$_POST['surname']}, {$_POST['email']}, {$_POST['username']}, {$_POST['password']},".
  " '$current_time', '$current_time', {$_POST['gender']}, '$birthdate', {$address_ID}, {$_POST['account_type']}, {$education_info_ID})";
  $result = $conn->query($sql);
  $user_ID = $conn->insert_id;
  echo $user_ID;
}
?>
