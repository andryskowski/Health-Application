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

    function changeResult(bmi1) {
        if (bmi1 > 30) {
            setResult(`Obese`);
            setResultColor('red');       
        }
        else if (bmi1 >= 25.0 && bmi1 <= 29.9)
        {
            setResult(`Overweight`);
            setResultColor('orange');       
        }    
        else if (bmi1 >= 18.5 && bmi1 <= 24.9)
        {
            setResult(`Healthy Weight`);
            setResultColor('green');       
        }
        else if (bmi1 <= 18.5)
        {
            setResult(`Underweight`);
            setResultColor('blue');                 
        }
    }

    useEffect(() => {
        if (weight != 0 && height != 0) {
            let bmi1 = (Number(weight) / (Number(height) * 2)) * 100;
            setBMI(bmi1.toFixed(1));
            changeResult(bmi1);
            
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