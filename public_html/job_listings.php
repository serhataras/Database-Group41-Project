<?php
include 'connect.php';

if ($_SERVER["REQUEST_METHOD"] == "GET") {
  $sql_where = "WHERE ";
  $sql = "SELECT * FROM job NATURAL JOIN cost_range ";
  $sql_where = $sql_where."cost_range_min > {$_GET['range_min']} AND {$_GET['range_max']} < cost_range_max ";

  if (isset($_GET['fields'])) {
    $array_count = count($_GET['fields']);
    if ($array_count != 0) {
      $sql = $sql."NATURAL JOIN field ";
      for ($i=0; $i < count($_GET['fields']); $i++) {
        $temp_clause = "";
        if ($i == 0) {
          $temp_clause = $temp_clause."AND field_ID = ".$_GET['fields'][$i]." ";
        }else{
          $temp_clause = $temp_clause."OR field_ID = ".$_GET['fields'][$i]." ";
        }
        $sql_where = $sql_where.$temp_clause;
      }
    }
  }

  if ($_GET['city'] != -1 || $_GET['street'] != -1) {
    $sql = $sql."NATURAL JOIN address ";
    if (($_GET['city']) != -1) {
      $sql_where = $sql_where."AND city_ID = ".$_GET['city']." ";
    }
    if (($_GET['street']) != -1) {
      $sql_where = $sql_where."AND street_ID = ".$_GET['street']." ";
    }
  }

  if ($_GET['start_date'] != "" || $_GET['duration'] != "") {
    $sql = $sql."NATURAL JOIN time_period ";
    if (($_GET['start_date']) != "") {
      $start_date = date('Y-m-d', strtotime($_GET['start_date']));
      $sql_where = $sql_where."AND time_period_start = ".$start_date." ";
    }
    if (($_GET['duration']) != "") {
      $sql_where = $sql_where."AND time_period_duration = ".$_GET['duration'];
    }
  }
  $sql = $sql.$sql_where;
  $elements = array();
  $result = $conn->query($sql);
  $numberOfRows=mysqli_num_rows($result);
  for ($i=0;$i<$numberOfRows;$i++){
      $elements[]=mysqli_fetch_assoc($result);
  }
  echo json_encode($elements);

}
?>
