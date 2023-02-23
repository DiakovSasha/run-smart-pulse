<?php 


$_POST = json_decode( file_get_contents("php://input"), true );

$name = $_POST['name'];
$tel = $_POST['tel'];
$email = $_POST['email'];

require_once('phpmailer/PHPMailerAutoload.php');
$mail = new PHPMailer(true);
$mail->CharSet = 'UTF-8';
$mail->setLanguage('ru', 'phpmailer/language/');

// $mail->SMTPDebug = 3;                               // Enable verbose debug output

$mail->isSMTP();                                      // Set mailer to use SMTP
$mail->Host = 'smtp.gmass.co';  // Specify main and backup SMTP servers
$mail->SMTPAuth = true;                               // Enable SMTP authentication
$mail->Username = 'testfrfrf@gmail.com';                 // Наш логин
$mail->Password = 'fbb803b0-a131-42bb-a217-6a1958cd5e59';                           // Наш пароль от ящика
$mail->SMTPSecure = 'tls';                            // Enable TLS encryption, `ssl` also accepted
$mail->Port = 587;                                    // TCP port to connect to
 
$mail->setFrom('testfrfrf@gmail.com', 'Pulse');   // От кого письмо 
$mail->addAddress('diakovsasha777@gmail.com');     // Add a recipient
//$mail->addAddress('ellen@example.com');               // Name is optional
//$mail->addReplyTo('info@example.com', 'Information');
//$mail->addCC('cc@example.com');
//$mail->addBCC('bcc@example.com');
//$mail->addAttachment('/var/tmp/file.tar.gz');         // Add attachments
//$mail->addAttachment('/tmp/image.jpg', 'new.jpg');    // Optional name
                                 // Set email format to HTML
$mail->isHTML(true); 
$mail->Subject = 'Данные';
$mail->Body ='<h4>User data <h4/><br> 
	Name: ' . $name . ' <br>
	Phone number: ' . $tel . '<br>
	E-mail: ' . $email . '';

if(!$mail->send()) {
    return false;
} else {
    return true;
}

?>