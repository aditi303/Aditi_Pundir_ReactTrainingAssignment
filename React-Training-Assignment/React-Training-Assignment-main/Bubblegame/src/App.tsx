import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [bubbles, setBubbles] = useState<string[]>([]);
  const [count, setCount] = useState(0);

 
  const addBubble = () => {
    const colors = ["yellow", "green", "blue"];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    setBubbles((prev) => [...prev, randomColor]);
  };

  
  useEffect(() => {
    
    const interval = setInterval(() => {
      addBubble();
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  
  const handleClick = (index: number) => {
    if (bubbles[index] === "yellow") {
      const newBubbles = [...bubbles];
      newBubbles[index] = "red"; 
      setBubbles(newBubbles);
      setCount((prev) => prev + 1); 
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      <h1>Random Colored Bubbles</h1>
      <p>Yellow bubbles clicked: {count}</p>

      <div style={{ display: "flex", flexWrap: "wrap", marginTop: "20px" }}>
        {bubbles.map((color, index) => (
          <div
            key={index}
            onClick={() => handleClick(index)}
            style={{
              width: "60px",
              height: "60px",
              borderRadius: "50%",
              backgroundColor: color,
              margin: "10px",
              cursor: "pointer",
            }}
          ></div>
        ))}
      </div>
    </div>
  );
}

export default App;