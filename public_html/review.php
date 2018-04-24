<?php
include 'connect.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
  $p_user_ID = 1;
  $c_user_ID = 2;
  $job_ID = 3;
  $review_flow = 0;
  $review_ID = 0;

  $sql = "INSERT INTO reviews VALUES (0, {$_POST['performance']}, {$_POST['satisfaction']}, {$_POST['manner']}, {$review_flow}, {$job_ID})";
  $result = $conn->query($sql);
  $review_ID = $conn->insert_id;
  echo $review_ID;
}
?>
