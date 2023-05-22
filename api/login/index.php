<?php 
require_once("../class/Config.php");

//Check if request is POST
if($_SERVER['REQUEST_METHOD'] != "POST") die(json_encode(['status' => 'error', 'message' => "Request not allowed."]));

//Validation
if(empty($_POST['username'])){
    die(json_encode(['status' => 'error', 'message' => "Username is required."]));
}else if(empty($_POST['password'])){
    die(json_encode(['status' => 'error', 'message' => "Password is required."]));
}

//Call the method to check credential
(new Login)->login($_POST);
?>