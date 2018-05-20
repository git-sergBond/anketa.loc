<?php
require_once 'connection.php';

if(isset($_GET['sql'])) $sql = $_GET['sql'];

$link = mysqli_connect($host, $user, $password, $database);
if(mysqli_connect_errno()){
 echo "ERROR DB: (".mysqli_errno().") :".mysql_error();
 exit();
}

$data = array(); 
$result = mysqli_query($link,$sql); 
while($row = mysqli_fetch_assoc($result)){
    $data[] = $row;
}


echo json_encode($data); // и отдаём как json
mysqli_close($link);
?>