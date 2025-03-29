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
    header('Access-Control-Allow-Methods: GET, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type');
    header('Access-Control-Allow-Credentials: true');
    header('Access-Control-Max-Age: 86400');    // cache for 1 day
    exit(0);
}

header('Content-Type: application/json');
header("Access-Control-Allow-Origin: $origin");
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Allow-Methods: GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Start session with secure settings
ini_set('session.cookie_samesite', 'None');
ini_set('session.cookie_secure', true);
ini_set('session.cookie_domain', '.edu-venture.hu'); // Allow cookies for both www and non-www
session_start();

// .env betöltése
$dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
$dotenv->load();

// Debug session
error_log("Session ID: " . session_id());
error_log("Session data: " . print_r($_SESSION, true));
error_log("Origin: " . $origin);

if (!isset($_SESSION['id'])) {
    echo json_encode(['success' => false, 'error' => 'Nincs bejelentkezett felhasználó']);
    exit;
}

$userId = $_SESSION['id'];

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

    $stmt = $conn->prepare("SELECT id, results, personality_profile, created_at FROM career_results WHERE user_id = ? ORDER BY created_at DESC");
    if (!$stmt) {
        throw new Exception("SQL hiba: " . $conn->error);
    }

    $stmt->bind_param("i", $userId);
    $stmt->execute();
    $result = $stmt->get_result();

    $results = [];
    while ($row = $result->fetch_assoc()) {
        $results[] = [
            'id' => $row['id'],
            'results' => json_decode($row['results'], true),
            'personalityProfile' => json_decode($row['personality_profile'], true),
            'date' => $row['created_at']
        ];
    }

    echo json_encode(['success' => true, 'results' => $results]);
} catch (Exception $e) {
    error_log("Career results fetch error: " . $e->getMessage());
    echo json_encode(['success' => false, 'error' => 'Adatbázis hiba: ' . $e->getMessage()]);
}
