import React from 'react';
import { motion } from 'framer-motion';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import ButtonJumpAnimation from '../../ButtonJumpAnimation';

const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
};

const IberchemPage = () => {
    return (
        <div className="brand-container">
            <motion.section
                className="brand-head"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
            >
                <h1>Iberchem Ароматы</h1>
                <p className="brand-subtitle">Искусство ароматов с 1985 года</p>
                <p className="brand-intro">
                    Iberchem — ведущий мировой производитель ароматов, основанный в 1985 году в Мурсии, Испания. Компания разрабатывает ароматы для парфюмерии, средств гигиены, бытовой химии и ароматизации воздуха.
                </p>
                <LazyLoadImage
                    src="src/images/pages/iberchem/1.png"
                    alt="Флаконы Iberchem"
                    className="brand-hero-image"
                    effect="blur"
                    width="100%"
                    height="400px"
                    style={{ objectFit: 'cover', aspectRatio: '30/9' }}
                />
            </motion.section>

            <main className="brand-content">
                <motion.section className="brand-story" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                    <h2>История бренда</h2>
                    <LazyLoadImage
                        src="src/images/pages/iberchem/2.png"
                        alt="История Iberchem"
                        className="section-image"
                        effect="blur"
                        width="100%"
                        height="400px"
                        style={{ objectFit: 'cover', aspectRatio: '30/9' }}
                    />
                    <p>
                        Основанная в 1985 году в Испании, Iberchem выросла из местного производителя в глобального лидера в сфере ароматов. Сегодня компания представлена в более чем 120 странах.
                    </p>
                    <p>
                        Вдохновлённые природой Средиземноморья, основатели Iberchem стремились к созданию ароматов, сочетающих инновации и традиции. В 2020 году Iberchem стала частью Croda International.
                    </p>
                </motion.section>

                <motion.section className="product-showcase" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                    <h2>Продукты Iberchem</h2>
                    <div className="product-grid">
                        {[{
                            title: 'Парфюмерия',
                            image: "src/images/pages/iberchem/3.png",
                            description: 'Ароматы для парфюмерной продукции от нишевых до массовых брендов.',
                            features: ['Изысканные композиции', 'Стойкость и выразительность', 'Глобальное признание']
                        },
                        {
                            title: 'Средства гигиены',
                            image: "src/images/pages/iberchem/4.png",
                            description: 'Ароматы для шампуней, мыла, лосьонов и кремов.',
                            features: ['Безопасные формулы', 'Современный дизайн ароматов', 'Нежное воздействие']
                        },
                        {
                            title: 'Бытовая химия',
                            image: "src/images/pages/iberchem/5.png",
                            description: 'Парфюмерные композиции для моющих и чистящих средств.',
                            features: ['Свежесть и чистота', 'Стабильные формулы', 'Широкий ассортимент']
                        }].map((product, index) => (
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
                    <h2>Процесс производства</h2>
                    <LazyLoadImage
                        src="src/images/pages/iberchem/6.png"
                        alt="Производство Iberchem"
                        className="section-image"
                        effect="blur"
                        width="100%"
                        height="400px"
                        style={{ objectFit: 'cover', aspectRatio: '30/9' }}
                    />
                    <div className="process-steps">
                        <div className="step">
                            <h4>Исследования и Разработка</h4>
                            <p>Продвинутое исследование ароматов и разработка новых молекул для создания уникальных парфюмерных решений.</p>
                        </div>
                        <div className="step">
                            <h4>Производственный процесс</h4>
                            <p>Современные технологии и строгий контроль качества на каждом этапе производства, от концепта до упаковки.</p>
                        </div>
                        <div className="step">
                            <h4>Контроль качества</h4>
                            <p>Иберхем соблюдает высочайшие стандарты качества, гарантируя стабильность и безопасность каждой продукции.</p>
                        </div>
                    </div>
                </motion.section>

                <motion.section className="quality-commitment" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                    <h2>Устойчивое развитие</h2>
                    <LazyLoadImage
                        src="src/images/pages/iberchem/7.png"
                        alt="Экологичность Iberchem"
                        className="section-image"
                        effect="blur"
                        width="100%"
                        height="400px"
                        style={{ objectFit: 'cover', aspectRatio: '30/9' }}
                    />
                    <p>
                        Iberchem внедряет экологичные практики во все процессы, включая устойчивое производство, упаковку и поставки. Цель компании — углеродная нейтральность и забота о биоразнообразии.
                    </p>
                    <ul className="commitment-list">
                        <li>100% возобновляемая энергия</li>
                        <li>Устойчивое сырьё</li>
                        <li>Ответственные поставки</li>
                        <li>Экологичная упаковка</li>
                    </ul>
                </motion.section>

                <div className="brand-cta">
                    <ButtonJumpAnimation 
                        text={'Посмотреть продукты Iberchem'} 
                        onClick={() => window.location.href = '/search?term=Iberchem'}
                    />
                </div>
            </main>
        </div>
    );
};

export default IberchemPage;
