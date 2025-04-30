import React from 'react';
import { motion } from 'framer-motion';
import ButtonJumpAnimation from '../../ButtonJumpAnimation';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
};

const LuziPage = () => {
    return (
        <div className="brand-container">
            <motion.section
                className="brand-head"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
            >
                <h1>LUZI Ароматы</h1>
                <p className="brand-subtitle">Швейцарское совершенство в парфюмерии с 1926 года</p>
                <p className="brand-intro">
                    LUZI предлагает искусство швейцарской парфюмерии — наследие мастерства, инноваций и устойчивости.
                </p>
                <LazyLoadImage
                    src="src/images/pages/luzi/1.png"
                    alt="Флаконы LUZI"
                    className="brand-hero-image"
                    effect="blur"
                    placeholderSrc="https://via.placeholder.com/600x400?text=Loading..."
                    width="100%"
                    height="400px"
                    style={{ objectFit: 'cover', aspectRatio:'30/9' }}
                />
            </motion.section>

            <main className="brand-content">
                <motion.section className="brand-story" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                    <h2>История бренда</h2>
                    <LazyLoadImage
                        src="src/images/pages/luzi/2.png"
                        alt="Историческая лаборатория LUZI"
                        className="section-image"
                        effect="blur"
                        placeholderSrc="https://via.placeholder.com/600x400?text=Loading..."
                        style={{ objectFit: 'cover', aspectRatio:'30/9' }}
                    />
                    <p>
                        LUZI была основана в 1926 году Германом Луци в Швейцарии и стала символом парфюмерного мастерства.
                        С 1952 года под управлением семьи Альтенбургер компания начала глобальную экспансию.
                    </p>
                    <p>
                        От Парижа до Малайзии LUZI строит креативные и производственные центры, сохраняя при этом швейцарское качество.
                        В 2022 году компания переехала в новый экологичный штаб в Дитликоне, Цюрих.
                    </p>
                </motion.section>

                <motion.section className="product-showcase" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                    <h2>Коллекции LUZI</h2>
                    <div className="product-grid">
                        {[{
                            title: 'LUZI Signature',
                            image: 'src/images/pages/luzi/3.png',
                            description: 'Элегантность вне времени и утончённые швейцарские композиции.',
                            features: ['Классические ароматические профили', 'Высококачественные ингредиенты', 'Долговечный эффект']
                        }, {
                            title: 'LUZI Naturals',
                            image: 'src/images/pages/luzi/4.png',
                            description: 'Чистота и устойчивость — 100% натуральные компоненты.',
                            features: ['Сертифицированные натуральные компоненты', 'Экологичное производство', 'Минимальное воздействие упаковки']
                        }, {
                            title: 'LUZI Exclusive',
                            image: 'src/images/pages/luzi/5.png',
                            description: 'Редкость и роскошь — ограниченные издания для ценителей.',
                            features: ['Редкие компоненты', 'Нумерованные коллекционные серии', 'Премиальное оформление']
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
                    <h2>Мастерство</h2>
                    <LazyLoadImage
                        src="src/images/pages/luzi/6.png"
                        alt="Лаборатория ароматов"
                        className="section-image"
                        effect="blur"
                        placeholderSrc="https://via.placeholder.com/600x400?text=Loading..."
                        style={{ objectFit: 'cover', aspectRatio:'30/9' }}
                    />
                    <div className="process-steps">
                        <div className="step">
                            <h4>Выбор ингредиентов</h4>
                            <p>Отбор производится по строгим критериям чистоты и происхождения.</p>
                        </div>
                        <div className="step">
                            <h4>Разработка</h4>
                            <p>Ароматы создаются парфюмерами в Швейцарии и Париже.</p>
                        </div>
                        <div className="step">
                            <h4>Контроль качества</h4>
                            <p>Каждый продукт проходит строгую проверку по швейцарским стандартам.</p>
                        </div>
                    </div>
                </motion.section>

                <motion.section className="quality-commitment" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                    <h2>Устойчивое развитие</h2>
                    <LazyLoadImage
                        src="src/images/pages/luzi/7.png"
                        alt="Экологичное производство"
                        className="section-image"
                        effect="blur"
                        placeholderSrc="https://via.placeholder.com/600x400?text=Loading..."
                        style={{ objectFit: 'cover', aspectRatio:'30/9' }}
                    />
                    <p>
                        LUZI — экологически ответственная марка. С июля 2022 года все ароматы производятся исключительно с использованием возобновляемой энергии.
                    </p>
                    <p>
                        Штаб-квартира LUZI — это пример устойчивой архитектуры и активной поддержки климатических инициатив.
                    </p>
                    <ul className="commitment-list">
                        <li>100% возобновляемая энергия в производстве</li>
                        <li>Этичные поставки с полной отслеживаемостью</li>
                        <li>Экодизайн упаковки</li>
                        <li>Поддержка инициатив по снижению выбросов CO₂</li>
                        <li>Швейцарское качество с глобальной ответственностью</li>
                    </ul>
                </motion.section>
                <div className="brand-cta">
                    <ButtonJumpAnimation 
                        text={'Посмотреть продукты Luzi'} 
                        onClick={() => window.location.href = '/search?term=Luzi'}
                    />
                </div>
            </main>
            
        </div>
    );
};

export default LuziPage;
