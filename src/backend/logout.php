<?php
session_start();
session_destroy();

// header("Access-Control-Allow-Origin: https://www.edu-venture.hu");
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

echo json_encode(["success" => "Logged out"]);
?>
