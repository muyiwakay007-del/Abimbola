<?php
// Contact form handler. The site is a static export on Bluehost, where PHP is
// the only server-side runtime, so this replaces src/app/api/contact/route.ts.
// It returns the same JSON shape that useFormSubmit expects.

const TO = 'contact@abimbolaolumuyiwa.com';
const FROM = 'Abimbola Olumuyiwa website <noreply@abimbolaolumuyiwa.com>';
// Envelope sender on our own domain, so the SPF pass counts for abimbolaolumuyiwa.com.
const ENVELOPE_FROM = 'noreply@abimbolaolumuyiwa.com';
// Keep in sync with contactTopics in src/content/site.ts.
const TOPICS = ['General', 'Book order or bulk purchase', 'School or church', 'Speaking or event', 'Review', 'Media'];
const MAX_PER_HOUR = 5;

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store');

function reply(int $status, array $body): void {
  http_response_code($status);
  echo json_encode($body);
  exit;
}

function clean($value, int $max = 200): string {
  return is_string($value) ? mb_substr(trim($value), 0, $max) : '';
}

// Strips line breaks so visitor input can't add mail headers.
function oneLine(string $value): string {
  return trim(preg_replace('/[\r\n]+/', ' ', $value));
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') reply(405, ['error' => 'invalid_request']);

$body = json_decode(file_get_contents('php://input'), true);
if (!is_array($body)) reply(400, ['error' => 'invalid_request']);

// Honeypot: real visitors never fill the hidden "company" field.
if (clean($body['company'] ?? '') !== '') reply(200, ['ok' => true]);

$name = oneLine(clean($body['name'] ?? '', 100));
$email = oneLine(clean($body['email'] ?? '', 254));
$topic = in_array($body['topic'] ?? '', TOPICS, true) ? $body['topic'] : 'General';
$message = clean($body['message'] ?? '', 5000);

if ($name === '') reply(400, ['error' => 'name_required']);
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) reply(400, ['error' => 'invalid_email']);
if (mb_strlen($message) < 10) reply(400, ['error' => 'message_too_short']);

// Light per-visitor limit so the form can't be used to flood the inbox.
$stamp = sys_get_temp_dir() . '/contact-' . hash('sha256', $_SERVER['REMOTE_ADDR'] ?? '') . '.json';
$recent = array_filter(json_decode(@file_get_contents($stamp) ?: '[]', true) ?: [], fn($t) => $t > time() - 3600);
if (count($recent) >= MAX_PER_HOUR) reply(429, ['error' => 'too_many']);
$recent[] = time();
@file_put_contents($stamp, json_encode(array_values($recent)));

$subject = mb_encode_mimeheader("Website message: $topic", 'UTF-8');
$text = "Name: $name\nEmail: $email\nTopic: $topic\n\n$message\n\n--\nSent from the contact form on abimbolaolumuyiwa.com. Reply to this email to answer $name directly.\n";
$headers = implode("\r\n", [
  'From: ' . FROM,
  'Reply-To: ' . mb_encode_mimeheader($name, 'UTF-8') . " <$email>",
  'MIME-Version: 1.0',
  'Content-Type: text/plain; charset=UTF-8',
  'Content-Transfer-Encoding: 8bit',
]);

if (!mail(TO, $subject, $text, $headers, '-f' . ENVELOPE_FROM)) {
  error_log('[contact] mail() failed');
  reply(502, ['error' => 'provider_error']);
}
reply(200, ['ok' => true]);
