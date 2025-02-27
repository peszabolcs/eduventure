<?php
session_start();

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

if (isset($_SESSION["user_id"])) {
    echo json_encode([
        "logged_in" => true,
        "user" => [
            "id" => $_SESSION["user_id"],
            "name" => $_SESSION["user_name"],
            "email" => $_SESSION["user_email"]
        ]
    ]);
} else {
    echo json_encode(["logged_in" => false]);
}
?>
