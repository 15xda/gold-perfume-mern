const TelegramBot = require('node-telegram-bot-api');
const axios = require('axios');

const bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN, {polling: true});

bot.on('callback_query', async (callbackQuery) => {
    const chatId = callbackQuery.message.chat.id;
    const messageId = callbackQuery.message.message_id;
    const data = callbackQuery.data;
    const messageText = callbackQuery.message.text;
  
    if (data.startsWith('confirm_')) {
      const orderId = data.split('_')[1];
      
      // Check if the order is already confirmed
      if (messageText.includes('📌 *Статус заказа:* _Подтверждён_')) {
        // If already confirmed, just answer the callback query
        await bot.answerCallbackQuery(callbackQuery.id, {
          text: 'Заказ уже подтвержден!',
          show_alert: true
        });
        return;
      }
      
      const updatedText = messageText.replace(/📌 Статус заказа: .+/, '📌 Статус заказа: _Подтверждён_');
      
      try {
        // Update message with new text
        await bot.editMessageText(updatedText, {
          chat_id: chatId,
          message_id: messageId,
          parse_mode: 'Markdown',
          reply_markup: {
            inline_keyboard: [
              [
                { text: '✅ Подтверждено', callback_data: `confirmed_${orderId}` }, // Changed text and callback data
                { text: '❌ Отменить', callback_data: `cancel_${orderId}` },
                { text: '📦 Завершить', callback_data: `done_${orderId}` },
              ],
            ],
          },
        });
        
        
        await axios.post('http://localhost:4004/api/cart/update-order-status', {
          orderId,
          action: 'confirmed',
        });
        
        await bot.answerCallbackQuery(callbackQuery.id, {
          text: 'Заказ успешно подтвержден!'
        });
      } catch (error) {
        console.error('Error handling confirmation:', error);
        await bot.answerCallbackQuery(callbackQuery.id, {
          text: 'Ошибка при обновлении заказа',
          show_alert: true
        });
      }
    } else if (data.startsWith('cancel_')) {
      const orderId = data.split('_')[1];
      
      // Check if already canceled
      if (messageText.includes('📌 *Статус заказа:* _Отменен_')) {
        await bot.answerCallbackQuery(callbackQuery.id, {
          text: 'Заказ уже отменен!',
          show_alert: true
        });
        return;
      }
      
      const updatedText = messageText.replace(/📌 Статус заказа: .+/, '📌 *Статус заказа:* _Отменен_');
      
      try {
        await bot.editMessageText(updatedText, {
          chat_id: chatId,
          message_id: messageId,
          parse_mode: 'Markdown',
          reply_markup: {
            inline_keyboard: [
              [
                { text: '✅ Подтвердить', callback_data: `confirm_${orderId}` },
                { text: '❌ Отменено', callback_data: `canceled_${orderId}` }, // Changed text and callback data
                { text: '📦 Завершить', callback_data: `done_${orderId}` },
              ],
            ],
          },
        });
        
        await axios.post('http://localhost:4004/api/cart/update-order-status', {
          orderId,
          action: 'canceled',
        });
        
        await bot.answerCallbackQuery(callbackQuery.id, {
          text: 'Заказ отменен!'
        });
      } catch (error) {
        console.error('Error handling cancellation:', error);
        await bot.answerCallbackQuery(callbackQuery.id, {
          text: 'Ошибка при отмене заказа',
          show_alert: true
        });
      }
    } else if (data.startsWith('done_')) {
      const orderId = data.split('_')[1]; 
      
      // Check if already done
      if (messageText.includes('📌 *Статус заказа:* _Завершен_')) {
        await bot.answerCallbackQuery(callbackQuery.id, {
          text: 'Заказ уже завершен!',
          show_alert: true
        });
        return;
      }
      
      const updatedText = messageText.replace(/📌 Статус заказа: .+/, '📌 *Статус заказа:* _Завершен_');
      
      try {
        await bot.editMessageText(updatedText, {
          chat_id: chatId,
          message_id: messageId,
          parse_mode: 'Markdown',
          reply_markup: {
            inline_keyboard: [
              [
                { text: '✅ Подтвердить', callback_data: `confirm_${orderId}` },
                { text: '❌ Отменить', callback_data: `cancel_${orderId}` },
                { text: '📦 Завершено', callback_data: `finished_${orderId}` }, 
              ],
            ],
          },
        });
        

        await axios.post('http://localhost:4004/api/cart/update-order-status', {
          orderId,
          action: 'done',
        });
        
        await bot.answerCallbackQuery(callbackQuery.id, {
          text: 'Заказ завершен!'
        });
      } catch (error) {
        console.error('Error handling completion:', error);
        await bot.answerCallbackQuery(callbackQuery.id, {
          text: 'Ошибка при завершении заказа',
          show_alert: true
        });
      }
    } else if (data.startsWith('confirmed_') || data.startsWith('canceled_') || data.startsWith('finished_')) {
      

      await bot.answerCallbackQuery(callbackQuery.id, {
        text: 'Статус уже обновлен',
        show_alert: true
      });
    }
  });
  
  module.exports = bot;