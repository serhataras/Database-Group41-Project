<?php
include 'connect.php';

$user_ID = 1;

if ($_SERVER["REQUEST_METHOD"] == "GET") {
  if ($_GET['type'] == 1) {
    $sql = "SELECT * FROM (SELECT * FROM user WHERE user_ID = {$user_ID}) AS selected_user NATURAL JOIN address"
    ." AS with_address NATURAL JOIN cities NATURAL JOIN streets NATURAL JOIN zip_codes NATURAL JOIN user_types"
    ." NATURAL JOIN education_info AS with_education NATURAL JOIN university NATURAL JOIN major";
  }

  if ($_GET['type'] == 2) {
    $sql = "SELECT * FROM offerings NATURAL JOIN job AS crossed JOIN time_period ON crossed.time_period_ID = time_period.time_period_ID"
    ." NATURAL JOIN state NATURAL JOIN job_status WHERE user_ID = {$user_ID}";
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
?>
