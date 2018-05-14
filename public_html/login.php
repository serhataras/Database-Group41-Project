<?php

$email = " ";
$password = " ";
$uemail = " ";
$upassword = " ";
$uusername = " ";
$uuser_ID = " ";

include 'connect.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
  $email = test_input($_POST['email']);
  $password = test_input($_POST['password']);

  $sql = "SELECT email, username, user_ID FROM user WHERE password = '$password'";
  $result = $conn->query($sql);
  if($result){
      while(($row = $result->fetch_assoc())!= null) {
          $uemail  = $row['email'];
          $uusername  = $row['username'];
      }
    }
  $sql = "SELECT password, user_ID FROM user WHERE username = '$email'";
  $result = $conn->query($sql);

  if($result){
        // while($row = $result->fetch_assoc() != null){
        $row = $result->fetch_row();
          $upassword = $row[0];//TODO: Problem is here this returns empty
          $uuser_ID = $row[1];
          // echo var_dump($result);
        // }
    }

  if(strcasecmp($password, $upassword) == 0){
      //header("Location:my_accounts.php");
      $_SESSION['email'] = $uemail;
      // $_SESSION['password'] = $upassword;
      $_SESSION['user_ID'] = $uuser_ID;
      echo "done";
    exit;
  }else{
    echo "Wrong username or password. Please try again";
  }
}

function test_input($data) {
  $data = trim($data);
  $data = stripslashes($data);
  $data = htmlspecialchars($data);
  return $data;
}

if ($_SERVER["REQUEST_METHOD"] == "GET") {
  if ($_GET['type'] == 1) {
    echo isset($_SESSION['user_ID']) ? 'true' : 'false';
  }
  if ($_GET['type'] == 2) {
    if (isset($_SESSION['user_ID'])) {
      $_SESSION['selected_job_ID'] = $_GET['selected_job_ID'];
    }
    echo isset($_SESSION['user_ID']) ? 'true' : 'false';
  }
}

?>
