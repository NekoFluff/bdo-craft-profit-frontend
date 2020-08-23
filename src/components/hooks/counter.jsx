import React, { useState, Fragment, useEffect } from 'react';

const Counter = (props) => {
  const [count, setCount] = useState(0);
  const [name, setName] = useState('')

  return ( 
    <Fragment>
      <input type="text" onChange={e => setName(e.target.value)}></input>
      <div>
      {name} Counter: {count}
      </div>
      <button onClick={() => setCount(count + 1)}>Increase</button>
    </Fragment>
   );
}
 
export default Counter;