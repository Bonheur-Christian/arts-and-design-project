<?php
session_start();
$server = "localhost"; 
$username = "root";
$password = "";
$database = "application";

$connection = new mysqli($server,$username, $password, $database);
if($connection->connect_error){
    die("connection failed".$connection->error);
}

header('Content-Type: application/json');

// $name = $_GET['name'];
// $email = $_GET['email'];
// $password = $_GET['password'];

 $userId = $_SESSION['user_id'];

$query ="SELECT * FROM user WHERE user_id = $userId";
$result = mysqli_query($connection, $query);

// echo json_encode($result);
if($result -> num_rows >0){
    while($row = $result->fetch_assoc()){
        $user= $row;
    }
  echo json_encode($user);
}else{
    echo json_encode("failed");
}

mysqli_close($connection);