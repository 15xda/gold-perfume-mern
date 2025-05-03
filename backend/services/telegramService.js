const axios = require('axios');

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

async function sendOrderToTelegram(order) {

    
    const message = `


🛒 *Новый заказ получен!*

📅 *Дата заказа:* ${order.date}
🆔 *Номер заказа:* ${order.orderId}
💰 *Итого к оплате:* ${order.orderTotal} ₽
📦 *Количество товаров:* ${order.totalItems}

👤 *Данные покупателя:*
• *Имя:* ${order.userInfo.name}
• *Email:* ${order.userInfo.email}
• *Телефон:* ${order.userInfo.telephone}
• *Адрес доставки:* ${order.userInfo.address === 'another' ? order.userInfo.customAddress : order.userInfo.address}
• *Комментарий:* ${order.userInfo.comment || 'Без комментариев'}

🛍️ *Состав заказа:*
${order.products.map(item => `• ${item.name} — ${item.quantity} (${item.uom})`).join('\n')}

✅ Пора обрабатывать заказ!


`;



    try {
        await axios.post(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
            chat_id: TELEGRAM_CHAT_ID,
            text: message,
            parse_mode: 'Markdown',
        });
    } catch (error) {
        console.error('Ошибка при отправке сообщения в Telegram:', error.message);
        throw error; 
    }
}

module.exports = { sendOrderToTelegram };
