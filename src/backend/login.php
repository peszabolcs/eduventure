<?php
require 'vendor/autoload.php';

$dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
$dotenv->load();

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json");

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

$query = $conn->prepare("SELECT password FROM users WHERE email = ?");
$query->bind_param("s", $email);
$query->execute();
$result = $query->get_result();

if ($result->num_rows > 0) {
    $row = $result->fetch_assoc();
    if (password_verify($password, $row["password"])) {
        echo json_encode(["success" => "Login successful"]);
    } else {
        echo json_encode(["error" => "Hibás felhasználónév vagy jelszó"]);
    }
} else {
    echo json_encode(["error" => "Email cím nem található"]);
}

$conn->close();
?>