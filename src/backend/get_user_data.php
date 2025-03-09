<?php
require 'vendor/autoload.php';
session_start();

$dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
$dotenv->load();

$allowed_origins = [
    "http://localhost:5173",
    "https://edu-venture.hu"
];

if (isset($_SERVER['HTTP_ORIGIN']) && in_array($_SERVER['HTTP_ORIGIN'], $allowed_origins)) {
    header("Access-Control-Allow-Origin: " . $_SERVER['HTTP_ORIGIN']);
    header("Access-Control-Allow-Credentials: true");
    header("Content-Type: application/json");
}

if (!isset($_SESSION['id'])) {
    echo json_encode(["success" => false, "error" => "Not authenticated"]);
    exit();
}

try {
    $pdo = new PDO(
        "mysql:host=" . $_ENV['DB_HOST'] . ";dbname=" . $_ENV['DB_NAME'] . ";charset=utf8mb4",
        $_ENV['DB_USER'],
        $_ENV['DB_PASS']
    );

    $stmt = $pdo->prepare("SELECT username, fullname, email, avatar, cover, created_at, role FROM users WHERE id = ?");
    $stmt->execute([$_SESSION['id']]);
    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($user) {
        echo json_encode([
            "success" => true,
            "user" => $user
        ]);
    } else {
        echo json_encode(["success" => false, "error" => "User not found"]);
    }
} catch (PDOException $e) {
    echo json_encode(["success" => false, "error" => "Database error"]);
}
