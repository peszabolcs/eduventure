<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

require 'vendor/autoload.php';

// CORS beállítások
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

// Ha a böngésző OPTIONS preflight kérést küld, azonnal válaszoljunk
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// .env betöltése
$dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
$dotenv->load();

// Adatbázis kapcsolat paraméterei
$host = $_ENV['DB_HOST'];
$dbname = $_ENV['DB_NAME'];
$username = $_ENV['DB_USER'];
$password = $_ENV['DB_PASS'];
$port = $_ENV['DB_PORT'] ?? 3306;

// Részletes válasz előkészítése
$response = [
    'env_loaded' => true,
    'db_config' => [
        'host' => $host,
        'dbname' => $dbname,
        'username' => $username,
        'port' => $port,
        // A jelszót biztonsági okokból nem adjuk vissza
    ],
    'connection_test' => false,
    'tables' => [],
    'errors' => []
];

// Próbáljuk meg létrehozni a kapcsolatot
try {
    $conn = new mysqli($host, $username, $password, $dbname, $port);

    // Ellenőrizzük a kapcsolat sikerességét
    if ($conn->connect_error) {
        $response['errors'][] = "Connection error: " . $conn->connect_error;
    } else {
        $response['connection_test'] = true;

        // Ellenőrizzük a szükséges táblákat
        $result = $conn->query("SHOW TABLES");
        if ($result) {
            while ($row = $result->fetch_array()) {
                $response['tables'][] = $row[0];
            }

            // Ellenőrizzük a users tábla szerkezetét
            if (in_array('users', $response['tables'])) {
                $tableInfo = [];
                $result = $conn->query("DESCRIBE users");
                while ($row = $result->fetch_assoc()) {
                    $tableInfo[] = $row;
                }
                $response['users_table_structure'] = $tableInfo;
            } else {
                $response['errors'][] = "users tábla nem található az adatbázisban";
            }
        }

        $conn->close();
    }
} catch (Exception $e) {
    $response['errors'][] = "Exception: " . $e->getMessage();
}

// JSON válasz küldése
header('Content-Type: application/json');
echo json_encode($response, JSON_PRETTY_PRINT);
