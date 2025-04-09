import React from 'react';
import { motion } from 'framer-motion';

const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
};

const LuziPage = () => {
    return (
        <div className="brand-container">
            <motion.section
                className="brand-header"
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
                <img
                    src="https://floralodor.ru/images/blog/MadeinSwitzerland_1920x600.jpg?1712912923652"
                    alt="Флаконы LUZI"
                    className="brand-hero-image"
                    style={{ width: '100%', height: '400px', objectFit: 'cover' }}
                />
            </motion.section>

            <main className="brand-content">
                <motion.section className="brand-story" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                    <h2>История бренда</h2>
                    <img
                        src="https://static.wixstatic.com/media/aa660f_57d76649e0914acc95f9e686820b3fc5~mv2.png"
                        alt="Историческая лаборатория LUZI"
                        className="section-image"
                        style={{ width: '100%', height: '400px', objectFit: 'cover' }}
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
                        {[
                            {
                                title: 'LUZI Signature',
                                image: 'https://static.wixstatic.com/media/aa660f_1212865e3f034f6ca5024c750a9df886~mv2.jpg',
                                description: 'Элегантность вне времени и утончённые швейцарские композиции.',
                                features: ['Классические ароматические профили', 'Высококачественные ингредиенты', 'Долговечный эффект']
                            },
                            {
                                title: 'LUZI Naturals',
                                image: 'https://static.wixstatic.com/media/aa660f_1dfa52c0783446d99589b3bf4b7df7f5~mv2.jpg',
                                description: 'Чистота и устойчивость — 100% натуральные компоненты.',
                                features: ['Сертифицированные натуральные компоненты', 'Экологичное производство', 'Минимальное воздействие упаковки']
                            },
                            {
                                title: 'LUZI Exclusive',
                                image: 'https://static.wixstatic.com/media/aa660f_08c2f79564f74f1594de96c2c588db88~mv2.jpg',
                                description: 'Редкость и роскошь — ограниченные издания для ценителей.',
                                features: ['Редкие компоненты', 'Нумерованные коллекционные серии', 'Премиальное оформление']
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
                        src="https://sc04.alicdn.com/kf/Hce00d3b24bfe408eb521b86fde455540L/268734895/Hce00d3b24bfe408eb521b86fde455540L.png"
                        alt="Лаборатория ароматов"
                        className="section-image"
                        style={{ width: '100%', height: '400px', objectFit: 'cover' }}
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
                    <img
                        src="https://static.wixstatic.com/media/11062b_6ec38afbe78f4fbdbdb799c40dd5993ff000.jpg"
                        alt="Экологичное производство"
                        className="section-image"
                        style={{ width: '100%', height: '400px', objectFit: 'cover' }}
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
            </main>
        </div>
    );
};

export default LuziPage;
