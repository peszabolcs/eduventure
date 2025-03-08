<?php
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

// Válasz JSON formátumban
header("Content-Type: application/json");

session_start();

// Adatbázis kapcsolat
$host = $_ENV['DB_HOST'];
$dbname = $_ENV['DB_NAME'];
$username = $_ENV['DB_USER'];
$password = $_ENV['DB_PASS'];

$conn = new mysqli($host, $username, $password, $dbname);

if ($conn->connect_error) {
    echo json_encode(["error" => "Database connection failed"]);
    exit();
}

// Bejövő adatok olvasása
$data = json_decode(file_get_contents("php://input"), true);

if (!isset($data["email"]) || !isset($data["password"])) {
    echo json_encode(["error" => "Missing email or password"]);
    exit();
}

$email = $data["email"];
$password = $data["password"];

// SQL lekérdezés előkészítése
$query = $conn->prepare("SELECT id, fullname, username, email, password, role, created_at FROM users WHERE email = ?");
$query->bind_param("s", $email);
$query->execute();
$result = $query->get_result();

if ($result->num_rows > 0) {
    $row = $result->fetch_assoc();

    if (password_verify($password, $row["password"])) {
        $_SESSION["email"] = $email;
        $_SESSION["user_name"] = $row["username"];
        $_SESSION["id"] = $row["id"];
        $_SESSION["role"] = $row["role"];
        $_SESSION["created_at"] = $row["created_at"];
        $_SESSION["fullname"] = $row["fullname"];

        echo json_encode([
            "success" => "Sikeres bejelentkezés",
            "user" => [
                "id" => $row["id"],
                "fullname" => $row["fullname"],
                "email" => $email,
                "username" => $row["username"],
                "role" => $row["role"],
                "created_at" => $row["created_at"]
            ]
        ]);
    } else {
        echo json_encode(["error" => "Hibás felhasználónév vagy jelszó"]);
    }
} else {
    echo json_encode(["error" => "Email cím nem található"]);
}

$conn->close();
?>
