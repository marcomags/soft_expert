<?php 
require_once("../class/Config.php");

//Check if request is POST
if($_SERVER['REQUEST_METHOD'] != "POST") die(json_encode(['status' => 'error', 'message' => "Request not allowed."]));

//Validation
if(empty($_POST['id'])){
    die(json_encode(['status' => 'error', 'message' => "ID is required."]));
}

//Call the method to delete product
echo (new Product)->delete($_POST['id']);
?>