<?php
require 'vendor/autoload.php';
require 'session.php';
error_reporting(E_ALL);
ini_set('display_errors', 1);

header('Content-Type: application/json');

// CORS headers
$allowed_origins = [
    "http://localhost:5173",
    "https://edu-venture.hu",
    "https://www.edu-venture.hu"
];

if (isset($_SERVER['HTTP_ORIGIN']) && in_array($_SERVER['HTTP_ORIGIN'], $allowed_origins)) {
    header("Access-Control-Allow-Origin: " . $_SERVER['HTTP_ORIGIN']);
    header("Access-Control-Allow-Credentials: true");
    header("Access-Control-Allow-Methods: GET, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type, Authorization");
    header("Access-Control-Expose-Headers: Authorization");
}

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Token ellenőrzése
$headers = getallheaders();
$auth_header = isset($headers['Authorization']) ? $headers['Authorization'] : (isset($_SERVER['HTTP_AUTHORIZATION']) ? $_SERVER['HTTP_AUTHORIZATION'] : '');

error_log("Auth header: " . $auth_header);
error_log("Session data: " . print_r($_SESSION, true));

if (preg_match('/Bearer\s(\S+)/', $auth_header, $matches)) {
    $token = $matches[1];

    // Session és token ellenőrzése
    if (validateSession() && isset($_SESSION["token"]) && $token === $_SESSION["token"]) {
        echo json_encode([
            'success' => true,
            'user' => [
                'id' => $_SESSION["id"],
                'fullname' => $_SESSION["fullname"],
                'email' => $_SESSION["email"],
                'username' => $_SESSION["user_name"],
                'role' => $_SESSION["role"],
                'created_at' => $_SESSION["created_at"]
            ]
        ]);
        exit;
    }
}

// Ha nincs érvényes session vagy token, töröljük a session-t
session_destroy();

http_response_code(401);
echo json_encode([
    'success' => false,
    'error' => 'Unauthorized'
]);
