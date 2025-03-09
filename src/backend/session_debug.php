<?php
session_start();
if (!isset($_SESSION['debug_test'])) {
    $_SESSION['debug_test'] = bin2hex(random_bytes(8));
}
echo json_encode([
    'session_id' => session_id(),
    'debug_test' => $_SESSION['debug_test'],
    'all_session_data' => $_SESSION
]);
?>