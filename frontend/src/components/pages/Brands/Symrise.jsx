import React from 'react';
import { motion } from 'framer-motion';
import ButtonJumpAnimation from '../../ButtonJumpAnimation';

const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
};

const SymrisePage = () => {
    return (
        <div className="brand-container">
            <motion.section
                className="brand-head"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
            >
                <h1>Symrise Ароматы</h1>
                <p className="brand-subtitle">Немецкое качество в парфюмерии с 1874 года</p>
                <p className="brand-intro">
                    Symrise — это немецкая компания с богатой историей, начавшейся в 1874 году с открытия синтеза ванилина. Сегодня мы продолжаем традиции инноваций и качества, создавая уникальные ароматы и вкусы для мирового рынка.
                </p>
                <img
                    src="https://wwd.com/wp-content/uploads/2020/05/mockup_hero_final-page-001.jpg"
                    alt="Флаконы Symrise"
                    className="brand-hero-image"
                    style={{ width: '100%', height: '400px', objectFit: 'cover' }}
                />
            </motion.section>

            <main className="brand-content">
                <motion.section className="brand-story" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                    <h2>История бренда</h2>
                    <img
                        src="https://www.symrise.com/fileadmin/symrise/Corporate/Our_company/Our_history/1874.png"
                        alt="История Symrise"
                        className="section-image"
                        style={{ width: '100%', height: '400px', objectFit: 'cover' }}
                    />
                    <p>
                        История Symrise началась в 1874 году, когда Фердинанд Тьеманн и Вильгельм Хаарманн открыли метод синтеза ванилина в Хольцминден, Германия. В 1919 году была основана компания Dragoco, которая стала одним из ведущих поставщиков парфюмерных композиций.
                    </p>
                    <p>
                        В 2003 году произошло слияние компаний Haarmann & Reimer и Dragoco, в результате чего была образована группа Symrise. В 2006 году компания провела IPO на Франкфуртской фондовой бирже, став крупнейшим европейским IPO года.
                    </p>
                    <p>
                        В 2021 году Symrise вошла в индекс DAX, подтвердив свою позицию как одного из лидеров индустрии ароматов и вкусов.
                    </p>
                </motion.section>

                <motion.section className="product-showcase" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                    <h2>Коллекции Symrise</h2>
                    <div className="product-grid">
                        {[
                            {
                                title: 'Fine Fragrance',
                                image: 'https://www.symrise.com/fileadmin/symrise/News/2020/packshot_reveal.jpg',
                                description: 'Эксклюзивные ароматы для премиальных парфюмерных брендов.',
                                features: ['Высококачественные ингредиенты', 'Инновационные композиции', 'Уникальные аккорды']
                            },
                            {
                                title: 'Consumer Fragrances',
                                image: 'https://www.reuters.com/resizer/v2/JWTLWYJLTJOFXGVXAPTGJ2WKUM.jpg?auth=24536c14f6a0be022ce9d283f4a46c2cde7bb0f676a1dcdb79347825c6cedaaa&width=1080&quality=80',
                                description: 'Ароматы для массового рынка, включая косметику и средства личной гигиены.',
                                features: ['Безопасные формулы', 'Широкий ассортимент', 'Стабильное качество']
                            },
                            {
                                title: 'Natural Ingredients',
                                image: 'https://www.symrise.com/fileadmin/symrise/Marketing/Scent_and_care/Cosmetic_ingredients/CI-landingpage-nature-science-desire.jpg',
                                description: 'Натуральные ингредиенты для создания экологичных ароматов.',
                                features: ['Устойчивое производство', 'Экологичные ингредиенты', 'Ответственные закупки']
                            },
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
                        src="https://images.wsj.net/im-709735?width=700&height=481"
                        alt="Лаборатория Symrise"
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
                            <p>Создание уникальных ароматов с использованием современных технологий и традиционных методов.</p>
                        </div>
                        <div className="step">
                            <h4>Контроль качества</h4>
                            <p>Строгий контроль на каждом этапе производства, соответствующий немецким стандартам качества.</p>
                        </div>
                    </div>
                </motion.section>

                <motion.section className="quality-commitment" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                    <h2>Устойчивое развитие</h2>
                    <img
                        src="https://www.symrise.com/fileadmin/_processed_/e/8/csm_20120817_STK_Tea_Plantation__2__Header_1400px_59b91e0da4.jpg"
                        alt="Экологичное производство Symrise"
                        className="section-image"
                        style={{ width: '100%', height: '400px', objectFit: 'cover' }}
                    />
                    <p>
                        Symrise активно работает над снижением воздействия на окружающую среду и внедряет устойчивые практики во все аспекты своей деятельности.
                    </p>
                    <p>
                        Компания стремится к углеродной нейтральности и активно участвует в программах по сохранению биоразнообразия.
                    </p>
                    <ul className="commitment-list">
                        <li>Углеродная нейтральность</li>
                        <li>100% возобновляемая энергия</li>
                        <li>Экологичная упаковка</li>
                        <li>Сохранение биоразнообразия</li>
                        <li>Ответственные закупки</li>
                    </ul>
                </motion.section>
                <div className="brand-cta">
                    <ButtonJumpAnimation 
                        text={'Посмотреть продукты Symrise'} 
                        onClick={() => window.location.href = '/search?term=Symrise'}
                    />
                </div>
            </main>
           
        </div>
    );
};

export default SymrisePage; 