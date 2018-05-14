<?php
$master_pass = "root";
$servername = "127.0.0.1";
$master_username = "root";
$db = "hi_fi";
session_start();
$conn = new mysqli($servername, $master_username, $master_pass, $db);
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>
