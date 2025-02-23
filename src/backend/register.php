<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json");

// Adatbázis kapcsolat
$host = "46825.cp4.rhweb.hu";  // Vagy a szervered címe
$dbname = "rh46825_EduVenture";  // Az adatbázisod neve
$username = "rh46825";   // Az adatbázis felhasználóneve
$password = "";       // Ha van jelszó, azt írd be

$conn = new mysqli($host, $username, $password, $dbname);

if ($conn->connect_error) {
    die(json_encode(["error" => "Database connection failed"]));
}

// JSON adatok olvasása
$data = json_decode(file_get_contents("php://input"), true);

$name = $data["name"];
$email = $data["email"];
$password = password_hash($data["password"], PASSWORD_BCRYPT); // Jelszó hash-elése

// Ellenőrizzük, hogy az email létezik-e
$check_query = $conn->prepare("SELECT id FROM users WHERE email = ?");
$check_query->bind_param("s", $email);
$check_query->execute();
$result = $check_query->get_result();

if ($result->num_rows > 0) {
    echo json_encode(["error" => "Email already exists"]);
} else {
    $stmt = $conn->prepare("INSERT INTO users (name, email, password) VALUES (?, ?, ?)");
    $stmt->bind_param("sss", $name, $email, $password);

    if ($stmt->execute()) {
        echo json_encode(["success" => "User registered successfully"]);
    } else {
        echo json_encode(["error" => "Registration failed"]);
    }
}

$conn->close();
?>
