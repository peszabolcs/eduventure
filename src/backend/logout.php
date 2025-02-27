<?php
session_start();
session_destroy();

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

echo json_encode(["success" => "Logged out"]);
?>
