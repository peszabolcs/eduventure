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
    header('Access-Control-Allow-Headers: Content-Type, Authorization');
    header('Access-Control-Allow-Credentials: true');
    header('Access-Control-Max-Age: 86400');    // cache for 1 day
    exit(0);
}

header('Content-Type: application/json');
header("Access-Control-Allow-Origin: $origin");
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Allow-Methods: GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

// Start session with secure settings
ini_set('session.cookie_secure', true);
ini_set('session.cookie_httponly', true);
ini_set('session.cookie_samesite', 'None');
ini_set('session.cookie_domain', '.edu-venture.hu');
ini_set('session.gc_maxlifetime', 3600); // 1 óra
session_start();

// .env betöltése
$dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
$dotenv->load();

// Token ellenőrzése
$headers = getallheaders();
$auth_header = isset($headers['Authorization']) ? $headers['Authorization'] : '';

if (!isset($_SESSION['id']) || !isset($_SESSION['token'])) {
    echo json_encode(['success' => false, 'error' => 'Nincs bejelentkezett felhasználó']);
    exit;
}

// Ha van Authorization header, ellenőrizzük a token egyezést
if ($auth_header && preg_match('/Bearer\s(\S+)/', $auth_header, $matches)) {
    $token = $matches[1];
    if ($token !== $_SESSION['token']) {
        session_destroy();
        setcookie(session_name(), '', time() - 3600, '/');
        echo json_encode(['success' => false, 'error' => 'Érvénytelen munkamenet']);
        exit;
    }
}

if (!isset($_GET['id'])) {
    echo json_encode(['success' => false, 'error' => 'Hiányzó azonosító']);
    exit;
}

$userId = $_SESSION['id'];
$resultId = $_GET['id'];

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

    $stmt = $conn->prepare("SELECT id, results, personality_profile, created_at FROM career_results WHERE id = ? AND user_id = ?");
    if (!$stmt) {
        throw new Exception("SQL hiba: " . $conn->error);
    }

    $stmt->bind_param("ii", $resultId, $userId);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows === 0) {
        echo json_encode(['success' => false, 'error' => 'Az eredmény nem található']);
        exit;
    }

    $row = $result->fetch_assoc();
    $careerResult = [
        'id' => $row['id'],
        'results' => json_decode($row['results'], true),
        'personalityProfile' => json_decode($row['personality_profile'], true),
        'date' => $row['created_at']
    ];

    // Session frissítése
    session_regenerate_id(true);

    echo json_encode(['success' => true, 'result' => $careerResult]);
} catch (Exception $e) {
    error_log("Career result fetch error: " . $e->getMessage());
    echo json_encode(['success' => false, 'error' => 'Adatbázis hiba: ' . $e->getMessage()]);
}
