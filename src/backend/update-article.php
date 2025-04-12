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

if (!isset($data['id']) || !isset($data['title']) || !isset($data['content'])) {
    die(json_encode(["error" => "ID, title and content are required"]));
}

$id = $data['id'];
$title = $data['title'];
$summary = $data['summary'] ?? '';
$content = $data['content'];
$category = $data['category'] ?? '';
$tags = isset($data['tags']) ? json_encode($data['tags']) : '[]';
$image = $data['image'] ?? '';
$readTime = $data['readTime'] ?? 5;

// Ellenőrizzük, hogy a felhasználó jogosult-e szerkeszteni a cikket
$check_query = "SELECT author_id FROM articles WHERE id = ?";
$stmt = $conn->prepare($check_query);
$stmt->bind_param("i", $id);
$stmt->execute();
$result = $stmt->get_result();
$article = $result->fetch_assoc();

if (!$article || ($article['author_id'] !== $_SESSION['id'] && $_SESSION['role'] !== 'admin')) {
    die(json_encode(["error" => "Unauthorized"]));
}

$query = "UPDATE articles 
          SET title = ?, summary = ?, content = ?, category = ?, 
              tags = ?, image = ?, read_time = ? 
          WHERE id = ?";

$stmt = $conn->prepare($query);
$stmt->bind_param("ssssssii", $title, $summary, $content, $category, $tags, $image, $readTime, $id);

if ($stmt->execute()) {
    // Lekérjük a frissített cikk adatait
    $query = "SELECT a.*, u.fullname as author_name, u.username as author_username 
              FROM articles a 
              LEFT JOIN users u ON a.author_id = u.id 
              WHERE a.id = ?";

    $stmt = $conn->prepare($query);
    $stmt->bind_param("i", $id);
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
            'images' => [$row['image']],
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
    echo json_encode(["error" => "Error updating article"]);
}

$stmt->close();
$conn->close();
