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

// Debug session
error_log("Session ID: " . session_id());
error_log("Session data: " . print_r($_SESSION, true));
error_log("Origin: " . $origin);

// Function to send JSON response and exit
function sendJsonResponse($success, $message = '', $data = null)
{
    $response = ['success' => $success];
    if ($message) {
        $response['error'] = $message;
    }
    if ($data !== null) {
        $response['data'] = $data;
    }
    echo json_encode($response);
    exit;
}

// Check if user is logged in
if (!isset($_SESSION['id'])) {
    sendJsonResponse(false, 'Nincs bejelentkezett felhasználó');
}

$userId = $_SESSION['id'];

try {
    // Get POST data
    $input = file_get_contents('php://input');
    error_log("Received input: " . $input);

    $data = json_decode($input, true);
    if (json_last_error() !== JSON_ERROR_NONE) {
        throw new Exception('Érvénytelen JSON adat: ' . json_last_error_msg());
    }

    if (!$data) {
        throw new Exception('Hiányzó vagy érvénytelen adat');
    }

    if (!isset($data['results']) || !isset($data['personalityProfile'])) {
        throw new Exception('Hiányzó kötelező mezők');
    }

    $results = $data['results'];
    $personalityProfile = $data['personalityProfile'];

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

    // Prepare the SQL statement
    $stmt = $conn->prepare("INSERT INTO career_results (user_id, results, personality_profile, created_at) VALUES (?, ?, ?, CURRENT_TIMESTAMP)");
    if (!$stmt) {
        throw new Exception("SQL hiba: " . $conn->error);
    }

    // Convert arrays to JSON strings
    $resultsJson = json_encode($results);
    $personalityProfileJson = json_encode($personalityProfile);

    if ($resultsJson === false || $personalityProfileJson === false) {
        throw new Exception("JSON kódolási hiba: " . json_last_error_msg());
    }

    // Bind parameters
    $stmt->bind_param("iss", $userId, $resultsJson, $personalityProfileJson);

    // Execute the statement
    if (!$stmt->execute()) {
        throw new Exception("SQL végrehajtási hiba: " . $stmt->error);
    }

    sendJsonResponse(true, '', ['id' => $conn->insert_id]);
} catch (Exception $e) {
    error_log("Career results save error: " . $e->getMessage());
    sendJsonResponse(false, $e->getMessage());
}
