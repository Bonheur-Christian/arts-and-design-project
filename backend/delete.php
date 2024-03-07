<?php
session_start();
$server = "localhost"; 
$username = "root";
$password = "Bruno@1980";
$database = "application";

$connection = new mysqli($server,$username, $password, $database);
if($connection->connect_error){
    die("connection failed".$connection->error);
}


parse_str(file_get_contents("php://input"), $_DELETE);


$method = $_SERVER["REQUEST_METHOD"];


if ($method == "DELETE"){
    $id = $_DELETE["id"];

    header('Content-Type: application/json');

    $query ="DELETE FROM user WHERE user_id=$id";
    $result = mysqli_query($connection, $query);

    if($result){
        echo json_encode("success");
    }else{
        echo json_encode("error");  
    }


    mysqli_close($connection);
}