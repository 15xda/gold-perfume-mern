import React, { useState } from 'react'

const Accordion = ({ items }) => {
  const [activeIndex, setActiveIndex] = useState(null)

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index)
  }

  return (
    <div className="accordion-container">
      {items.map((item, index) => (
        <div key={index} className="accordion-item">
          <button 
            className={`accordion-header ${activeIndex === index ? 'active' : ''}`}
            onClick={() => toggleAccordion(index)}
          >
            <span>{item.title}</span>
            <i className={`fa-solid ${activeIndex === index ? 'fa-minus' : 'fa-plus'}`}></i>
          </button>
          <div className={`accordion-content ${activeIndex === index ? 'active' : ''}`}>
            <div className="accordion-content-inner">
              {item.content}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Accordion 