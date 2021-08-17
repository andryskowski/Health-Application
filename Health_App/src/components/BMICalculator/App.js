import { useEffect, useState } from "react";
import "./sass/App.css";
import { motion } from "framer-motion";
import bikeImg from './img/indoor_bike.png';

function App() {
  const [height, setHeight] = useState(0);
  const [weight, setWeight] = useState(0);
  const [bmi, setBMI] = useState(0);
  const [result, setResult] = useState(`healthy weight`);
  const [resultColor, setResultColor] = useState(`green`);
  let message = "";

  function handleHeight(e) {
    if (e.target.value < 0) e.target.value = 0;
    setHeight(e.target.value);
  }

  function handleWeight(e) {
    if (e.target.value < 0) e.target.value = 0;
    setWeight(e.target.value);
  }

  function changeResult(bmiNumber) {
    if (bmiNumber > 30) {
      setResult(`Obese`);
      setResultColor("red");
    } else if (bmiNumber >= 25.0 && bmiNumber <= 29.9) {
      setResult(`Overweight`);
      setResultColor("orange");
    } else if (bmiNumber >= 18.5 && bmiNumber <= 24.9) {
      setResult(`Healthy Weight`);
      setResultColor("green");
    } else if (bmiNumber <= 18.5) {
      setResult(`Underweight`);
      setResultColor("blue");
    }
  }

  useEffect(() => {
    if (weight != 0 && height != 0) {
      let bmiNumber = (Number(weight) / (Number(height) * 2)) * 100;
      setBMI(bmiNumber.toFixed(1));
      localStorage.setItem("BMI", bmiNumber.toFixed(1));
      changeResult(bmiNumber);
    } else {
      setBMI(0);
    }
  }, [height, weight]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="App form-group ">
        <h1 className="header">BMI</h1>
        <h1 className="h1-bmi">BMI Calculator</h1>
        <div class="form-group">
          <div class="input-row">
            <div class="input-container">
              <label>Your height:</label>
              <input type="number" className="form-control w-50" onChange={handleHeight}></input>
              <label>Your weight:</label>
              <input type="number" className="form-control w-50" onChange={handleWeight}></input>
            </div>
            <div>
              <img class="image" src={bikeImg}></img>
            </div>
          </div>
          <h4 className="mt-1">Your BMI is: {bmi}</h4>
          {bmi != 0 ? (
            <h4>
              It means: <span class="itmeans" style={{ color: `${resultColor}` }}>{result}</span>
            </h4>
          ) : (
            <h4> It means ...</h4>
          )}
          {/* {bmi != 0 ? <h4>It means <span style={{ color: `${resultColor}` }}>{result}</span>.</h4> : <h4> </h4>} */}
          <div className="bmi-info">
            <h2>What is the body mass index (BMI)?</h2>
            <p>
              BMI takes into account natural variations in body shape, giving a
              healthy weight range for a particular height. As well as measuring
              your BMI, healthcare professionals may take other factors into
              account when assessing if you're a healthy weight. Muscle is much
              denser than fat, so very muscular people, such as heavyweight
              boxers, weight trainers and athletes, may be a healthy weight even
              though their BMI is classed as obese. Your ethnic group can also
              affect your risk of some health conditions. For example, adults of
              Asian origin may have a higher risk of health problems at BMI
              levels below 25. You should not use BMI as a measure if you're
              pregnant. Get advice from your midwife or GP if you're concerned
              about your weight.
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default App;
