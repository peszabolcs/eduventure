<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

require 'vendor/autoload.php';

$dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
$dotenv->load();

$allowed_origins = [
    "http://localhost:5173",
    "https://edu-venture.hu"
];

if (isset($_SERVER['HTTP_ORIGIN']) && in_array($_SERVER['HTTP_ORIGIN'], $allowed_origins)) {
    header("Access-Control-Allow-Origin: " . $_SERVER['HTTP_ORIGIN']);
    header("Access-Control-Allow-Credentials: true");
    header("Access-Control-Allow-Methods: GET, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type, Authorization");
}

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

if (!isset($_GET['id']) || !isset($_GET['category'])) {
    die(json_encode(["error" => "ID and category are required"]));
}

$id = $_GET['id'];
$category = $_GET['category'];

$query = "SELECT a.*, u.fullname as author_name, u.username as author_username 
          FROM articles a 
          LEFT JOIN users u ON a.author_id = u.id 
          WHERE a.id != ? AND a.category = ? 
          ORDER BY a.created_at DESC 
          LIMIT 3";

$stmt = $conn->prepare($query);
$stmt->bind_param("is", $id, $category);
$stmt->execute();
$result = $stmt->get_result();

$articles = [];
while ($row = $result->fetch_assoc()) {
    $articles[] = [
        'id' => $row['id'],
        'title' => $row['title'],
        'summary' => $row['summary'],
        'content' => $row['content'],
        'category' => $row['category'],
        'tags' => json_decode($row['tags']),
        'image' => $row['image'],
        'publishDate' => $row['created_at'],
        'readTime' => $row['read_time'],
        'author' => [
            'name' => $row['author_name'],
            'username' => $row['author_username']
        ]
    ];
}

echo json_encode($articles);

$stmt->close();
$conn->close();
