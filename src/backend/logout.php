<?php
session_start();
session_destroy();

$allowed_origins = [
    "http://localhost:5173",
    "https://edu-venture.hu"
];

// Ellenőrizzük az aktuális kérés origin-jét
if (isset($_SERVER['HTTP_ORIGIN']) && in_array($_SERVER['HTTP_ORIGIN'], $allowed_origins)) {
    header("Access-Control-Allow-Origin: " . $_SERVER['HTTP_ORIGIN']);
    header("Access-Control-Allow-Credentials: true");
    header("Access-Control-Allow-Methods: POST, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type, Authorization");
}

echo json_encode(["success" => "Logged out"]);
?>
