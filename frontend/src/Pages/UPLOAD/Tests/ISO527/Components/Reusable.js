import React, { useState } from 'react';
function Reusable({data}) {
    const [count, setCount] = useState(0);

    const handleIncrement = () => {
      setCount((prevCount) => prevCount + data);
    };
  
    return (
      <div>
        <p>Count: {count} :{data}times</p>
        <p onClick={handleIncrement}>Increment</p>
      </div>
    );
}

export default Reusable