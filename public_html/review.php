<?php
include 'connect.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
  $job_ID = $_SESSION['selected_job_ID'];
  $review_flow = $_POST['review_flow'];
  $review_ID = 0;



  $sql = "INSERT INTO reviews VALUES (0, {$_POST['performance']}, {$_POST['satisfaction']}, {$_POST['manner']}, {$review_flow}, {$job_ID})";
  $result = $conn->query($sql);
  $review_ID = $conn->insert_id;
  echo $review_ID > 0 ? "true" : "false";
}

if ($_SERVER["REQUEST_METHOD"] == "GET") {
  $job_ID = $_SESSION['selected_job_ID'];
  $review_flow = $_GET['review_flow'];
  $review_ID = 0;
  $sql = "SELECT * FROM reviews WHERE job_ID = {$job_ID}";
  $result = $conn->query($sql);
  $numberOfRows=mysqli_num_rows($result);
  $isReviewed = false;
  for ($i=0;$i<$numberOfRows;$i++){
      $row = mysqli_fetch_assoc($result);
      if ($row['review_flow'] == $review_flow) {
        $isReviewed = true;
      }
  }
  echo $isReviewed ? "true" : "false";
}
?>
