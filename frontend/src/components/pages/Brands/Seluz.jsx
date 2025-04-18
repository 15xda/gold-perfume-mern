import React from 'react';
import { motion } from 'framer-motion';
import ButtonJumpAnimation from '../../ButtonJumpAnimation';

const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
};

const SeluzPage = () => {
    return (
        <div className="brand-container">
            <motion.section
                className="brand-head"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
            >
                <h1>Seluz Ароматы</h1>
                <p className="brand-subtitle">Турецкая парфюмерия с 2011 года</p>
                <p className="brand-intro">
                    Seluz — это турецкая компания, специализирующаяся на создании уникальных ароматов и вкусов, сочетая современные технологии с традиционным мастерством.
                </p>
                <img
                    src="https://pbs.twimg.com/media/DoF9zysXUAAgGNB.jpg"
                    alt="Флаконы Seluz"
                    className="brand-hero-image"
                    style={{ width: '100%', height: '400px', objectFit: 'cover' }}
                />
            </motion.section>

            <main className="brand-content">
                <motion.section className="brand-story" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                    <h2>История бренда</h2>
                    <img
                        src="https://4.bp.blogspot.com/-V5oDAGJ8qpE/Utw3Sm374YI/AAAAAAAAAME/qLuPzmaL5Zc/s1600/Untitled-2.jpg"
                        alt="Завод Seluz"
                        className="section-image"
                        style={{ width: '100%', height: '400px', objectFit: 'cover' }}
                    />
                    <p>
                        Seluz была основана в 2011 году в Стамбуле, Турция. Компания начала свою деятельность с производства ароматов и вкусов, быстро завоевав признание на рынке.
                    </p>
                    <p>
                        В 2007 году компания начала с небольшого двухэтажного здания в Хадымкёе, где проводились пробные производства. После успешных испытаний, в 2010 году началось строительство современного завода в Силиври, который был завершен с 100% собственным капиталом.
                    </p>
                    <p>
                        Сегодня производственный комплекс Seluz в Силиври занимает более 40 тысяч квадратных метров и включает в себя R&D, производство и управление. Общий объем инвестиций в комплекс составил 70 миллионов долларов.
                    </p>
                </motion.section>

                <motion.section className="product-showcase" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                    <h2>Коллекции Seluz</h2>
                    <div className="product-grid">
                        {[
                            { 
                                title: 'Fine Fragrance', 
                                image: 'https://wl-img-prd.s3-accelerate.amazonaws.com/fa92ce00-e911-4dcc-b15f-f5d8da591d91-h.jpeg', 
                                description: 'Эксклюзивные ароматы для премиальных парфюмерных брендов.', 
                                features: ['Высококачественные ингредиенты', 'Уникальные композиции', 'Долговечный эффект']
                              }, 
                              { 
                                title: 'Fragrance Oils', 
                                image: 'http://selpakimya.com/images/tesis/4.jpg', 
                                description: 'Концентрированные ароматные масла для создания парфюмерных композиций и ароматизации продуктов.', 
                                features: ['Высокая концентрация', 'Долговечность', 'Широкий выбор ароматов']
                              }, 
                              { 
                                title: 'Fragrance for Household Products', 
                                image: 'https://ounass-sa.atgcdn.ae/contentful/b3xlytuyfm3e/3sjnXl701iv4DrinRWloB4/bcdde338448a3f1d3993660d860f4e1a/Home_Fragrances_APP_PLP_Banner.jpg?q=70', 
                                description: 'Ароматы для использования в бытовой химии, включая средства для стирки и чистки.', 
                                features: ['Экологичные решения', 'Долговечный аромат', 'Безопасные формулы']
                              }
                              
                              
                        ].map((product, index) => (
                            <motion.div
                                className="product-card"
                                key={index}
                                variants={fadeUp}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                            >
                                <img src={product.image} alt={product.title} className="product-image" />
                                <h3>{product.title}</h3>
                                <p>{product.description}</p>
                                <ul className="product-features">
                                    {product.features.map((feature, i) => (
                                        <li key={i}>{feature}</li>
                                    ))}
                                </ul>
                            </motion.div>
                        ))}
                    </div>
                </motion.section>

                <motion.section className="manufacturing-process" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                    <h2>Мастерство</h2>
                    <img
                        src="http://selpakimya.com/images/tesis/3.jpg"
                        alt="Лаборатория Seluz"
                        className="section-image"
                        style={{ width: '100%', height: '400px', objectFit: 'cover' }}
                    />
                    <div className="process-steps">
                        <div className="step">
                            <h4>Исследование</h4>
                            <p>Передовые исследования в области ароматов и вкусов, включая разработку новых молекул.</p>
                        </div>
                        <div className="step">
                            <h4>Разработка</h4>
                            <p>Создание уникальных ароматов с использованием современных технологий.</p>
                        </div>
                        <div className="step">
                            <h4>Контроль качества</h4>
                            <p>Строгий контроль на каждом этапе производства, соответствующий международным стандартам.</p>
                        </div>
                    </div>
                </motion.section>

                <motion.section className="quality-commitment" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                    <h2>Устойчивое развитие</h2>
                    <img
                        src="http://selpakimya.com/images/tesis/5.jpg"
                        alt="Экологичное производство Seluz"
                        className="section-image"
                        style={{ width: '100%', height: '400px', objectFit: 'cover' }}
                    />
                    <p>
                        Seluz активно работает над снижением воздействия на окружающую среду и внедряет устойчивые практики в производство.
                    </p>
                    <p>
                        Компания реализует проекты по защите окружающей среды, включая использование стеклянных бутылок для воды, поддержку местных сообществ и образовательные инициативы.
                    </p>
                    <ul className="commitment-list">
                        <li>Экологичное производство</li>
                        <li>Ответственные закупки</li>
                        <li>Эффективное использование ресурсов</li>
                        <li>Снижение отходов</li>
                        <li>Поддержка местных сообществ</li>
                    </ul>
                </motion.section>
                <div className="brand-cta">
                    <ButtonJumpAnimation 
                        text={'Посмотреть продукты Seluz'} 
                        onClick={() => window.location.href = '/search?term=Seluz'}
                    />
                </div>
            </main>
            
        </div>
    );
};

export default SeluzPage; 