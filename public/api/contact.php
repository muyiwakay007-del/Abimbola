<?php
// Contact form handler. The site is a static export on Bluehost, where PHP is
// the only server-side runtime, so this replaces src/app/api/contact/route.ts.
// It returns the same JSON shape that useFormSubmit expects.

const TO = 'contact@abimbolaolumuyiwa.com';
const FROM = 'Abimbola Olumuyiwa website <noreply@abimbolaolumuyiwa.com>';
// Envelope sender on our own domain, so the SPF pass counts for abimbolaolumuyiwa.com.
// It is a real mailbox so bounce notices from rejected sends land in the inbox.
const ENVELOPE_FROM = 'contact@abimbolaolumuyiwa.com';
// Keep in sync with contactTopics in src/content/site.ts.
const TOPICS = ['General', 'Book order or bulk purchase', 'School or church', 'Speaking or event', 'Review', 'Media'];
const MAX_PER_HOUR = 5;
// Titan SMTP settings live outside public_html so the password is never web-served
// or committed. The file returns ['host' => ..., 'port' => 465, 'username' => ..., 'password' => ...].
// Without it, the form falls back to PHP mail().
const SMTP_CONFIG = __DIR__ . '/../../contact-smtp.php';

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

// Sends one message through an authenticated SMTP server over implicit TLS.
// Returns null on success, or the server reply that failed.
function smtpSend(array $cfg, string $from, string $to, string $data): ?string {
  $fp = @stream_socket_client('ssl://' . $cfg['host'] . ':' . ($cfg['port'] ?? 465), $errno, $errstr, 15);
  if (!$fp) return "connect: $errno $errstr";
  stream_set_timeout($fp, 15);
  $read = function () use ($fp): string {
    $out = '';
    while (($line = fgets($fp, 1024)) !== false) {
      $out .= $line;
      if (strlen($line) < 4 || $line[3] === ' ') break;
    }
    return $out;
  };
  $step = function (?string $cmd, string $expect) use ($fp, $read): ?string {
    if ($cmd !== null) fwrite($fp, $cmd . "\r\n");
    $reply = $read();
    return strncmp($reply, $expect, 3) === 0 ? null : trim($reply);
  };
  // Lines starting with a dot are doubled so they can't end the message early.
  $data = preg_replace('/^\./m', '..', str_replace(["\r\n", "\r"], "\n", $data));
  $data = str_replace("\n", "\r\n", $data);
  $error = $step(null, '220')
    ?? $step('EHLO abimbolaolumuyiwa.com', '250')
    ?? $step('AUTH LOGIN', '334')
    ?? $step(base64_encode($cfg['username']), '334')
    ?? $step(base64_encode($cfg['password']), '235')
    ?? $step("MAIL FROM:<$from>", '250')
    ?? $step("RCPT TO:<$to>", '250')
    ?? $step('DATA', '354')
    ?? $step($data . "\r\n.", '250');
  fwrite($fp, "QUIT\r\n");
  fclose($fp);
  return $error;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') reply(405, ['error' => 'invalid_request']);

$body = json_decode(file_get_contents('php://input'), true);
if (!is_array($body)) reply(400, ['error' => 'invalid_request']);

// Honeypot: real visitors never fill the hidden field. It is not called "company"
// because browser autofill fills fields with that name, silently dropping real messages.
if (clean($body['hp_extra'] ?? '') !== '') reply(200, ['ok' => true]);

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

$smtp = is_readable(SMTP_CONFIG) ? require SMTP_CONFIG : null;
if (is_array($smtp)) {
  $message = implode("\r\n", [
    'Date: ' . date('r'),
    'Message-ID: <' . bin2hex(random_bytes(12)) . '@abimbolaolumuyiwa.com>',
    'To: ' . TO,
    "Subject: $subject",
    $headers,
  ]) . "\r\n\r\n" . $text;
  $error = smtpSend($smtp, ENVELOPE_FROM, TO, $message);
  if ($error !== null) {
    error_log("[contact] SMTP failed: $error");
    reply(502, ['error' => 'provider_error']);
  }
} elseif (!mail(TO, $subject, $text, $headers, '-f' . ENVELOPE_FROM)) {
  error_log('[contact] mail() failed');
  reply(502, ['error' => 'provider_error']);
}
reply(200, ['ok' => true]);
