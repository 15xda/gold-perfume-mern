import React, { useState } from 'react'
import { useSelector } from 'react-redux';

const Contact = () => {
  const userInfo = useSelector(state => state.user.data)
  const [formData, setFormData] = useState({
    name: userInfo ? userInfo.name : '',
    email: userInfo ? userInfo.email : '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add contact form submission logic here
    console.log('Contact form submitted:', formData);
  };

  return (
    <div className="contact-page">
      <div className="contact-hero">
        <div className="contact-hero-content">
          <h1>Get in Touch</h1>
          <p>We'd love to hear from you {formData.name}</p>
        </div>
      </div>

      <div className="contact-container">
        <div className="contact-info">
          <div className="info-section">
            <span className="material-icons">location_on</span>
            <h3>Visit Us</h3>
            <p>123 Perfume Street</p>
            <p>Luxury District, NY 10001</p>
          </div>
          <div className="info-section">
            <span className="material-icons">call</span>
            <h3>Call Us</h3>
            <p>+1 (555) 123-4567</p>
            <p>Mon-Fri: 9am - 6pm</p>
          </div>
          <div className="info-section">
            <span className="material-icons">email</span>
            <h3>Email Us</h3>
            <p>info@goldperfume.com</p>
            <p>support@goldperfume.com</p>
          </div>
          <div className="info-section">
            <span className="material-icons">schedule</span>
            <h3>Opening Hours</h3>
            <p>Monday - Saturday: 10am - 8pm</p>
            <p>Sunday: 11am - 6pm</p>
          </div>
        </div>

        <div className="contact-form-container">
          <h2>Send us a Message</h2>
          <form onSubmit={handleSubmit} className="contact-form">
            <div className="form-group">
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                name="subject"
                placeholder="Subject"
                value={formData.subject}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <textarea
                name="message"
                placeholder="Your Message"
                value={formData.message}
                onChange={handleChange}
                required
                rows="6"
              ></textarea>
            </div>
            <button type="submit" className="submit-button">Send Message</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Contact 