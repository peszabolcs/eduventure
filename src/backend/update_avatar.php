<?php
require 'vendor/autoload.php';
error_reporting(E_ALL);
ini_set('display_errors', 1);

$dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
$dotenv->load();

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
    if(isset($_SERVER['HTTP_ORIGIN']) && in_array($_SERVER['HTTP_ORIGIN'], $allowed_origins)) {
        header("Access-Control-Allow-Origin: " . $_SERVER['HTTP_ORIGIN']);
        header("Access-Control-Allow-Credentials: true");
        header("Access-Control-Allow-Methods: POST, OPTIONS");
        header("Access-Control-Allow-Headers: Content-Type, Authorization");
        http_response_code(200);
        exit();
    }
}

session_start();

if (!isset($_SESSION['id'])) {
    echo json_encode(["error" => "User not authenticated"]);
    exit();
}

$userid = $_SESSION['id'];

// Ellenőrizzük, hogy van-e fájl feltöltve
if (!isset($_FILES['avatar']) || $_FILES['avatar']['error'] !== UPLOAD_ERR_OK) {
    echo json_encode(["error" => "Hiba a fájlfeltöltés során"]);
    exit();
}

// Képfájl ellenőrzése (méret, formátum)
$allowed_types = ['image/jpeg', 'image/png', 'image/gif'];
if (!in_array($_FILES['avatar']['type'], $allowed_types)) {
    echo json_encode(["error" => "Csak JPG, PNG vagy GIF formátum engedélyezett"]);
    exit();
}

// Új fájlnév létrehozása
$extension = pathinfo($_FILES['avatar']['name'], PATHINFO_EXTENSION);
$filename = "avatar_" . $userid . "." . $extension;
$upload_dir = __DIR__ . "/uploads/";
$filepath = $upload_dir . $filename;

// Mappa létrehozása, ha nem létezik
if (!is_dir($upload_dir)) {
    mkdir($upload_dir, 0777, true);
}

// Fájl mentése
if (!move_uploaded_file($_FILES['avatar']['tmp_name'], $filepath)) {
    echo json_encode(["error" => "A fájl mentése sikertelen"]);
    exit();
}

// Adatbázis frissítése az új avatar URL-el
try {
    $pdo = new PDO(
        "mysql:host=" . $_ENV['DB_HOST'] . ";dbname=" . $_ENV['DB_NAME'] . ";charset=utf8mb4",
        $_ENV['DB_USER'],
        $_ENV['DB_PASS'],
        [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]
    );

    $avatar_url = "/backend/uploads/" . $filename; // Relatív URL
    $stmt = $pdo->prepare("UPDATE users SET avatar = ? WHERE id = ?");
    $stmt->execute([$avatar_url, $userid]);

    echo json_encode(["success" => "Avatar updated", "avatar_url" => $avatar_url]);
} catch (PDOException $e) {
    echo json_encode(["error" => "Database update failed"]);
}
?>