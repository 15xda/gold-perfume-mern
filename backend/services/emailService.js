const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER || 'pepsiman2001val@gmail.com',
        pass: process.env.EMAIL_PASSWORD || 'kxcn dnwq punk hoio'
    }
});

const frontendUrl = process.env.FRONTEND_URL;

const sendPasswordResetEmail = async (email, resetToken) => {
    const utcString = new Date(Date.now()).toUTCString();
    
    const mailOptions = {
        from: process.env.EMAIL_USER || 'pepsiman2001val@gmail.com',
        to: email,
        subject: 'Сброс пароля - Gold Perfume',
        html: `
            <div style="background-color:#ECE6D9; padding:30px; font-family:Arial, sans-serif; max-width:500px; margin:0 auto;">
                <div style="text-align:center; margin-bottom:20px;">
                    <h2 style="color:#23645C; margin:0 0 15px;">Сброс пароля</h2>
                    <p style="color:#000; font-size:14px; margin:0 0 20px;">Запрос создан: ${utcString}</p>
                    <a href="${frontendUrl}/reset-password?token=${resetToken}"
                       style="display:inline-block; background-color:#23645C; color:#fff; font-weight:bold; padding:12px 25px; text-decoration:none; border-radius:6px;">
                       Сбросить пароль
                    </a>
                    <p style="color:#555; font-size:12px; margin-top:20px; border-top:1px solid #ccc; padding-top:15px;">
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

const sendConfirmEmailLink = async (email, token) => {
    const utcString = new Date().toUTCString();

    const mailOptions = {
        from: process.env.EMAIL_USER || 'pepsiman2001val@gmail.com',
        to: email,
        subject: 'Подтверждение регистрации - Gold Perfume',
        html: `
            <div style="background-color:#ECE6D9; padding:30px; font-family:Arial, sans-serif; max-width:500px; margin:0 auto;">
                <div style="text-align:center; margin-bottom:20px;">
                    <h2 style="color:#23645C; margin:0 0 15px;">Подтверждение почты</h2>
                    <p style="color:#000; font-size:14px; margin:0 0 20px;">Запрос отправлен: ${utcString}</p>
                    <a href="${frontendUrl}/confirm-email?token=${token}"
                       style="display:inline-block; background-color:#23645C; color:#fff; font-weight:bold; font-size:16px; padding:12px 25px; text-decoration:none; border-radius:6px;">
                       Подтвердить почту
                    </a>
                    <p style="color:#333; font-size:13px; margin-top:20px;">
                        Нажмите на кнопку выше для подтверждения своей электронной почты.
                    </p>
                    <p style="color:#555; font-size:12px; margin-top:20px; border-top:1px solid #ccc; padding-top:15px;">
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
        console.error('Error sending confirmation email:', error);
        throw error;
    }
};

const sendOrderConfirmationEmail = async (order) => {
    const utcString = new Date().toUTCString();

    const mailOptions = {
        from: 'pepsiman2001val@gmail.com',
        to: order.userInfo.email,
        subject: 'Подтверждение заказа - Gold Perfume',
        html: `
            <div style="background-color:#ECE6D9; padding:30px; font-family:Arial, sans-serif; max-width:500px; margin:0 auto;">
                <div style="text-align:center; margin-bottom:20px;">
                    <h2 style="color:#23645C; margin:0 0 15px;">Подтверждение заказа №${order.orderId}</h2>
                    <p style="color:#000; font-size:14px; margin:0 0 20px;">Запрос отправлен: ${utcString}</p>
                    <h4 style="color:#000;">Информация о заказе:</h4>
                    <p style="color:#000;">Дата заказа: ${order.date}</p>
                    <p style="color:#000;">Номер заказа: ${order.orderId}</p>
                    <p style="color:#000;">Итого к оплате: ${order.orderTotal} ₽</p>
                    <p style="color:#000;">Количество товаров: ${order.totalItems}</p>
                    
                    <h4 style="color:#000;">Данные покупателя:</h4>
                    <p style="color:#000;">Имя: ${order.userInfo.name}</p>
                    <p style="color:#000;">Email: ${order.userInfo.email}</p>
                    <p style="color:#000;">Телефон: ${order.userInfo.telephone}</p>
                    <p style="color:#000;">Адрес доставки: ${order.userInfo.address === 'another' ? order.userInfo.customAddress : order.userInfo.address}</p>
                    <p style="color:#000;">Комментарий: ${order.userInfo.comment || 'Без комментариев'}</p>
                    
                    <h4 style="color:#000;">Состав заказа:</h4>
                    <ul style="color:#000;">
                        ${order.products.map(item => `<li>${item.name} — ${item.quantity} (${item.uom})</li>`).join('')}
                    </ul>

                    <h4 style="color:#000;">Статус заказа:</h4>
                    <p style="color:#000;">Ваш заказ находится в статусе <strong>"Ожидает подтверждения"</strong>. После принятия заказа продавцом, вы получите подтверждение.</p>

                    <p style="color:#555; font-size:12px; margin-top:20px; border-top:1px solid #ccc; padding-top:15px;">
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
        console.error('Error sending confirmation email:', error);
        throw error;
    }
};

const sendOrderStatusUpdateEmail = async ({order, name, email, status}) => {
    const utcString = new Date().toUTCString();

    if (status === 'confirmed') status = 'Подтверждено';
    else if (status === 'canceled') status = 'Отклонено';

    const mailOptions = {
        from: 'pepsiman2001val@gmail.com',
        to: email,
        subject: `Обновление статуса заказа №${order.orderId} - Gold Perfume`,
        html: `
            <div style="background-color:#ECE6D9; padding:30px; font-family:Arial, sans-serif; max-width:500px; margin:0 auto;">
                <div style="text-align:center; margin-bottom:20px;">
                    <h2 style="color:#23645C; margin:0 0 15px;">Обновление статуса заказа №${order.orderId}</h2>
                    <p style="color:#000; font-size:14px; margin:0 0 20px;">Время обновления: ${utcString}</p>
                    
                    <h4 style="color:#000;">Новый статус:</h4>
                    <p style="color:#23645C; font-size:20px; font-weight:bold;">${status}</p>
                    
                    <p style="color:#000;">Имя клиента: ${name}</p>
                    <p style="color:#000;">Email: ${email}</p>
                    
                    <h4 style="color:#000;">Напоминание:</h4>
                    <p style="color:#000;">Вы всегда можете отследить статус вашего заказа через ваш личный кабинет.</p>

                    <p style="color:#555; font-size:12px; margin-top:20px; border-top:1px solid #ccc; padding-top:15px;">
                        © Gold Perfume ${new Date().getFullYear()}
                    </p>
                </div>
            </div>
        `
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log('Status update email sent:', info.response);
        return true;
    } catch (error) {
        console.error('Error sending status update email:', error);
        throw error;
    }
};

module.exports = {
    sendPasswordResetEmail,
    sendConfirmEmailLink,
    sendOrderConfirmationEmail,
    sendOrderStatusUpdateEmail,
};
