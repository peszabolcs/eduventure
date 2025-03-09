<?php
session_start();

// Engedélyezett origin-ek listája
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

// Ha a böngésző `OPTIONS` preflight kérést küld, azonnal válaszoljunk
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

if (isset($_SESSION["user_id"])) {
    echo json_encode([
        "logged_in" => true,
        "user" => [
            "id" => $_SESSION["user_id"],
            "name" => $_SESSION["user_name"],
            "email" => $_SESSION["user_email"]
        ]
    ]);
} else {
    echo json_encode(["logged_in" => false]);
}
?>
