import { useState } from "react";

export default function App() {
  const [count, setCount] = useState(0);

  //increasing state by 1 on clicking
  return (
    <div>
      <h2>Count: {count}</h2>
      <button onClick={() => setCount(count + 1)}>
        Increase Count
      </button>
    </div>
  );
}