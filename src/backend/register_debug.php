<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Naplózás egy fájlba
file_put_contents(__DIR__ . '/register_debug.log', date('Y-m-d H:i:s') . " - New request\n", FILE_APPEND);

require 'vendor/autoload.php';

$dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
$dotenv->load();

// Környezeti változók naplózása
$debug_info = [
    'timestamp' => date('Y-m-d H:i:s'),
    'env_vars' => [
        'DB_HOST' => $_ENV['DB_HOST'] ?? 'not set',
        'DB_NAME' => $_ENV['DB_NAME'] ?? 'not set',
        'DB_USER' => $_ENV['DB_USER'] ?? 'not set',
        'DB_PASS' => 'hidden for security',
        'DB_PORT' => $_ENV['DB_PORT'] ?? 'not set'
    ],
    'request' => [
        'method' => $_SERVER['REQUEST_METHOD'] ?? 'unknown',
        'content_type' => $_SERVER['CONTENT_TYPE'] ?? 'unknown',
        'http_origin' => $_SERVER['HTTP_ORIGIN'] ?? 'unknown'
    ]
];

$allowed_origins = [
    "http://localhost:5173",
    "http://localhost",
    "https://edu-venture.hu"
];

// CORS kezelés
if (isset($_SERVER['HTTP_ORIGIN']) && in_array($_SERVER['HTTP_ORIGIN'], $allowed_origins)) {
    header("Access-Control-Allow-Origin: " . $_SERVER['HTTP_ORIGIN']);
    header("Access-Control-Allow-Credentials: true");
    header("Access-Control-Allow-Methods: POST, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type, Authorization");

    $debug_info['cors'] = 'Headers set for origin: ' . $_SERVER['HTTP_ORIGIN'];
} else {
    $debug_info['cors'] = 'No valid origin found or not set';
}

// Ha a böngésző `OPTIONS` preflight kérést küld, azonnal válaszoljunk
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    $debug_info['preflight'] = 'OPTIONS request received and handled';
    http_response_code(200);
    file_put_contents(__DIR__ . '/register_debug.log', json_encode($debug_info, JSON_PRETTY_PRINT) . "\n\n", FILE_APPEND);
    exit();
}

// Adatbázis kapcsolat
$host = $_ENV['DB_HOST'];
$dbname = $_ENV['DB_NAME'];
$username = $_ENV['DB_USER'];
$password = $_ENV['DB_PASS'];
$port = $_ENV['DB_PORT'] ?? 3306;

try {
    $conn = new mysqli($host, $username, $password, $dbname, $port);

    if ($conn->connect_error) {
        $debug_info['db_connection'] = 'Failed: ' . $conn->connect_error;
        http_response_code(500);
        echo json_encode(["error" => "Database connection failed"]);
        file_put_contents(__DIR__ . '/register_debug.log', json_encode($debug_info, JSON_PRETTY_PRINT) . "\n\n", FILE_APPEND);
        exit();
    }

    $debug_info['db_connection'] = 'Success';
} catch (Exception $e) {
    $debug_info['db_connection'] = 'Exception: ' . $e->getMessage();
    http_response_code(500);
    echo json_encode(["error" => "Database connection exception: " . $e->getMessage()]);
    file_put_contents(__DIR__ . '/register_debug.log', json_encode($debug_info, JSON_PRETTY_PRINT) . "\n\n", FILE_APPEND);
    exit();
}

// Adatok beolvasása JSON vagy x-www-form-urlencoded formátumban
$rawData = file_get_contents("php://input");
$debug_info['raw_input'] = $rawData;

$data = json_decode($rawData, true);

if (!$data) {
    $data = $_POST;
    $debug_info['data_source'] = 'POST data';
} else {
    $debug_info['data_source'] = 'JSON data';
}

$debug_info['parsed_data'] = $data;

// Ellenőrizzük, hogy minden adat megvan-e
if (!isset($data["username"], $data["email"], $data["password"], $data["fullname"])) {
    $debug_info['validation'] = 'Missing required fields';
    $missing = [];
    if (!isset($data["username"])) $missing[] = 'username';
    if (!isset($data["email"])) $missing[] = 'email';
    if (!isset($data["password"])) $missing[] = 'password';
    if (!isset($data["fullname"])) $missing[] = 'fullname';

    $debug_info['missing_fields'] = $missing;

    http_response_code(400);
    echo json_encode(["error" => "Minden mező kitöltése kötelező!", "missing" => $missing]);
    file_put_contents(__DIR__ . '/register_debug.log', json_encode($debug_info, JSON_PRETTY_PRINT) . "\n\n", FILE_APPEND);
    exit();
}

