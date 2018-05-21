<?php
require_once 'connection.php';

if(isset($_GET['sql'])) $sql = $_GET['sql'];

$link = mysqli_connect($host, $user, $password, $database);
if(mysqli_connect_errno()){
 echo "ERROR DB: (".mysqli_errno().") :".mysql_error();
 exit();
}

$data = -1; 
$result = mysqli_query($link,$sql); 

if(mysqli_affected_rows($link) != -1){
    $data =  mysqli_insert_id($link);
}
    
mysqli_close($link);
echo $data; 
?>