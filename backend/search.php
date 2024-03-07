<?php
$server = "localhost"; 
$username = "root";
$password = "Bruno@1980";
$database = "application";
$port = 3306;

$connection = new mysqli($server,$username, $password, $database , $port);
if($connection->connect_error){
    die("connection failed".$connection->error);
}

header('Content-Type: application/json');

$seach_param = $_GET['search_param'];
$query ="SELECT * FROM user WHERE names LIKE '%$seach_param%' OR email LIKE '%$seach_param%'";
$result = mysqli_query($connection, $query);

$users = array();

while($row = $result->fetch_assoc()){
      $users[]= $row;
}
  echo json_encode($users);


mysqli_close($connection);