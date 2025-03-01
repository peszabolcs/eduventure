<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

require 'vendor/autoload.php';

$dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
$dotenv->load();

// header("Access-Control-Allow-Origin: https://www.edu-venture.hu");
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json");

// Adatbázis kapcsolat
$host = $_ENV['DB_HOST'];
$dbname = $_ENV['DB_NAME'];
$username = $_ENV['DB_USER'];
$password = $_ENV['DB_PASS'];

$conn = new mysqli($host, $username, $password, $dbname);

if ($conn->connect_error) {
    die(json_encode(["error" => "Database connection failed"]));
}

// Adatok beolvasása JSON vagy x-www-form-urlencoded formátumban
$data = json_decode(file_get_contents("php://input"), true);

if (!$data) {
    $data = $_POST;
}

// Ellenőrizzük, hogy minden adat megvan-e
if (!isset($data["username"], $data["email"], $data["password"])) {
    die(json_encode(["error" => "Minden mező kitöltése kötelező!"]));
}

$username = $data["username"];
$email = $data["email"];
$password = password_hash($data["password"], PASSWORD_BCRYPT); // Jelszó hash-elése

// Ellenőrizzük, hogy az email már létezik-e
$check_query = $conn->prepare("SELECT id FROM users WHERE email = ?");
$check_query->bind_param("s", $email);
$check_query->execute();
$check_query->store_result();

if ($check_query->num_rows > 0) {
    die(json_encode(["error" => "Ez az email már létezik!"]));
}
$check_query->close();

// Felhasználó hozzáadása
$insert_query = $conn->prepare("INSERT INTO users (username, email, password) VALUES (?, ?, ?)");
$insert_query->bind_param("sss", $username, $email, $password);

if ($insert_query->execute()) {
    echo json_encode(["success" => "Sikeres regisztráció!"]);
} else {
    echo json_encode(["error" => "Sikertelen regisztráció: " . $insert_query->error]);
}

$insert_query->close();
$conn->close();
