import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText


async def send_email(destinatario, asunto, mensaje):
    # Configuración del servidor SMTP
    usuario = "password-recovery@sportium.com.ar"
    contrasena = "@3Wx1PW5vL"
    servidor_smtp = "c2701287.ferozo.com"
    puerto_smtp = 465

    # Crear mensaje
    msg = MIMEMultipart()
    msg["From"] = usuario
    msg["To"] = destinatario
    msg["Subject"] = asunto
    msg.attach(MIMEText(mensaje, "plain"))

    try:
        # Conectar al servidor SMTP
        server = smtplib.SMTP_SSL(servidor_smtp, puerto_smtp)
        server.login(usuario, contrasena)

        # Enviar correo
        server.sendmail(usuario, destinatario, msg.as_string())
        server.quit()

        print("Correo enviado exitosamente")
    except Exception as e:
        print(f"Error al enviar correo: {e}")
