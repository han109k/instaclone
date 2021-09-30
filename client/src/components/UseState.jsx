import React, { useState } from "react";

const UseState = () => {
  const example = 5;
  return <Properties example={example}/>
}

function Properties(props) {
  console.log(props);
  const [counter, setCounter] = useState(0);
  const increment = () => {
    setCounter((prevState) => {
      return prevState++;
    });
  };
  const reset = () => {
    setCounter(0);
  };
  return (
    <div className="mx-auto mt-5">
      <h2>Counter: {counter}</h2>
      <button className="btn mx-5" onClick={() => setCounter(counter + 1)}>
        Increment
      </button>
      <button className="bg-yellow-500 py-2 px-4 rounded-lg mx-5" onClick={() => setCounter(counter - 1)}>Decrease</button>
      <button className="bg-red-500 py-2 px-4 rounded-lg mx-5" onClick={reset}>
        Reset
      </button>
    </div>
  );
}

export default UseState;
