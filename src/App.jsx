import "./App.css";
import { memo, useEffect, useMemo } from "react";
import { useState } from "react";

const url =
  "https://www.randomnumberapi.com/api/v1.0/random?min=100&max=10000&count=100";

function NumbersList(data) {
  const displayNumbers = data.numbers?.map((n, i) => {
    return <li key={i}>{n}</li>;
  });

  console.log("render -> numbers");

  return (
    <div className="numbers-container">
      <ul>{displayNumbers}</ul>
    </div>
  );
}

const OptimizedList = memo(NumbersList);

function App() {
  const [numbers, setNumbers] = useState([]);
  const [random, setRandom] = useState(false);
  const [dark, setDark] = useState(false);

  const getNumbers = async () => {
    const response = await fetch(url);
    const jsonData = await response.json();
    setNumbers(jsonData);
  };

  useEffect(() => {
    getNumbers();
  }, [random]);

  const total = useMemo(() => {
    return numbers.reduce((acc, curr) => (acc += curr), 0);
  }, [numbers]);

  const randomFn = () => {
    setRandom(!random);
  };

  const theme = () => {
    setDark(!dark);
  };

  function Buttons() {
    console.log("render -> buttons");

    const formattedNumber = total.toLocaleString("en-US");

    return (
      <>
        <div>
          <h3>Click some button</h3>
        </div>
        <div className="options-container">
          <button type="button" onClick={() => randomFn()}>
            Random numbers
          </button>
          <button type="button" onClick={() => theme()}>
            {dark ? "Light" : "Dark"}
          </button>
        </div>
        <div>
          <h3>Result = {formattedNumber}</h3>
        </div>
      </>
    );
  }

  return (
    <>
      {
        <div className={`main-container ${dark && `dark`}`}>
          <Buttons />
          <OptimizedList numbers={numbers} />
        </div>
      }
    </>
  );
}

export default App;
