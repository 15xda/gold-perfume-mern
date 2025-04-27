const nodemailer = require('nodemailer');

// Create transporter once
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER || 'pepsiman2001val@gmail.com',
        pass: process.env.EMAIL_PASSWORD || 'kxcn dnwq punk hoio'
    }
});

const sendPasswordResetEmail = async (email, resetToken) => {
    const utcString = new Date(Date.now()).toUTCString();
    
    const mailOptions = {
        from: process.env.EMAIL_USER || 'pepsiman2001val@gmail.com',
        to: email,
        subject: 'Сброс пароля - Gold Perfume',
        html: `
            <div style="background-color:#1A1A1A; padding:30px; font-family:Arial, sans-serif; max-width:500px; margin:0 auto;">
                <div style="text-align:center; margin-bottom:20px;">
                    <h2 style="color:#DAAC61; margin:0 0 15px;">Сброс пароля</h2>
                    <p style="color:#fff; font-size:14px; margin:0 0 20px;">Запрос создан: ${utcString}</p>
                    <a href="http://localhost:5174/reset-password?token=${resetToken}"
                       style="display:inline-block; background-color:#DAAC61; color:#000; font-weight:bold; padding:12px 25px; text-decoration:none;">
                       Сбросить пароль
                    </a>
                    <p style="color:#999; font-size:12px; margin-top:20px; border-top:1px solid #333; padding-top:15px;">
                        © Gold Perfume ${new Date().getFullYear()}
                    </p>
                </div>
            </div>
        `
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent:', info.response);
        return true;
    } catch (error) {
        console.log('Error sending email:', error);
        throw error;
    }
};

module.exports = {
    sendPasswordResetEmail
};