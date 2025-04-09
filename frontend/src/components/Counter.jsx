import React, { useState } from 'react' 

const Counter = () => {
  const [count, setCount] = useState(1);
  return (
    <div className='counter'>
        <button onClick={() => {if(count > 1) {setCount(count - 1)}}}>
            <span>-</span>
        </button>
        <input type="text" value={count} onChange={(e) => setCount(e.target.value)} />
        <button onClick={() => setCount(count + 1)}>
            <span>+</span>
        </button>
    </div>
  )
}

export default Counter