$fullname = $data["fullname"];
$username = $data["username"];
$email = $data["email"];
$password = password_hash($data["password"], PASSWORD_BCRYPT); // Jelszó hash-elése

$debug_info['validation'] = 'All required fields present';

// Ellenőrizzük, hogy az email már létezik-e
try {
    $check_query = $conn->prepare("SELECT id FROM users WHERE email = ?");
    if (!$check_query) {
        $debug_info['prepare_error'] = 'Email check preparation failed: ' . $conn->error;
        http_response_code(500);
        echo json_encode(["error" => "Adatbázis hiba: " . $conn->error]);
        file_put_contents(__DIR__ . '/register_debug.log', json_encode($debug_info, JSON_PRETTY_PRINT) . "\n\n", FILE_APPEND);
        exit();
    }

    $check_query->bind_param("s", $email);
    $check_query->execute();
    $check_query->store_result();

    $debug_info['email_check'] = 'Executed, rows: ' . $check_query->num_rows;

    //Ellenőrizzük, hogy a felhasználónév már létezik-e
    $check_query_username = $conn->prepare("SELECT id FROM users WHERE username = ?");
    if (!$check_query_username) {
        $debug_info['prepare_error'] = 'Username check preparation failed: ' . $conn->error;
        http_response_code(500);
        echo json_encode(["error" => "Adatbázis hiba: " . $conn->error]);
        file_put_contents(__DIR__ . '/register_debug.log', json_encode($debug_info, JSON_PRETTY_PRINT) . "\n\n", FILE_APPEND);
        exit();
    }

    $check_query_username->bind_param("s", $username);
    $check_query_username->execute();
    $check_query_username->store_result();

    $debug_info['username_check'] = 'Executed, rows: ' . $check_query_username->num_rows;


    if ($check_query->num_rows > 0) {
        $debug_info['registration_result'] = 'Email already exists';
        http_response_code(409);
        echo json_encode(["error" => "Ez az email már létezik!"]);
        file_put_contents(__DIR__ . '/register_debug.log', json_encode($debug_info, JSON_PRETTY_PRINT) . "\n\n", FILE_APPEND);
        exit();
    }

    if ($check_query_username->num_rows > 0) {
        $debug_info['registration_result'] = 'Username already exists';
        http_response_code(409);
        echo json_encode(["error" => "Ez a felhasználónév már létezik!"]);
        file_put_contents(__DIR__ . '/register_debug.log', json_encode($debug_info, JSON_PRETTY_PRINT) . "\n\n", FILE_APPEND);
        exit();
    }

    $check_query->close();
    $check_query_username->close();
} catch (Exception $e) {
    $debug_info['check_exception'] = $e->getMessage();
    http_response_code(500);
    echo json_encode(["error" => "Adatbázis ellenőrzési hiba: " . $e->getMessage()]);
    file_put_contents(__DIR__ . '/register_debug.log', json_encode($debug_info, JSON_PRETTY_PRINT) . "\n\n", FILE_APPEND);
    exit();
}

// Felhasználó hozzáadása
try {
    $insert_query = $conn->prepare("INSERT INTO users (fullname, username, email, password) VALUES (?, ?, ?, ?)");
    if (!$insert_query) {
        $debug_info['prepare_error'] = 'Insert preparation failed: ' . $conn->error;
        http_response_code(500);
        echo json_encode(["error" => "Adatbázis hiba: " . $conn->error]);
        file_put_contents(__DIR__ . '/register_debug.log', json_encode($debug_info, JSON_PRETTY_PRINT) . "\n\n", FILE_APPEND);
        exit();
    }

    $insert_query->bind_param("ssss", $fullname, $username, $email, $password);

    $result = $insert_query->execute();
    $debug_info['insert_result'] = $result ? 'Success' : 'Failed: ' . $insert_query->error;

    if ($result) {
        $debug_info['registration_result'] = 'Success, new user ID: ' . $conn->insert_id;
        http_response_code(201);
        echo json_encode(["success" => "Sikeres regisztráció!"]);
    } else {
        $debug_info['registration_result'] = 'Failed: ' . $insert_query->error;
        http_response_code(500);
        echo json_encode(["error" => "Sikertelen regisztráció: " . $insert_query->error]);
    }

    $insert_query->close();
} catch (Exception $e) {
    $debug_info['insert_exception'] = $e->getMessage();
    http_response_code(500);
    echo json_encode(["error" => "Adatbázis beszúrási hiba: " . $e->getMessage()]);
}

$conn->close();
file_put_contents(__DIR__ . '/register_debug.log', json_encode($debug_info, JSON_PRETTY_PRINT) . "\n\n", FILE_APPEND);
