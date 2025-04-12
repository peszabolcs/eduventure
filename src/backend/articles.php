<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

require 'vendor/autoload.php';

$dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
$dotenv->load();

$allowed_origins = [
    "http://localhost:5173",
    "https://edu-venture.hu",
    "https://www.edu-venture.hu"
];

// CORS fejlécek beállítása minden kéréshez
$origin = isset($_SERVER['HTTP_ORIGIN']) ? $_SERVER['HTTP_ORIGIN'] : '';
if (in_array($origin, $allowed_origins)) {
    header("Access-Control-Allow-Origin: $origin");
} else {
    header("Access-Control-Allow-Origin: https://www.edu-venture.hu");
}
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Adatbázis kapcsolat
$host = $_ENV['DB_HOST'];
$dbname = $_ENV['DB_NAME'];
$username = $_ENV['DB_USER'];
$password = $_ENV['DB_PASS'];

$conn = new mysqli($host, $username, $password, $dbname);

if ($conn->connect_error) {
    die(json_encode(["error" => "Database connection failed"]));
}

$query = "SELECT a.*, u.fullname as author_name, u.username as author_username, u.avatar as author_avatar 
          FROM articles a 
          LEFT JOIN users u ON a.author_id = u.id 
          ORDER BY a.created_at DESC";

$result = $conn->query($query);

if ($result) {
    $articles = [];
    while ($row = $result->fetch_assoc()) {
        $articles[] = [
            'id' => $row['id'],
            'title' => $row['title'],
            'summary' => $row['summary'],
            'content' => $row['content'],
            'category' => $row['category'],
            'tags' => json_decode($row['tags']),
            'images' => [$row['image']],
            'publishDate' => $row['created_at'],
            'readTime' => $row['read_time'],
            'author' => [
                'name' => $row['author_name'],
                'username' => $row['author_username'],
                'avatar' => $row['author_avatar']
            ]
        ];
    }
    echo json_encode($articles);
} else {
    echo json_encode(["error" => "Error fetching articles"]);
}

$conn->close();
