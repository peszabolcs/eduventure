<?php
require 'vendor/autoload.php';
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Session beállítások
ini_set('session.cookie_secure', 1);
ini_set('session.cookie_httponly', 1);
ini_set('session.cookie_samesite', 'None');
session_start();

//debug
// echo "<pre>";
// print_r($_SESSION);
// echo "</pre>";
//
// error_log("SESSION ID: " . session_id());
// error_log("SESSION TOKEN: " . ($_SESSION["token"] ?? "Nincs session token"));
// error_log("RECEIVED TOKEN: " . ($token ?? "Nincs received token"));
// error_log("SESSION USER ID: " . ($_SESSION["id"] ?? "Nincs session ID"));


header('Content-Type: application/json');

// CORS headers
$allowed_origins = [
    "http://localhost:5173",
    "https://edu-venture.hu"
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

// Debug log minden header
error_log("All headers: " . print_r(getallheaders(), true));
error_log("REQUEST_METHOD: " . $_SERVER['REQUEST_METHOD']);
error_log("HTTP_AUTHORIZATION: " . (isset($_SERVER['HTTP_AUTHORIZATION']) ? $_SERVER['HTTP_AUTHORIZATION'] : 'Not set'));

// Token ellenőrzése
$headers = getallheaders();
$auth_header = isset($headers['Authorization']) ? $headers['Authorization'] : (isset($_SERVER['HTTP_AUTHORIZATION']) ? $_SERVER['HTTP_AUTHORIZATION'] : '');

error_log("Auth header: " . $auth_header);

if (preg_match('/Bearer\s(\S+)/', $auth_header, $matches)) {
    $token = $matches[1];

    error_log("Extracted token: " . $token);
    error_log("Session token: " . ($_SESSION['token'] ?? 'No session token'));

    if (isset($_SESSION["token"]) && $token === $_SESSION["token"] && isset($_SESSION["id"])) {
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

http_response_code(401);
echo json_encode([
    'error' => 'Unauthorized',
    'debug' => [
        'session_exists' => isset($_SESSION),
        'token_exists' => isset($_SESSION["token"]),
        'session_id' => session_id(),
        'received_token' => $token ?? null,
        'stored_token' => $_SESSION["token"] ?? null,
        'auth_header' => $auth_header,
        'session_data' => $_SESSION
    ]
]);
