<?php
session_start();
$server = "localhost";
$username = "root";
$password = "";
$database = "application";

$connection = new mysqli($server, $username, $password, $database);
if($connection->connect_error){
    die("connection failed".connect_error);
}

header('Content-Type:application/json');

$userId = $_SESSION['user_id'];
echo $userId;

$name =$_POST['name'];
$email =$_POST['email']; 
$password =$_POST['password']; 

$query = "UPDATE user SET names = '$name', email = '$email', password = '$password' WHERE user_id = $userId";
$result = mysqli_query($connection, $query);

if($result){

    echo json_encode("success");
    
}else{
    echo json_encode("error");
}

mysqli_close($connection);