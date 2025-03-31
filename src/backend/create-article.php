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
    header("Access-Control-Allow-Methods: POST, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type, Authorization");
}

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

session_start();

// Ellenőrizzük, hogy a felhasználó be van-e jelentkezve
if (!isset($_SESSION['id'])) {
    die(json_encode(["error" => "Unauthorized"]));
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

$data = json_decode(file_get_contents("php://input"), true);

if (!isset($data['title']) || !isset($data['content'])) {
    http_response_code(400);
    die(json_encode(["error" => "A cím és a tartalom megadása kötelező"]));
}

$title = trim($data['title']);
$summary = trim($data['summary'] ?? '');
$content = trim($data['content']);
$category = trim($data['category'] ?? '');
$tags = isset($data['tags']) ? json_encode($data['tags']) : '[]';
$image = trim($data['image'] ?? '');
$readTime = intval($data['readTime'] ?? 5);
$author_id = $_SESSION['id'];

if (empty($title) || empty($content)) {
    http_response_code(400);
    die(json_encode(["error" => "A cím és a tartalom nem lehet üres"]));
}

$query = "INSERT INTO articles (title, summary, content, category, tags, image, read_time, author_id) 
          VALUES (?, ?, ?, ?, ?, ?, ?, ?)";

$stmt = $conn->prepare($query);
if (!$stmt) {
    http_response_code(500);
    die(json_encode(["error" => "Adatbázis hiba: " . $conn->error]));
}

$stmt->bind_param("ssssssii", $title, $summary, $content, $category, $tags, $image, $readTime, $author_id);

if ($stmt->execute()) {
    $article_id = $conn->insert_id;

    // Lekérjük az újonnan létrehozott cikk adatait
    $query = "SELECT a.*, u.fullname as author_name, u.username as author_username 
              FROM articles a 
              LEFT JOIN users u ON a.author_id = u.id 
              WHERE a.id = ?";

    $stmt = $conn->prepare($query);
    $stmt->bind_param("i", $article_id);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($row = $result->fetch_assoc()) {
        $article = [
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
        echo json_encode(["success" => true, "article" => $article]);
    }
} else {
    http_response_code(500);
    echo json_encode(["error" => "Hiba a cikk létrehozása során: " . $stmt->error]);
}

$stmt->close();
$conn->close();
