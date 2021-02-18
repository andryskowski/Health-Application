import { useEffect, useState } from 'react';
import './sass/App.sass';

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
        else if (bmiNumber >= 25.0 && bmiNumber <= 29.9)
        {
            setResult(`Overweight`);
            setResultColor('orange');       
        }    
        else if (bmiNumber >= 18.5 && bmiNumber <= 24.9)
        {
            setResult(`Healthy Weight`);
            setResultColor('green');       
        }
        else if (bmiNumber <= 18.5)
        {
            setResult(`Underweight`);
            setResultColor('blue');                 
        }
    }

    useEffect(() => {
        if (weight != 0 && height != 0) {
            let bmiNumber = (Number(weight) / (Number(height) * 2)) * 100;
            setBMI(bmiNumber.toFixed(1));
            changeResult(bmiNumber);
            
            console.log(typeof bmi);
            
        }
        else {
            setBMI(0);
        }
    }, [height, weight]);

    return (
        <div className="App" >
            <h1>BMI Calculator</h1>
            <div class="form-group">
                <label>Your height</label><input type="number" className="form-control w-75" onChange={handleHeight} ></input>
                <label>Your weight</label><input type="number" className="form-control w-75" onChange={handleWeight} ></input>
                <h2 className="mt-2">Your BMI is = {bmi}</h2>
                {console.log(bmi)}
                {bmi != 0 ? <h4>It means <span style={{ color: `${resultColor}`}}>{result}</span>.</h4> : <h4> </h4>}
            </div>

        </div>
    );

}

export default App;