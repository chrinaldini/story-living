<?php
// Simple contact-form mailer for the Story Living site.
// Routes to the right inbox based on the "regarding" field.
// NOTE: If the host rejects the From address, change $FROM to a mailbox
// that lives on a domain hosted on this account.

header('Content-Type: application/json; charset=UTF-8');

$RECIPIENTS = [
    'reservation' => 'reservations@storyliving.se',
    'enquiry'     => 'info.lidingo@storyliving.se',
];
$FROM = 'Story Living <no-reply@storyliving.se>';

// reCAPTCHA v2 secret key — the SECRET half of the key pair (site key in home.ts).
// Manage the key pair at https://www.google.com/recaptcha/admin
$RECAPTCHA_SECRET = '6LeMeT8tAAAAAKHeilPRPQt-1ZRGHEUT2y6KickE';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['ok' => false, 'error' => 'Method not allowed']);
    exit;
}

// 1) Honeypot — real visitors never fill this hidden field.
if (!empty($_POST['website'])) {
    // Pretend everything is fine, but drop it silently.
    echo json_encode(['ok' => true]);
    exit;
}

// 2) reCAPTCHA v2 — verify the "I'm not a robot" token with Google.
$token = $_POST['g-recaptcha-response'] ?? '';
if ($token === '') {
    http_response_code(422);
    echo json_encode(['ok' => false, 'error' => "Please confirm you're not a robot."]);
    exit;
}

$verifyBody = http_build_query([
    'secret'   => $RECAPTCHA_SECRET,
    'response' => $token,
    'remoteip' => $_SERVER['REMOTE_ADDR'] ?? '',
]);

$verifyJson = false;
if (function_exists('curl_init')) {
    $ch = curl_init('https://www.google.com/recaptcha/api/siteverify');
    curl_setopt_array($ch, [
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_POST           => true,
        CURLOPT_POSTFIELDS     => $verifyBody,
        CURLOPT_TIMEOUT        => 10,
    ]);
    $verifyJson = curl_exec($ch);
    curl_close($ch);
} else {
    // Fallback if cURL is unavailable
    $ctx = stream_context_create([
        'http' => [
            'method'  => 'POST',
            'header'  => 'Content-Type: application/x-www-form-urlencoded',
            'content' => $verifyBody,
            'timeout' => 10,
        ],
    ]);
    $verifyJson = @file_get_contents('https://www.google.com/recaptcha/api/siteverify', false, $ctx);
}

$verify = $verifyJson ? json_decode($verifyJson, true) : null;
if (empty($verify['success'])) {
    http_response_code(422);
    echo json_encode(['ok' => false, 'error' => 'Robot check failed. Please try again.']);
    exit;
}

$name      = trim($_POST['name'] ?? '');
$email     = trim($_POST['email'] ?? '');
$phone     = trim($_POST['phone'] ?? '');
$regarding = ($_POST['regarding'] ?? 'enquiry') === 'reservation' ? 'reservation' : 'enquiry';
$message   = trim($_POST['message'] ?? '');

if ($name === '' || !filter_var($email, FILTER_VALIDATE_EMAIL) || $message === '') {
    http_response_code(422);
    echo json_encode(['ok' => false, 'error' => 'Please fill in your name, a valid email and a message.']);
    exit;
}

// Strip newlines from anything that goes into headers (prevent injection).
$safeName  = preg_replace('/[\r\n]+/', ' ', $name);
$safeEmail = preg_replace('/[\r\n]+/', '', $email);

$to      = $RECIPIENTS[$regarding];
$label   = $regarding === 'reservation' ? 'Reservation request' : 'Enquiry';
$subject = "$label from $safeName";

$body = "New $label from the Story Living website\n\n"
    . "Name: $name\n"
    . "Email: $email\n"
    . "Phone: " . ($phone !== '' ? $phone : '—') . "\n"
    . "Regarding: $regarding\n\n"
    . "Message:\n$message\n";

$headers = implode("\r\n", [
    'From: ' . $FROM,
    'Reply-To: ' . $safeName . ' <' . $safeEmail . '>',
    'MIME-Version: 1.0',
    'Content-Type: text/plain; charset=UTF-8',
]);

$encodedSubject = '=?UTF-8?B?' . base64_encode($subject) . '?=';

if (mail($to, $encodedSubject, $body, $headers)) {
    echo json_encode(['ok' => true]);
} else {
    http_response_code(500);
    echo json_encode(['ok' => false, 'error' => 'Mail could not be sent. Please email us directly.']);
}
