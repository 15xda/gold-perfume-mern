import React from 'react';
import { motion } from 'framer-motion';
import ButtonJumpAnimation from '../../ButtonJumpAnimation';

const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
};

const FirmenichPage = () => {
    return (
        <div className="brand-container">
            <motion.section
                className="brand-head"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
            >
                <h1>Firmenich Ароматы</h1>
                <p className="brand-subtitle">Швейцарская парфюмерия с 1895 года</p>
                <p className="brand-intro">
                    Firmenich — это швейцарская компания, основанная в 1895 году в Женеве. Сегодня, объединившись с DSM, мы продолжаем создавать инновационные ароматы и вкусы, сохраняя традиции качества и инноваций.
                </p>
                <img
                    src="https://fraterworks.com/cdn/shop/collections/firmeniching.png?v=1703153745"
                    alt="Флаконы Firmenich"
                    className="brand-hero-image"
                    style={{ width: '100%', height: '400px', objectFit: 'cover' }}
                />
            </motion.section>

            <main className="brand-content">
                <motion.section className="brand-story" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                    <h2>История бренда</h2>
                    <img
                        src="https://mag.bynez.com/wp-content/uploads/2020/11/25th-Anniversary-1.jpg"
                        alt="История Firmenich"
                        className="section-image"
                        style={{ width: '100%', height: '400px', objectFit: 'cover' }}
                    />
                    <p>
                        Firmenich была основана в 1895 году в Женеве, Швейцария, как Chuit & Naef химиком Филиппом Шуитом и бизнесменом Мартином Наефом. Фред Фирмениш присоединился к компании в 1900 году и позже стал основным партнером, после чего компания была переименована в Firmenich SA.
                    </p>
                    <p>
                        В 1939 году директор по исследованиям и разработкам Лавослав Ружичка получил Нобелевскую премию по химии за работу над полиметиленами и высшими терпенами, включая первый химический синтез мужских половых гормонов.
                    </p>
                    <p>
                        В 2023 году Firmenich объединилась с голландской компанией DSM, создав новую компанию dsm-firmenich, которая продолжает традиции инноваций и качества обеих компаний.
                    </p>
                </motion.section>

                <motion.section className="product-showcase" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                    <h2>Коллекции Firmenich</h2>
                    <div className="product-grid">
                        {[
                            {
                                title: 'Fine Fragrance',
                                image: 'https://res.cloudinary.com/cross-systems/image/upload/c_fill,f_auto,g_auto,q_auto,f_auto,q_auto/firmenich.com/prod/sites/default/files/styles/800x500/public/creations_1014.jpg?itok=3AfRSfSN',
                                description: 'Эксклюзивные ароматы для премиальных парфюмерных брендов.',
                                features: ['Высококачественные ингредиенты', 'Инновационные композиции', 'Уникальные аккорды']
                            },
                            {
                                title: 'Consumer Brands',
                                image: 'https://www.dsm-firmenich.com/en/businesses/perfumery-beauty/ingredients/_jcr_content/root/responsivegrid/pscontentmediatext/image.coreimg.jpeg',
                                description: 'Ароматы для массового рынка, включая косметику и средства личной гигиены.',
                                features: ['Безопасные формулы', 'Широкий ассортимент', 'Стабильное качество']
                            },
                            {
                                title: 'Flavors',
                                image: 'https://media.licdn.com/dms/image/v2/C5612AQHeAfaxZZmD4w/article-cover_image-shrink_600_2000/article-cover_image-shrink_600_2000/0/1631260996630?e=2147483647&v=beta&t=K0qdS5tfjuUJ9QLJSdovfKpQ-GF6-OiGLEVzBnREln0',
                                description: 'Вкусовые добавки для пищевой промышленности.',
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
                        src="https://images.axios.com/nAbdUEensRjo3eQpGdlWBQeJj2s=/0x0:5190x2919/1920x1080/2022/06/01/1654095541535.jpg"
                        alt="Лаборатория Firmenich"
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
                            <p>Строгий контроль на каждом этапе производства, соответствующий швейцарским стандартам качества.</p>
                        </div>
                    </div>
                </motion.section>

                <motion.section className="quality-commitment" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                    <h2>Устойчивое развитие</h2>
                    <img
                        src="https://www.nextinbeautymag.com/uploads/s1/24/23/2/nib-articulosentradas-a-retocar-2023-05-11t154310-029.png"
                        alt="Экологичное производство Firmenich"
                        className="section-image"
                        style={{ width: '100%', height: '400px', objectFit: 'cover' }}
                    />
                    <p>
                        Firmenich активно работает над снижением воздействия на окружающую среду и внедряет устойчивые практики во все аспекты своей деятельности.
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
                    text={'Посмотреть продукты Firmenich'} 
                    onClick={() => window.location.href = '/search?term=Firmenich'}
                />
                </div>
            </main>
            
        </div>
    );
};

export default FirmenichPage; 