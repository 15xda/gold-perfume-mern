import React from 'react';
import { motion } from 'framer-motion';
import { LazyLoadImage } from 'react-lazy-load-image-component'; // Import LazyLoadImage
import 'react-lazy-load-image-component/src/effects/blur.css'; // Import the blur effect CSS
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
                <LazyLoadImage
                    src="src/images/pages/symrise/1.png"
                    alt="Флаконы Symrise"
                    className="brand-hero-image"
                    effect="blur"  // Blur effect for lazy loading
                    width="100%"
                />
            </motion.section>

            <main className="brand-content">
                <motion.section className="brand-story" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                    <h2>История бренда</h2>
                    <LazyLoadImage
                        src="src/images/pages/symrise/2.png"
                        alt="История Symrise"
                        className="section-image"
                        effect="blur"
                        width="100%"
                        height="400px"style={{ objectFit: 'cover', aspectRatio:'30/9' }}
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
                                image: "src/images/pages/symrise/3.png",
                                description: 'Эксклюзивные ароматы для премиальных парфюмерных брендов.',
                                features: ['Высококачественные ингредиенты', 'Инновационные композиции', 'Уникальные аккорды']
                            },
                            {
                                title: 'Consumer Fragrances',
                                image: "src/images/pages/symrise/4.png",
                                description: 'Ароматы для массового рынка, включая косметику и средства личной гигиены.',
                                features: ['Безопасные формулы', 'Широкий ассортимент', 'Стабильное качество']
                            },
                            {
                                title: 'Natural Ingredients',
                                image: "src/images/pages/symrise/5.png",
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
                                <LazyLoadImage
                                    src={product.image}
                                    alt={product.title}
                                    className="product-image"
                                    effect="blur"
                                    width="100%"
                                    height="auto"
                                    style={{ objectFit: 'cover' }}
                                />
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
                    <LazyLoadImage
                        src="src/images/pages/symrise/6.png"
                        alt="Лаборатория Symrise"
                        className="section-image"
                        effect="blur"
                        width="100%"
                        height="400px"style={{ objectFit: 'cover', aspectRatio:'30/9' }}
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
                    <LazyLoadImage
                        src="src/images/pages/symrise/7.png"
                        alt="Экологичное производство Symrise"
                        className="section-image"
                        effect="blur"
                        width="100%"
                        height="400px"style={{ objectFit: 'cover', aspectRatio:'30/9' }}
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
