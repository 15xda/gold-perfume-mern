import React from 'react'

const FourBlockContent = () => {
  return (
    <div className='four-block-content'>
        <div className='four-block-content-text'>
            <h1>Ароматы, как у оригинала.</h1>
            <p>Наши парфюмерные масла точно передают дух оригинала.</p>
        </div>
        <div className='four-block-content-image'>
            <img src='/images/stock/some-perfumes.png' alt='Original perfume' />
        </div>
        <div className='four-block-content-image'>
            <img src='/images/stock/mixing-perfume.png' alt='Perfume oil' />
        </div>
        <div className='four-block-content-text'>
            <h1>Точно так же, но доступнее.</h1>
            <p>Наши масла сохраняют стойкость и качество, как у оригинала.</p>
        </div>
    </div>
  )
}

export default FourBlockContent
