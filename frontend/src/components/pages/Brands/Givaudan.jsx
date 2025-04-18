import React from 'react';
import { motion } from 'framer-motion';
import ButtonJumpAnimation from '../../ButtonJumpAnimation';

const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
};

const GivaudanPage = () => {
    return (
        <div className="brand-container">
            <motion.header
                className="brand-head"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
            >
                <h1>Givaudan</h1>
                <p className="brand-subtitle">Мировой лидер в области ароматов с 1895 года</p>
                <p className="brand-intro">
                    Givaudan — это компания, которая соединяет науку с искусством для создания лучших ароматов и вкусов.
                </p>
                <img
                    src="https://www.arquimaster.com.ar/web/wp-content/uploads/2019/04/oficinas_givaudan5.jpg"
                    alt="Штаб-квартира Givaudan"
                    className="brand-hero-image"
                    style={{ width: '100%', height: '400px', objectFit: 'cover' }}
                />
            </motion.header>

            <main className="brand-content">
                <motion.section className="brand-story" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                    <h2>Наследие</h2>
                    <img
                        src="https://i.ytimg.com/vi/SBwShXc4T5s/maxresdefault.jpg"
                        alt="Историческое здание Givaudan"
                        className="section-image"
                        style={{ width: '100%', height: '400px', objectFit: 'cover' }}
                    />
                    <p>
                        Givaudan была основана в 1895 году в Цюрихе и с тех пор стала крупнейшей в мире компанией в области ароматов и вкусов. Она начала свою историю с инновационных молекул и с тех пор создала глобальное наследие творчества и инноваций.
                    </p>
                    <p>
                        Сегодня Givaudan работает более чем в 100 странах и создает сенсорные переживания, которые обогащают повседневную жизнь миллиардов людей по всему миру.
                    </p>
                </motion.section>

                <motion.section className="product-showcase" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                    <h2>Экспертиза</h2>
                    <div className="product-grid">
                        {[
                            {
                                title: 'Изысканные ароматы',
                                image: 'https://cdn.fifi.ru/news/origin/krupnejshij-proizvoditel-parfyumerii-givaudan-obnovlyaet-oficialnyj-sajt-2.jpg',
                                description: 'Компания создает уникальные ароматы для ведущих мировых брендов люксовой продукции.',
                                features: ['Инновационная молекулярная технология', 'Индивидуальные ароматы', 'Партнерства с люксовыми брендами']
                            },
                            {
                                title: 'Потребительские товары',
                                image: 'https://theblueprint.ru/upload/8040/b5b50bdc1de0c36cdfda00c6c462199d.jpg',
                                description: 'Инновационные ароматы для различных потребительских товаров.',
                                features: ['Товары для дома и личной гигиены', 'Ароматы для тканей и воздуха', 'Устойчивые решения']
                            },
                            {
                                title: 'Активная красота',
                                image: 'https://cloud.jpnn.com/photo/arsip/normal/2024/06/21/suasana-peluncuran-situs-web-givaudanperfumeid-foto-dokument-sgkl.jpg',
                                description: 'Продвинутые ингредиенты для косметики и личной гигиены.',
                                features: ['Инновационные активные компоненты', 'Натуральные ингредиенты', 'Научные решения']
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
                    <h2>Инновации</h2>
                    <img
                        src="https://images.neventum.com/photos/2021/39/1400/60225b8a89a34-givaudanptinptcosmepticspt1pt2019pt1pt1920x1178.jpg"
                        alt="Исследовательская лаборатория"
                        className="section-image"
                        style={{ width: '100%', height: '400px', objectFit: 'cover' }}
                    />
                    <div className="process-steps">
                        <div className="step">
                            <h4>Исследования</h4>
                            <p>Передовые научные разработки и молекулярные инновации.</p>
                        </div>
                        <div className="step">
                            <h4>Создание</h4>
                            <p>Творческий подход мастеров парфюмерии со всего мира.</p>
                        </div>
                        <div className="step">
                            <h4>Производство</h4>
                            <p>Современные производственные мощности с мировыми стандартами качества.</p>
                        </div>
                    </div>
                </motion.section>

                <motion.section className="quality-commitment" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                    <h2>Стратегия устойчивого развития</h2>
                    <img
                        src="https://aromo.ru/upload/iblock/c58/BB_ARTFULLY-79-stock.adobe_.com_173731674.jpeg"
                        alt="Устойчивые практики"
                        className="section-image"
                        style={{ width: '100%', height: '300px', objectFit: 'cover' }}
                    />
                    <p>
                        Givaudan лидирует в отрасли по устойчивому развитию, стремясь стать климатически позитивной компанией до 2050 года.
                    </p>
                    <p>
                        Компания использует ответственные подходы к поставкам, инновационные технологии и охрану окружающей среды.
                    </p>
                    <ul className="commitment-list">
                        <li>Углеродно-нейтральные операции к 2040 году</li>
                        <li>Ответственные практики снабжения</li>
                        <li>Рациональное использование водных ресурсов</li>
                        <li>Защита биоразнообразия</li>
                        <li>Инициативы по цикличной экономике</li>
                    </ul>
                </motion.section>
                <div className="brand-cta">
                    <ButtonJumpAnimation 
                        text={'Посмотреть продукты Givaudan'} 
                        onClick={() => window.location.href = '/search?term=Givaudan'}
                    />
                </div>
            </main>
            
        </div>
    );
};

export default GivaudanPage;
