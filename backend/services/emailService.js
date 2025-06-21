const nodemailer = require('nodemailer');

// Configuração exemplo com Gmail (recomendo criar uma conta só pra isso, ou usar serviço SMTP pago/seguro)
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,       // Seu e-mail de envio
        pass: process.env.EMAIL_PASS,       // Senha ou App Password do Gmail
    },
});

async function sendPasswordChangedEmail(email) {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Senha alterada com sucesso!',
        text: `Olá, a sua senha foi alterada recentemente. Se você não reconhece essa alteração, entre em contato com o suporte imediatamente.`,
    };

    await transporter.sendMail(mailOptions);
}

module.exports = { sendPasswordChangedEmail };
