<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

require 'vendor/autoload.php';

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
    if (isset($_SERVER['HTTP_ORIGIN']) && in_array($_SERVER['HTTP_ORIGIN'], $allowed_origins)) {
        header("Access-Control-Allow-Origin: " . $_SERVER['HTTP_ORIGIN']);
        header("Access-Control-Allow-Credentials: true");
        header("Access-Control-Allow-Methods: POST, OPTIONS");
        header("Access-Control-Allow-Headers: Content-Type, Authorization");
        http_response_code(200);
        exit();
    }
}

// Adatbázis kapcsolat
$host = $_ENV['DB_HOST'];
$dbname = $_ENV['DB_NAME'];
$username = $_ENV['DB_USER'];
$password = $_ENV['DB_PASS'];

$conn = new mysqli($host, $username, $password, $dbname);

if ($conn->connect_error) {
    die(json_encode(["error" => "Database connection failed"]));
}

// Adatok beolvasása
$data = json_decode(file_get_contents("php://input"), true);

if (!$data) {
    $data = $_POST;
}

// Email cím ellenőrzése
if (!isset($data["email"])) {
    die(json_encode(["error" => "Az email cím megadása kötelező!"]));
}

$email = filter_var($data["email"], FILTER_VALIDATE_EMAIL);
if (!$email) {
    die(json_encode(["error" => "Érvénytelen email cím!"]));
}

// Ellenőrizzük, hogy az email már létezik-e
$check_query = $conn->prepare("SELECT id FROM emails WHERE email = ?");
$check_query->bind_param("s", $email);
$check_query->execute();
$check_query->store_result();

if ($check_query->num_rows > 0) {
    die(json_encode(["error" => "Ez az email cím már fel van iratkozva!"]));
}
$check_query->close();

// Email hozzáadása
$insert_query = $conn->prepare("INSERT INTO emails (email, subscription_date) VALUES (?, NOW())");
$insert_query->bind_param("s", $email);

if ($insert_query->execute()) {
    echo json_encode(["success" => "Sikeres feliratkozás!"]);
} else {
    echo json_encode(["error" => "Sikertelen feliratkozás: " . $insert_query->error]);
}

$insert_query->close();
$conn->close();
