<?php 
require_once("../class/Config.php");

//Check if request is GET
if($_SERVER['REQUEST_METHOD'] != "GET") die(json_encode(['status' => 'error', 'message' => "Request not allowed."]));

//Call the method to read category
if(isset($_GET['id']) && $_GET['id'] > 0){
    $data = (new Category)->read($_GET['id']);
}
else{
    $data = (new Category)->read();
}

echo $data;
?>