import { useEffect, useState } from 'react';
import './sass/App.sass';
import { motion } from 'framer-motion';

function App() {
    const [height, setHeight] = useState(0);
    const [weight, setWeight] = useState(0);
    const [bmi, setBMI] = useState(0);
    const [result, setResult] = useState(`healthy weight`);
    const [resultColor, setResultColor] = useState(`green`);

    function handleHeight(e) {
        let h = e.target.value;
        setHeight(h);
    }

    function handleWeight(e) {
        let w = e.target.value;
        setWeight(w);
    }

    function changeResult(bmiNumber) {
        if (bmiNumber > 30) {
            setResult(`Obese`);
            setResultColor('red');
        }
        else if (bmiNumber >= 25.0 && bmiNumber <= 29.9) {
            setResult(`Overweight`);
            setResultColor('orange');
        }
        else if (bmiNumber >= 18.5 && bmiNumber <= 24.9) {
            setResult(`Healthy Weight`);
            setResultColor('green');
        }
        else if (bmiNumber <= 18.5) {
            setResult(`Underweight`);
            setResultColor('blue');
        }
    }

    useEffect(() => {
        if (weight != 0 && height != 0) {
            let bmiNumber = (Number(weight) / (Number(height) * 2)) * 100;
            setBMI(bmiNumber.toFixed(1));
            localStorage.setItem('BMI', bmiNumber.toFixed(1));
            changeResult(bmiNumber);

        }
        else {
            setBMI(0);
        }
    }, [height, weight]);

    return (
        <motion.div initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}>
            <div className="App form-group " >
                <h1 className="h1-bmi">BMI Calculator</h1>
                <div class="form-group">
                    <label>Your height</label><input type="number" className="form-control w-25" onChange={handleHeight} ></input>
                    <label>Your weight</label><input type="number" className="form-control w-25" onChange={handleWeight} ></input>
                    <h2 className="mt-2">Your BMI is = {bmi}</h2>
                    {bmi != 0 ? <h4>It means <span style={{ color: `${resultColor}` }}>{result}</span>.</h4> : <h4> It means ...</h4>}
                    {/* {bmi != 0 ? <h4>It means <span style={{ color: `${resultColor}` }}>{result}</span>.</h4> : <h4> </h4>} */}
                    <div className="bmi-info">
                    <h2>What is the body mass index (BMI)?</h2>
                    <p >BMI takes into account natural variations in body shape, giving a healthy weight range for a particular height.
                    As well as measuring your BMI, healthcare professionals may take other factors into account when assessing if you're a healthy weight.0
                    Muscle is much denser than fat, so very muscular people, such as heavyweight boxers, weight trainers and athletes, may be a healthy weight even though their BMI is classed as obese.
                    Your ethnic group can also affect your risk of some health conditions. For example, adults of Asian origin may have a higher risk of health problems at BMI levels below 25.
                    You should not use BMI as a measure if you're pregnant. Get advice from your midwife or GP if you're concerned about your weight.</p>
                    </div>
                </div>

            </div>
        </motion.div>
    );

}

export default App;