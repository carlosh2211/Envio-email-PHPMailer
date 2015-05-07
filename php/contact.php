<?php

//Le decimos a PHP que vamos a devolver objetos JSON
header('Content-type: application/json');

//Importamos la libreria de PHPMailer para el envio de emails
require 'PHPMailer/PHPMailerAutoload.php';

if(isset($_POST['enviar_mail'])){

	$asunto = "ASUNTO DEL MENSAJE";
	$nombre = $_POST['nombre'];
	$email  = $_POST['email'];
	$mensaje= $_POST['msg'];

	$mail = new PHPMailer;
        $mail->isSMTP();
	$mail->Host = 'smtp.gmail.com';
	$mail->SMTPAuth = true;              
	$mail->Username = 'correo_del_administrador@gmail.com';                 
	$mail->Password = 'password del correo del administrador';                           
	$mail->SMTPSecure = 'ssl';                           
	$mail->Port = 465;                                   

	$mail->From = $email; //este es el email que introduce el usuario en el formulario
	$mail->FromName = $nombre;
	$mail->addAddress('correo_del_administrador@gmail.com');

	$mail->isHTML(true);
	$mail->CharSet = 'UTF-8'; 

	$mail->Subject = $asunto;
	$mail->Body    = '<div align="center"><strong>'.$nombre.'</strong> con email: <strong>'.$email.'</strong> le ha contactado desde su web, y le ha enviado el siguiente mensaje: <br><p>'.$mensaje.'</p></div>'; //Ponemos una imagen y el mensaje 
	//comprobamos si el mail se envio correctamente y devolvemos la respuesta al cliente
	if(!$mail->send()) {
		$R['exito'] = false;
		$R['msg'] = 'Error al enviar el email';
	} else {
		$R['exito'] = true;
		$R['msg'] = 'Email enviado con exito,<br> te contestaremos lo más pronto posible<br>';
	}
	echo json_encode($R);
}

?>
