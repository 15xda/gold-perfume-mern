import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import './HowToOrder.css';

const HowToOrder = () => {
  return (
    <div className="how-to-order-container">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="how-to-order-card"
      >
        <h1 className="page-title">How to Order</h1>

        <div className="step-section">
          <h2 className="step-title">
            <span className="step-number">1</span>
            Browse Our Products
          </h2>
          <div className="step-content">
            <p>Start by exploring our extensive collection of premium fragrances:</p>
            <ul className="step-list">
              <li>Use the search bar to find specific products</li>
              <li>Browse by categories or brands</li>
              <li>Read detailed product descriptions and reviews</li>
              <li>Add items to your favorites for later</li>
            </ul>
          </div>
        </div>

        <div className="step-section">
          <h2 className="step-title">
            <span className="step-number">2</span>
            Add to Cart
          </h2>
          <div className="step-content">
            <p>When you find a product you like:</p>
            <ul className="step-list">
              <li>Select your desired quantity</li>
              <li>Click "Add to Cart" or "Buy Now"</li>
              <li>Review your cart to ensure all items are correct</li>
              <li>You can modify quantities or remove items at any time</li>
            </ul>
          </div>
        </div>

        <div className="step-section">
          <h2 className="step-title">
            <span className="step-number">3</span>
            Checkout Process
          </h2>
          <div className="step-content">
            <p>Complete your purchase in a few simple steps:</p>
            <ul className="step-list">
              <li>Sign in to your account or create a new one</li>
              <li>Review your order summary</li>
              <li>Enter your shipping address</li>
              <li>Choose your preferred payment method</li>
              <li>Review and confirm your order</li>
            </ul>
          </div>
        </div>

        <div className="step-section">
          <h2 className="step-title">
            <span className="step-number">4</span>
            Order Confirmation
          </h2>
          <div className="step-content">
            <p>After placing your order:</p>
            <ul className="step-list">
              <li>You'll receive an order confirmation email</li>
              <li>Track your order status in your account dashboard</li>
              <li>Receive shipping updates via email</li>
              <li>Contact customer support if you need any assistance</li>
            </ul>
          </div>
        </div>

        <div className="note-section">
          <h3 className="note-title">Important Notes</h3>
          <div className="note-content">
            <p>• All prices include applicable taxes</p>
            <p>• We offer secure payment processing</p>
            <p>• Free shipping on orders over $100</p>
            <p>• Returns accepted within 30 days of delivery</p>
          </div>
        </div>

        <div className="contact-info">
          <p>Need help with your order?</p>
          <p>
            Contact our customer support team at{' '}
            <a href="mailto:support@goldparfume.com" className="contact-link">
              support@goldparfume.com
            </a>
          </p>
          <p>
            Or visit our{' '}
            <Link to="/contact" className="contact-link">
              Contact page
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default HowToOrder; 