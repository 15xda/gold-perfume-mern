import React from 'react'

const About = () => {
  return (
    <div className="about-page">
      <div className="about-hero">
        <div className="about-hero-content">
          <h1>Our Story</h1>
          <p>Crafting Luxury Fragrances Since 1995</p>
        </div>
      </div>

      <div className="about-container">
        <section className="about-section">
          <h2>Who We Are</h2>
          <p>
            Gold Perfume is a luxury fragrance house dedicated to creating unique and memorable scents. 
            Our commitment to quality and innovation has made us a leader in the fragrance industry for over 25 years.
          </p>
        </section>

        <section className="about-section mission">
          <div className="mission-content">
            <h2>Our Mission</h2>
            <p>
              To create exceptional fragrances that inspire confidence and leave lasting impressions. 
              We believe in the power of scent to enhance life's moments and create memories.
            </p>
          </div>
          <div className="mission-stats">
            <div className="stat-item">
              <span className="stat-number">25+</span>
              <span className="stat-label">Years of Excellence</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">50+</span>
              <span className="stat-label">Unique Fragrances</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">100+</span>
              <span className="stat-label">Global Partners</span>
            </div>
          </div>
        </section>

        <section className="about-section values">
          <h2>Our Values</h2>
          <div className="values-grid">
            <div className="value-item">
              <span className="material-icons">diamond</span>
              <h3>Quality</h3>
              <p>Only the finest ingredients and craftsmanship</p>
            </div>
            <div className="value-item">
              <span className="material-icons">eco</span>
              <h3>Sustainability</h3>
              <p>Committed to environmental responsibility</p>
            </div>
            <div className="value-item">
              <span className="material-icons">psychology</span>
              <h3>Innovation</h3>
              <p>Pushing boundaries in fragrance creation</p>
            </div>
            <div className="value-item">
              <span className="material-icons">diversity_3</span>
              <h3>Community</h3>
              <p>Building lasting relationships</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default About
