<?php 
require_once("../class/Config.php");

//Check if request is GET
if($_SERVER['REQUEST_METHOD'] != "GET") die(json_encode(['status' => 'error', 'message' => "Request not allowed."]));

$data = (new Cart)->getByProductId($_GET['product_id'], $_GET['session_id']);
echo $data;
?>