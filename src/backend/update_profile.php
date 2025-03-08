<?php
// update_profile.php
require 'vendor/autoload.php';
error_reporting(E_ALL);
ini_set('display_errors', 1);

// .env betöltése
$dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
$dotenv->load();

// Engedélyezett origin-ek listája
$allowed_origins = [
    "http://localhost:5173",
    "https://www.edu-venture.hu"
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
$data = json_decode(file_get_contents("php://input"), true);

if (!$data) {
    echo json_encode(["error" => "Invalid request"]);
    exit();
}

$update_fields = [];
$params = [];

if (!empty($data['fullname'])) {
    $update_fields[] = "fullname = ?";
    $params[] = $data['fullname'];
}
if (!empty($data['email'])) {
    $update_fields[] = "email = ?";
    $params[] = $data['email'];
    $SESSION['email'] = $data['email'];
}
if (!empty($data['password'])) {
    $hashed_password = password_hash($data['password'], PASSWORD_DEFAULT);
    $update_fields[] = "password = ?";
    $params[] = $hashed_password;
}

if (empty($update_fields)) {
    echo json_encode(["error" => "No data to update"]);
    exit();
}

$params[] = $userid;
$query = "UPDATE users SET " . implode(", ", $update_fields) . " WHERE id = ?";
$stmt = $pdo->prepare($query);
$stmt->execute($params);

if ($stmt->rowCount() > 0) {
    echo json_encode(["success" => "Profile updated"]);
} else {
    echo json_encode(["error" => "No changes made"]);
}
?>