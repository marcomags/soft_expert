<?php 
require_once("../class/Config.php");

//Check if request is POST
if($_SERVER['REQUEST_METHOD'] != "POST") die(json_encode(['status' => 'error', 'message' => "Request not allowed."]));

//Call the method to create product
(new Cart)->delete($_POST['id']);
?>