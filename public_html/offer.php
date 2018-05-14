<?php

include 'connect.php';

$p_user_ID = $_SESSION['user_ID'];
$job_ID = $_SESSION['selected_job_ID'];

if ($_SERVER["REQUEST_METHOD"] == "GET") {
  if ($_GET['type'] == -1) {
    unset($_SESSION['selected_offer_ID']);
    // echo isset($_SESSION['selected_offer_ID']) ? "false" : "true";
  }
  if ($_GET['type'] == 0) {
    if (isset($_SESSION['selected_offer_ID'])) {
      $sql = "SELECT * FROM offerings WHERE offering_ID = {$_SESSION['selected_offer_ID']}";
      $elements = array();
      $result = $conn->query($sql);
      $numberOfRows=mysqli_num_rows($result);
      for ($i=0;$i<$numberOfRows;$i++){
          $elements[]=mysqli_fetch_assoc($result);
      }
    }
    echo isset($_SESSION['selected_offer_ID']) ? json_encode($elements) : "false";
  }
  if ($_GET['type'] == 1) {
    $sql = "SELECT * FROM job NATURAL JOIN time_period WHERE job_ID = {$job_ID}";
    $elements = array();
    $result = $conn->query($sql);
    $numberOfRows=mysqli_num_rows($result);
    for ($i=0;$i<$numberOfRows;$i++){
        $elements[]=mysqli_fetch_assoc($result);
        $_SESSION['c_user_ID'] = $elements[$i]['c_user_ID'];
        $_SESSION['time_period_ID'] = $elements[$i]['time_period_ID'];
    }
    // echo $time_period_ID;
    echo json_encode($elements);
  }
  if ($_GET['type'] == 2) {
    $sql = "SELECT * FROM user JOIN job ON user.user_ID = job.c_user_ID NATURAL JOIN reviews  WHERE user_ID = {$_SESSION['c_user_ID']}";
    $elements = array();
    $result = $conn->query($sql);
    $numberOfRows=mysqli_num_rows($result);
    for ($i=0;$i<$numberOfRows;$i++){
        $elements[]=mysqli_fetch_assoc($result);
    }
    echo json_encode($elements);
  }
  if ($_GET['type'] == 3) {
    $sql = "SELECT * FROM user WHERE user_ID = {$_SESSION['c_user_ID']}";
    $elements = array();
    $result = $conn->query($sql);
    $numberOfRows=mysqli_num_rows($result);
    for ($i=0;$i<$numberOfRows;$i++){
        $elements[]=mysqli_fetch_assoc($result);
    }
    echo json_encode($elements);
  }

}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
  $offering_ID;

  $sql = "UPDATE state SET job_status_ID = 2 WHERE job_ID = {$job_ID}";
  $result = $conn->query($sql);

  $sql = "INSERT INTO offerings VALUES (0, '{$_POST['title']}', {$_POST['offer']}, {$p_user_ID}, {$job_ID}, {$_SESSION['time_period_ID']})";
  $result = $conn->query($sql);
  $offering_ID = $conn->insert_id;
  echo isset($offering_ID) ? "true" : "false";
}
?>
