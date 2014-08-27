<?php
$data = Array('status' => 'error');

if (!array_key_exists('email', $_POST)) {
    $data['error'] = 'empty_email';
    die(json_encode($data));
}
$email_address = trim($_POST['email']);

require_once('mailer.class.php');
$mailer = new Mailer();
if (!$mailer->validate_email($email_address, $data['error'])) {
    die(json_encode($data));
}

$file = @fopen("subscribers.txt", "r");
if ($file) {
    while ($line = fgets($file)) {
        $line_email = trim($line);
        if ($email_address == $line_email) {
            $data['error'] = 'exist_email';
            die(json_encode($data));
        }
    }
    fclose($file);
}

$file_text = $email_address . "\n";
$save_email = file_put_contents('subscribers.txt', $file_text, FILE_APPEND);
if ($save_email)  {
    $data['status'] = 'success';
} else {
    $data['error'] = 'save';
    die(json_encode($data));
}

$cfg = require_once('config/email.cfg.php');
if ($cfg['s_email']['enabled']
    && !empty($cfg['name']) && !empty($cfg['email']) && !empty($cfg['s_email']['subject']) && !empty($cfg['s_email']['message'])
    ) {
    $mailer->settings($cfg);
    $send_result = $mailer->send_mail($email_address);
}
die(json_encode($data));
?>