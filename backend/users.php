<?php
$server = "localhost"; 
$username = "root";
$password = "";
$database = "application";

$connection = new mysqli($server,$username, $password, $database);
if($connection->connect_error){
    die("connection failed".$connection->error);
}

header('Content-Type: application/json');

$query ="SELECT * FROM user";
$result = mysqli_query($connection, $query);

$users = array();

while($row = $result->fetch_assoc()){
      $users[]= $row;
}
  echo json_encode($users);


mysqli_close($connection);