<?php

include 'connect.php';

if ($_SERVER["REQUEST_METHOD"] == "GET") {
  if ($_GET['type'] == 1) {
    $elements = array();
    $sql = "SELECT * FROM job NATURAL JOIN state NATURAL JOIN job_status WHERE (job_status_ID = 1 OR job_status_ID = 2) ORDER BY created_at DESC LIMIT 5";
    $result = $conn->query($sql);
    $numberOfRows=mysqli_num_rows($result);
    for ($i=0;$i<$numberOfRows;$i++){
        $elements[]=mysqli_fetch_assoc($result);
    }
    echo json_encode($elements);
  }
  if ($_GET['type'] == 2) {
    $keyword = $_GET['keyword'];
    $elements = array();
    $sql = "SELECT * FROM job NATURAL JOIN state NATURAL JOIN job_status WHERE (job_status_ID = 1 OR job_status_ID = 2) AND (job_title LIKE '%{$keyword}%' OR job_description LIKE '%{$keyword}%') ORDER BY created_at DESC";
    $result = $conn->query($sql);
    $numberOfRows=mysqli_num_rows($result);
    for ($i=0;$i<$numberOfRows;$i++){
        $elements[]=mysqli_fetch_assoc($result);
    }
    echo json_encode($elements);
  }
}
?>
