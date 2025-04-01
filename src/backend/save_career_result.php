<?php
require 'vendor/autoload.php';

// Get the origin from the request
$origin = isset($_SERVER['HTTP_ORIGIN']) ? $_SERVER['HTTP_ORIGIN'] : 'https://www.edu-venture.hu';

// List of allowed origins
$allowedOrigins = [
    'https://edu-venture.hu',
    'https://www.edu-venture.hu'
];

// Check if the origin is allowed
if (!in_array($origin, $allowedOrigins)) {
    $origin = 'https://www.edu-venture.hu'; // Default to www if not allowed
}

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    header("Access-Control-Allow-Origin: $origin");
    header('Access-Control-Allow-Methods: POST, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type');
    header('Access-Control-Allow-Credentials: true');
    header('Access-Control-Max-Age: 86400');    // cache for 1 day
    exit(0);
}

header('Content-Type: application/json');
header("Access-Control-Allow-Origin: $origin");
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Start session with secure settings
ini_set('session.cookie_samesite', 'None');
ini_set('session.cookie_secure', true);
ini_set('session.cookie_domain', '.edu-venture.hu'); // Allow cookies for both www and non-www
session_start();

// .env betöltése
$dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
$dotenv->load();

if (!isset($_SESSION['id'])) {
    echo json_encode(['success' => false, 'error' => 'Nincs bejelentkezett felhasználó']);
    exit;
}

// Get POST data
$data = json_decode(file_get_contents('php://input'), true);

if (!$data || !isset($data['results']) || !isset($data['personality_profile'])) {
    echo json_encode(['success' => false, 'error' => 'Hiányzó adatok']);
    exit;
}

$userId = $_SESSION['id'];
$results = json_encode($data['results']);
$personalityProfile = json_encode($data['personality_profile']);
$answers = json_encode($data['answers'] ?? []);

try {
    // Adatbázis kapcsolat létrehozása
    $host = $_ENV['DB_HOST'];
    $dbname = $_ENV['DB_NAME'];
    $username = $_ENV['DB_USER'];
    $password = $_ENV['DB_PASS'];

    $conn = new mysqli($host, $username, $password, $dbname);

    // Check if connection is successful
    if ($conn->connect_error) {
        throw new Exception("Adatbázis kapcsolódási hiba: " . $conn->connect_error);
    }

    // Insert the new result
    $stmt = $conn->prepare("INSERT INTO career_results (user_id, results, personality_profile, created_at) VALUES (?, ?, ?, NOW())");
    if (!$stmt) {
        throw new Exception("SQL hiba: " . $conn->error);
    }

    $stmt->bind_param("iss", $userId, $results, $personalityProfile);

    if (!$stmt->execute()) {
        throw new Exception("Hiba az eredmény mentése közben: " . $stmt->error);
    }

    $resultId = $conn->insert_id;

    echo json_encode([
        'success' => true,
        'result_id' => $resultId,
        'message' => 'Az eredmény sikeresen elmentve'
    ]);
} catch (Exception $e) {
    error_log("Career result save error: " . $e->getMessage());
    echo json_encode(['success' => false, 'error' => 'Adatbázis hiba: ' . $e->getMessage()]);
}
