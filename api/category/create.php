<?php 
require_once("../class/Config.php");

//Check if request is POST
if($_SERVER['REQUEST_METHOD'] != "POST") die(json_encode(['status' => 'error', 'message' => "Request not allowed."]));

//Validation
if(empty($_POST['name'])){
    die(json_encode(['status' => 'error', 'message' => "Name is required."]));
}else if(empty($_POST['tax'])){
    die(json_encode(['status' => 'error', 'message' => "Tax is required."]));
}else if(!is_float(floatval($_POST['tax']))){
    die(json_encode(['status' => 'error', 'message' => "Tax is currency format."]));
}

//Call the method to create category
(new Category)->create($_POST);
?>