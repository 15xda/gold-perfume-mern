import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const HowToOrder = () => {
  return (
    <div className="how-to-order-container">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="how-to-order-card"
      >
        <h1 className="page-title">Как оформить заказ</h1>

        <div className="step-section">
          <h2 className="step-title">
            <span className="step-number">1</span>
            Войдите или создайте аккаунт
          </h2>
          <div className="step-content">
            <p>Для начала войдите в свой аккаунт. Если у вас его нет, вы можете легко создать новый аккаунт:</p>
            <ul className="step-list">
              <li>Нажмите "Войти" в верхней части страницы</li>
              <li>Если вы новичок, нажмите "Создать аккаунт" и укажите свои данные</li>
              <li>Наличие аккаунта ускоряет оформление заказа и отслеживание заказа</li>
            </ul>
          </div>
        </div>

        <div className="step-section">
          <h2 className="step-title">
            <span className="step-number">2</span>
            Просмотрите нашу коллекцию
          </h2>
          <div className="step-content">
            <p>Исследуйте наш широкий ассортимент премиальных ароматов:</p>
            <ul className="step-list">
              <li>Используйте строку поиска для поиска конкретных товаров</li>
              <li>Фильтруйте по бренду, ценовому диапазону или типу аромата</li>
              <li>Читайте подробные описания товаров и отзывы</li>
              <li>Добавляйте понравившиеся товары в список желаемого для быстрого доступа позже</li>
            </ul>
          </div>
        </div>

        <div className="step-section">
          <h2 className="step-title">
            <span className="step-number">3</span>
            Добавьте товары в корзину
          </h2>
          <div className="step-content">
            <p>Когда вы нашли нужные товары:</p>
            <ul className="step-list">
              <li>Выберите желаемое количество</li>
              <li>Нажмите "Добавить в корзину" или "Купить сейчас", чтобы продолжить</li>
              <li>Проверьте свою корзину, чтобы убедиться, что все верно</li>
              <li>Вы можете изменять количество или удалять товары в любой момент перед оформлением заказа</li>
            </ul>
          </div>
        </div>

        <div className="step-section">
          <h2 className="step-title">
            <span className="step-number">4</span>
            Оформление заказа
          </h2>
          <div className="step-content">
            <p>Завершите заказ в несколько простых шагов:</p>
            <ul className="step-list">
              <li>Подтвердите свои учетные данные</li>
              <li>Проверьте данные заказа</li>
              <li>Укажите адрес доставки</li>
              <li>Выберите предпочтительный способ оплаты</li>
              <li>Подтвердите заказ и отправьте</li>
            </ul>
          </div>
        </div>

        <div className="step-section">
          <h2 className="step-title">
            <span className="step-number">5</span>
            Подтверждение заказа
          </h2>
          <div className="step-content">
            <p>После оформления заказа:</p>
            <ul className="step-list">
              <li>Вы получите подтверждение по электронной почте с деталями вашего заказа</li>
              <li>Наша команда проверит ваш заказ и обсудит окончательную цену и количество товаров</li>
              <li>Отслеживайте статус вашего заказа и получите номер отслеживания прямо в личном кабинете</li>
              <li>Получайте обновления по электронной почте, Telegram или WhatsApp</li>
              <li>Если вам нужна помощь, обратитесь в нашу службу поддержки</li>
            </ul>
          </div>
        </div>

        <div className="note-section">
          <h3 className="note-title">Важная информация</h3>
          <div className="note-content">
            <p>• Все цены включают применимые налоги</p>
            <p>• Доступны безопасные способы оплаты</p>
            <p>• Минимальная сумма заказа 3000 ₽</p>
          </div>
        </div>

        <div className="contact-info">
          <p>Если вам нужна помощь с заказом, наша служба поддержки готова помочь вам:</p>
          <p>
            Напишите нам на{' '}
            <a href="https://wa.me/79287580909" target='_blank' rel='noopener noreferrer'>
              <span className='fa-brands fa-whatsapp'></span> WhatsApp
            </a>
          </p>
          <p>
            Или посетите нашу{' '}
            <Link to="/contact" className="contact-link">
              страницу контактов
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default HowToOrder;
