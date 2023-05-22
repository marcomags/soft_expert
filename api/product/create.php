<?php 
require_once("../class/Config.php");

//Check if request is POST
if($_SERVER['REQUEST_METHOD'] != "POST") die(json_encode(['status' => 'error', 'message' => "Request not allowed."]));

//Validation
if(empty($_POST['name'])){
    die(json_encode(['status' => 'error', 'message' => "Name is required."]));
}else if(empty($_POST['price'])){
    die(json_encode(['status' => 'error', 'message' => "Price is required."]));
}else if(!is_float(floatval($_POST['price']))){
    die(json_encode(['status' => 'error', 'message' => "Price is currency format."]));
}else if(empty($_POST['category_id'])){
    die(json_encode(['status' => 'error', 'message' => "Category is required."]));
}else if(!is_numeric($_POST['category_id'])){
    die(json_encode(['status' => 'error', 'message' => "Category must be a numeric format."]));
}

//Call the method to create product
(new Product)->create($_POST);
?>