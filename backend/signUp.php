<?php
session_start();
$server = "localhost";
$username  = "root";
// $password = "";
$password = "Bruno@1980";
$database = "application";


$connection  = new mysqli($server, $username, $password, $database);
if($connection->connect_error){
    die("connection failed".$connection->error);
}

header('Content-Type: application/json');

$name = $_POST['name'];
$email = $_POST['email'];
$password = $_POST['password'];

$query = "INSERT INTO user (names, email, password)  VALUES ('$name', '$email', '$password')";
$result = mysqli_query($connection, $query);

if($result){
    echo json_encode("successful");
    
}else{
    echo json_encode("failed");
}