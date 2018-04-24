<?php
$pass = "root";
$servername = "127.0.0.1";
$username = "root";
$db = "hi_fi";
session_start();
$conn = new mysqli($servername, $username, $pass, $db);
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>
