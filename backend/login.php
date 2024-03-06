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


$name =$_POST['name'];
$email =$_POST['email']; 
$password =$_POST['password']; 

$query = "SELECT * FROM user WHERE names = '$name'";
$result = mysqli_query($connection, $query);

if($result -> num_rows > 0){
    $user = mysqli_fetch_assoc($result);
    $_SESSION['user_id'] = $user["user_id"];
    echo json_encode("success");
    
}else{
    echo json_encode("error");
}

mysqli_close($connection);