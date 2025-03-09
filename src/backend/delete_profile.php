<?php
// delete_profile.php
require 'vendor/autoload.php';
error_reporting(E_ALL);
ini_set('display_errors', 1);

// .env betöltése
$dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
$dotenv->load();

// Engedélyezett origin-ek listája
$allowed_origins = [
    "http://localhost:5173",
    "https://edu-venture.hu"
];

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

try {
    $pdo = new PDO(
        "mysql:host=" . $_ENV['DB_HOST'] . ";dbname=" . $_ENV['DB_NAME'] . ";charset=utf8mb4",
        $_ENV['DB_USER'],
        $_ENV['DB_PASS'],
        [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]
    );
} catch (PDOException $e) {
    echo json_encode(["error" => "Database connection failed"]);
    exit();
}

session_start();

if (!isset($_SESSION['id'])) {
    echo json_encode(["error" => "User not authenticated"]);
    exit();
}

$userid = $_SESSION['id'];

$stmt = $pdo->prepare("DELETE FROM users WHERE id = ?");
$stmt->execute([$userid]);

if ($stmt->rowCount() > 0) {
    session_destroy();
    echo json_encode(["success" => "Profile deleted"]);
} else {
    echo json_encode(["error" => "Profile not found"]);
}