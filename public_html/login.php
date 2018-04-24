<?php

$email = " ";
$password = " ";
$uemail = " ";
$upassword = " ";
$uusername = " ";

include 'connect.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
  $email = test_input($_POST['email']);
  $password = test_input($_POST['password']);
}
function test_input($data) {
  $data = trim($data);
  $data = stripslashes($data);
  $data = htmlspecialchars($data);
  return $data;
}

$sql = "SELECT email, username FROM user WHERE password = '$password' ";
$result = $conn->query($sql);
if($result){
    while(($row = $result->fetch_assoc())!= null) {
        $uemail  = $row['email'];
        $uusername  = $row['username'];
    }
  }
$sql = "SELECT password FROM user WHERE username ='$email' OR email = '$email' ";
$result = $conn->query($sql);
if($result){
        while($row = $result->fetch_assoc()){
        $upassword = $row['password'];
      }
  }
$_SESSION['email'] = $uemail;
$_SESSION['password'] = $upassword;
if((strcasecmp($email, $uemail) == 0 || strcasecmp($email, $uusername) == 0) && $password == $upassword){
    //header("Location:my_accounts.php");
  echo "Done";
  exit;
}
else{
  echo "Wrong username or password. Please try again";
}
?>
