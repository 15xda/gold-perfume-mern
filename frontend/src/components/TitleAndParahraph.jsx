import React from 'react'

const TitleAndParahraph = ({title, paragraph}) => {
  return (
    <div className='title-and-paragraph'>
        <h2>{title}</h2>
        <p>{paragraph}</p>
    </div>
  )
}

export default TitleAndParahraph