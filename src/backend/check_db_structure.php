<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

require 'vendor/autoload.php';

header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

$dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
$dotenv->load();

// Adatbázis kapcsolat
$host = $_ENV['DB_HOST'];
$dbname = $_ENV['DB_NAME'];
$username = $_ENV['DB_USER'];
$password = $_ENV['DB_PASS'];
$port = $_ENV['DB_PORT'] ?? 3306;

$response = [
    'status' => 'checking',
    'connection' => false,
    'database_exists' => false,
    'users_table_exists' => false,
    'users_table_structure' => [],
    'actions_taken' => [],
    'errors' => []
];

try {
    // Először csak csatlakozunk a szerverhez, adatbázis megadása nélkül
    $conn = new mysqli($host, $username, $password, '', $port);

    if ($conn->connect_error) {
        $response['errors'][] = "Adatbázis kapcsolódási hiba: " . $conn->connect_error;
    } else {
        $response['connection'] = true;

        // Ellenőrizzük, hogy létezik-e az adatbázis
        $result = $conn->query("SHOW DATABASES LIKE '$dbname'");

        if ($result && $result->num_rows > 0) {
            $response['database_exists'] = true;

            // Most csatlakozzunk az adatbázishoz
            $conn->select_db($dbname);

            // Ellenőrizzük, hogy létezik-e a users tábla
            $result = $conn->query("SHOW TABLES LIKE 'users'");

            if ($result && $result->num_rows > 0) {
                $response['users_table_exists'] = true;

                // Tábla szerkezetének lekérése
                $result = $conn->query("DESCRIBE users");
                $table_structure = [];

                while ($row = $result->fetch_assoc()) {
                    $table_structure[] = $row;
                }

                $response['users_table_structure'] = $table_structure;

                // Ellenőrizzük, hogy minden szükséges oszlop megvan-e
                $has_id = false;
                $has_fullname = false;
                $has_username = false;
                $has_email = false;
                $has_password = false;

                foreach ($table_structure as $column) {
                    if ($column['Field'] === 'id') $has_id = true;
                    if ($column['Field'] === 'fullname') $has_fullname = true;
                    if ($column['Field'] === 'username') $has_username = true;
                    if ($column['Field'] === 'email') $has_email = true;
                    if ($column['Field'] === 'password') $has_password = true;
                }

                if (!$has_id || !$has_fullname || !$has_username || !$has_email || !$has_password) {
                    $response['errors'][] = "A users tábla hiányos szerkezettel rendelkezik";
                }
            } else {
                // A tábla nem létezik, hozzuk létre
                $sql = "CREATE TABLE users (
                    id INT(11) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
                    fullname VARCHAR(255) NOT NULL,
                    username VARCHAR(255) NOT NULL UNIQUE,
                    email VARCHAR(255) NOT NULL UNIQUE,
                    password VARCHAR(255) NOT NULL,
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
                )";

                if ($conn->query($sql) === TRUE) {
                    $response['actions_taken'][] = "users tábla létrehozva";
                    $response['users_table_exists'] = true;
                } else {
                    $response['errors'][] = "Hiba a users tábla létrehozásakor: " . $conn->error;
                }
            }
        } else {
            // Az adatbázis nem létezik, hozzuk létre
            $sql = "CREATE DATABASE $dbname";

            if ($conn->query($sql) === TRUE) {
                $response['actions_taken'][] = "$dbname adatbázis létrehozva";
                $response['database_exists'] = true;

                // Válasszuk ki az új adatbázist
                $conn->select_db($dbname);

                // Hozzuk létre a users táblát
                $sql = "CREATE TABLE users (
                    id INT(11) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
                    fullname VARCHAR(255) NOT NULL,
                    username VARCHAR(255) NOT NULL UNIQUE,
                    email VARCHAR(255) NOT NULL UNIQUE,
                    password VARCHAR(255) NOT NULL,
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
                )";

                if ($conn->query($sql) === TRUE) {
                    $response['actions_taken'][] = "users tábla létrehozva";
                    $response['users_table_exists'] = true;
                } else {
                    $response['errors'][] = "Hiba a users tábla létrehozásakor: " . $conn->error;
                }
            } else {
                $response['errors'][] = "Hiba az adatbázis létrehozásakor: " . $conn->error;
            }
        }
    }

    $conn->close();
} catch (Exception $e) {
    $response['errors'][] = "Kivétel történt: " . $e->getMessage();
}

$response['status'] = count($response['errors']) > 0 ? 'error' : 'success';

header('Content-Type: application/json');
echo json_encode($response, JSON_PRETTY_PRINT);
