import React, { useState } from 'react';
import { useSelector } from 'react-redux';

const Contact = () => {
  const userInfo = useSelector(state => state.user.data);
  const [formData, setFormData] = useState({
    name: userInfo ? userInfo.name : '',
    email: userInfo ? userInfo.email : '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Добавьте здесь логику отправки формы
    console.log('Форма обратной связи отправлена:', formData);
  };

  return (
    <div className="contact-page">
      <div className="contact-hero">
        <div className="contact-hero-content">
          <h1>Свяжитесь с нами</h1>
          <p>Мы будем рады вам помочь, {formData.name}</p>
        </div>
      </div>

      <div className="contact-container">
        <div className="contact-info">
          <div className="info-section">
            <span className="material-icons">location_on</span>
            <h3>Наш адрес</h3>
            <p>проспект Ленина, 154А</p>
            <p>г. Черкесск</p>
          </div>
          <div className="info-section">
            <span className="material-icons">call</span>
            <h3>Позвоните нам</h3>
            <p>+7 (928) 758-09-09</p>
            <p>Пн-Пт: 9:00 - 18:00</p>
          </div>
          <div className="info-section">
            <a href="https://wa.me/79287580909" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: 'inherit' }}>
              <i className="fa-brands fa-whatsapp" style={{ fontSize: '32px', color: '#25D366' }}></i>
              <h3>WhatsApp</h3>
              <p>+7 (928) 758-09-09</p>
              <p>Напишите нам в WhatsApp</p>
            </a>
          </div>
          <div className="info-section">
            <span className="material-icons">schedule</span>
            <h3>Часы работы</h3>
            <p>Понедельник - Суббота: 10:00 - 20:00</p>
            <p>Воскресенье: 11:00 - 18:00</p>
          </div>
        </div>

        <div className="contact-form-container">
          <h2>Мы на карте</h2>
          <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4729.061605402286!2d42.04415134365007!3d44.211618148024755!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x405800e60f3eaa87%3A0x82ec76986af8e90d!2sProspekt%20Lenina%2C%20154%20%D0%90%2C%20Cherkessk%2C%20Karachayevo-Cherkesskaya%20Respublika%2C%20Russia%2C%20369001!5e1!3m2!1sen!2ssa!4v1745829743681!5m2!1sen!2ssa" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
          {/* <form onSubmit={handleSubmit} className="contact-form">
            <div className="form-group">
              <input
                type="text"
                name="name"
                placeholder="Ваше имя"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <input
                type="email"
                name="email"
                placeholder="Ваш Email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                name="subject"
                placeholder="Тема сообщения"
                value={formData.subject}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <textarea
                name="message"
                placeholder="Ваше сообщение"
                value={formData.message}
                onChange={handleChange}
                required
                rows="6"
              ></textarea>
            </div>
            <button type="submit" className="auth-submit">Отправить сообщение</button>
          </form> */}
          
        </div>
      </div>
    </div>
  );
}

export default Contact;
