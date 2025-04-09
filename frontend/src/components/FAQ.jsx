import React from 'react'
import Accordion from './Accordion'
const FAQ = () => {
    const accordionItems = [
        {
          title: "Shipping Information",
          content: "We offer free shipping on all orders over $50. Delivery typically takes 3-5 business days."
        },
        {
          title: "Return Policy",
          content: "Returns are accepted within 30 days of purchase. Items must be unused and in original packaging."
        },
        {
          title: "Payment Methods",
          content: "We accept Visa, Mastercard, American Express, and PayPal. All transactions are secure and encrypted."
        },
        
      ];
  return (
    <div className='faq-container'>
        <h1>Frequently Asked Questions</h1>
        <div className='faq-items'>
            <Accordion items={accordionItems} />
        </div>
    </div>
  )
}

export default FAQ