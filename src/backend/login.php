<?php
require 'vendor/autoload.php';
require 'session.php';
error_reporting(E_ALL);
ini_set('display_errors', 1);

// .env betöltése
$dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
$dotenv->load();

// Engedélyezett origin-ek listája
$allowed_origins = [
    "http://localhost:5173",
    "https://edu-venture.hu",
    "https://www.edu-venture.hu"
];

// CORS fejlécek beállítása minden kéréshez
$origin = isset($_SERVER['HTTP_ORIGIN']) ? $_SERVER['HTTP_ORIGIN'] : '';
if (in_array($origin, $allowed_origins)) {
    header("Access-Control-Allow-Origin: $origin");
} else {
    header("Access-Control-Allow-Origin: https://www.edu-venture.hu");
}
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

// Ha a böngésző `OPTIONS` preflight kérést küld, azonnal válaszoljunk
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Válasz JSON formátumban
header("Content-Type: application/json");

// Adatbázis kapcsolat
$host = $_ENV['DB_HOST'];
$dbname = $_ENV['DB_NAME'];
$username = $_ENV['DB_USER'];
$password = $_ENV['DB_PASS'];

$conn = new mysqli($host, $username, $password, $dbname);

if ($conn->connect_error) {
    echo json_encode(["success" => false, "error" => "Database connection failed"]);
    exit();
}

// Bejövő adatok olvasása
$data = json_decode(file_get_contents("php://input"), true);

if (!isset($data["email"]) || !isset($data["password"])) {
    echo json_encode(["success" => false, "error" => "Missing email or password"]);
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
        // Generáljunk egy egyedi session tokent
        $sessionToken = bin2hex(random_bytes(32));

        // Session adatok beállítása
        $_SESSION = array(
            "token" => $sessionToken,
            "id" => $row["id"],
            "email" => $row["email"],
            "user_name" => $row["username"],
            "fullname" => $row["fullname"],
            "role" => $row["role"],
            "created_at" => $row["created_at"],
            "last_activity" => time()
        );

        // Session mentése
        session_write_close();

        echo json_encode([
            "success" => true,
            "message" => "Sikeres bejelentkezés",
            "user" => [
                "id" => $row["id"],
                "fullname" => $row["fullname"],
                "email" => $row["email"],
                "username" => $row["username"],
                "role" => $row["role"],
                "created_at" => $row["created_at"],
                "token" => $sessionToken
            ]
        ]);
    } else {
        echo json_encode(["success" => false, "error" => "Hibás felhasználónév vagy jelszó"]);
    }
} else {
    echo json_encode(["success" => false, "error" => "Email cím nem található"]);
}

$conn->close();
