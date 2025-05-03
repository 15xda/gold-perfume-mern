import React from 'react'

const About = () => {
  return (
    <div className="about-page">
      <div className="about-hero">
        <div className="about-hero-content">
          <h1>Gold Parfum - Масляная парфюмерия оптом</h1>
          <p>Поставщик элитной масляной парфюмерии</p>
        </div>
      </div>

      <div className="about-container">
        <section className="about-section">
          <h2>О нас</h2>
          <p>
            Вас приветствует поставщик элитной масляной парфюмерии Gold Parfum. Наша команда помогла более 500 партнерам осуществить мечту и начать бизнес в прекрасной парфюмерной нише. 
            Присоединяйтесь к нам и начните бизнес с маслами с закупки товаров от 3.000₽.
          </p>
        </section>

        <section className="about-section mission">
          <div className="mission-content">
            <h2>Наш ассортимент</h2>
            <ul>
              <li>Парфюмерные масла в чистом концентрате</li>
              <li>Парфюмерная вода для изготовления духов</li>
              <li>Флаконы самых разных видов и объемов</li>
              <li>Диффузоры для дома</li>
              <li>Авто-парфюм</li>
              <li>Полки с парфюмом</li>
            </ul>
          </div>

          <div className="mission-stats">
            <div className="stat-item">
              <span className="stat-number">200+</span>
              <span className="stat-label">Ароматов в ассортименте</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">500+</span>
              <span className="stat-label">Партнеров</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">3 000₽</span>
              <span className="stat-label">Минимальная закупка</span>
            </div>
          </div>
        </section>

        <section className="about-section values">
          <h2>Преимущества бизнеса с нами</h2>
          <div className="values-grid">
            <div className="value-item">
              <span className="material-icons">check_circle</span>
              <h3>Схожесть до 97%</h3>
              <p>Наши масла максимально приближены к оригинальным ароматам.</p>
            </div>
            <div className="value-item">
              <span className="material-icons">schedule</span>
              <h3>Высокая стойкость</h3>
              <p>Часто стойкость масел выше, чем у оригинальных духов.</p>
            </div>
            <div className="value-item">
              <span className="material-icons">trending_up</span>
              <h3>Высокая доходность</h3>
              <p>Быстрая окупаемость и стабильный доход.</p>
            </div>
            <div className="value-item">
              <span className="material-icons">lightbulb</span>
              <h3>Минимальные вложения</h3>
              <p>Старт бизнеса от 3 000₽.</p>
            </div>
            <div className="value-item">
              <span className="material-icons">emoji_nature</span>
              <h3>Творческая работа</h3>
              <p>Создание парфюмерных композиций - это вдохновение каждый день.</p>
            </div>
          </div>
        </section>

        <section className="about-section delivery">
          <h2>Доставка</h2>
          <p>
            Мы осуществляем доставку по всей России и странам СНГ.
          </p>
        </section>
      </div>
    </div>
  )
}

export default About
