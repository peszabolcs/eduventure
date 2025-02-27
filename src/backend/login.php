<?php
require 'vendor/autoload.php';
error_reporting(E_ALL);
ini_set('display_errors', 1);


$dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
$dotenv->load();

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

session_start();

$host = $_ENV['DB_HOST'];
$dbname = $_ENV['DB_NAME'];
$username = $_ENV['DB_USER'];
$password = $_ENV['DB_PASS'];

$conn = new mysqli($host, $username, $password, $dbname);

if ($conn->connect_error) {
    die(json_encode(["error" => "Database connection failed"]));
}


$data = json_decode(file_get_contents("php://input"), true);

$email = $data["email"];
$password = $data["password"];

$query = $conn->prepare("SELECT id, username, password FROM users WHERE email = ?");
$query->bind_param("s", $email);
$query->execute();
$result = $query->get_result();

if ($result->num_rows > 0) {
//     echo("van ilyen email");
    $row = $result->fetch_assoc();
    if (password_verify($password, $row["password"])) {
        //session beállítása
        $_SESSION["email"] = $email;
        $_SESSION["user_name"] = $row["username"];
        $_SESSION["id"] = $row["id"];
//         echo("Sikeres bejelentkezés");
        echo json_encode([
        "success" => "Sikeres bejelentkezés",
        "user" => [
            "email" => $email,
            "username" => $row["username"]
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