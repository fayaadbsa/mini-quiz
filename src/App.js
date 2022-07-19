import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [start, setStart] = useState(false);
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);
  const [number, setNumber] = useState(1);
  const [score, setScore] = useState(0);

  useEffect(() => {
    fetch("https://opentdb.com/api.php?amount=10&type=boolean")
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setItems(result?.results);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  }, []);

  const handleAnswer = (ans) => {
    if (items?.[number]?.correct_answer === ans) setScore(score + 10);
    setNumber(number + 1);
  };

  const handleStart = () => {
    setStart(true);
  };

  return (
    <div className="App">
      <header className="App-header">
        {!start || !isLoaded ? (
          <div>
            <h1>Welcome to mini quiz</h1>
            <button
              style={{
                width: "400px",
                height: "200px",
                borderRadius: "20px",
                backgroundColor: "lightgreen",
                cursor: "pointer",
              }}
              onClick={() => handleStart()}
            >
              <h1>start</h1>
            </button>
          </div>
        ) : number > 10 ? (
          <h1>Your score is {score}</h1>
        ) : (
          <div>
            <h3>
              {number}. {items?.[number - 1]?.question}
            </h3>
            <div>
              <button
                style={{
                  width: "400px",
                  height: "200px",
                  borderRadius: "20px",
                  backgroundColor: "lightgreen",
                  cursor: "pointer",
                }}
                onClick={() => handleAnswer("True")}
              >
                <h1>True</h1>
              </button>
              <button
                style={{
                  width: "400px",
                  height: "200px",
                  borderRadius: "20px",
                  backgroundColor: "pink",
                  cursor: "pointer",
                }}
                onClick={() => handleAnswer("False")}
              >
                <h1>False</h1>
              </button>
            </div>
          </div>
        )}
      </header>
    </div>
  );
}

export default App;
