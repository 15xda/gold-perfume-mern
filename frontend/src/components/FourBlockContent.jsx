import React from 'react'

const FourBlockContent = () => {
  return (
    <div className='four-block-content'>
       <div className='four-block-content-text'>
            <h1>Ароматы, которые впечатляют.</h1>
            <p>Созданы ведущими европейскими производителями парфюмерных масел.</p>
        </div>
        <div className='four-block-content-image'>
            <img src='/images/stock/some-perfumes.png' alt='Original perfume' />
        </div>
        <div className='four-block-content-image'>
            <img src='/images/stock/mixing-perfume.png' alt='Perfume oil' />
        </div>
        <div className='four-block-content-text'>
            <h1>Роскошь без компромиссов.</h1>
            <p>Стойкие, насыщенные композиции премиального качества — по разумной цене.</p>
        </div>

    </div>
  )
}

export default FourBlockContent
