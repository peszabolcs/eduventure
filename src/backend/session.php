<?php
// Session beállítások
ini_set('session.cookie_secure', 1);
ini_set('session.cookie_httponly', 1);
ini_set('session.cookie_samesite', 'None');
ini_set('session.cookie_domain', '.edu-venture.hu');
ini_set('session.gc_maxlifetime', 604800); // 7 nap
ini_set('session.cookie_lifetime', 604800); // 7 nap

// Session indítása a megfelelő beállításokkal
if (session_status() === PHP_SESSION_NONE) {
    session_start([
        'cookie_lifetime' => 604800,
        'cookie_secure' => true,
        'cookie_httponly' => true,
        'cookie_samesite' => 'None',
        'cookie_domain' => '.edu-venture.hu',
        'gc_maxlifetime' => 604800
    ]);
}

// Session validáció
function validateSession()
{
    if (!isset($_SESSION['token']) || !isset($_SESSION['id'])) {
        return false;
    }

    // Ellenőrizzük a last_activity-t
    if (isset($_SESSION['last_activity']) && (time() - $_SESSION['last_activity'] > 604800)) {
        session_destroy();
        return false;
    }

    // Frissítjük a last_activity-t
    $_SESSION['last_activity'] = time();
    return true;
}
