<?php

include 'connect.php';

$c_user_ID = 1;
$p_user_ID = 2;
$time_period_ID = 0;
$job_ID = 3;

if ($_SERVER["REQUEST_METHOD"] == "GET") {
  if ($_GET['type'] == 1) {
    $sql = "SELECT * FROM job NATURAL JOIN time_period WHERE job_ID = {$job_ID}";
    $elements = array();
    $result = $conn->query($sql);
    $numberOfRows=mysqli_num_rows($result);
    for ($i=0;$i<$numberOfRows;$i++){
        $elements[]=mysqli_fetch_assoc($result);
        $c_user_ID = $elements[$i]['c_user_ID'];
        $time_period_ID = $elements[$i]['time_period_ID'];
    }
    echo json_encode($elements);
  }
  if ($_GET['type'] == 2) {
    $sql = "SELECT * FROM user JOIN job ON user.user_ID = job.c_user_ID NATURAL JOIN reviews  WHERE user_ID = {$c_user_ID}";
    $elements = array();
    $result = $conn->query($sql);
    $numberOfRows=mysqli_num_rows($result);
    for ($i=0;$i<$numberOfRows;$i++){
        $elements[]=mysqli_fetch_assoc($result);
    }
    echo json_encode($elements);
  }
  if ($_GET['type'] == 3) {
    $sql = "SELECT * FROM user WHERE user_ID = {$c_user_ID}";
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
  $offering_ID = 0;
  $sql = "INSERT INTO offerings VALUES (0, {$_POST['title']}, {$_POST['offer']}, '$p_user_ID', '$job_ID', '$time_period_ID')";
  $result = $conn->query($sql);
  $offering_ID = $conn->insert_id;
  echo $offering_ID;
}
?>
