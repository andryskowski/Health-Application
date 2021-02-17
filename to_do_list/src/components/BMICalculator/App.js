import {useEffect, useState} from 'react';
import './sass/App.sass';

function App() {
    const [height, setHeight] = useState();
    const [weight, setWeight] = useState();
    const [bmi, setBMI]=useState(0);


function handleHeight(e){
    let h = e.target.value;
    setHeight(h);
}

function handleWeight(e){
    let w =  e.target.value;
    setWeight(w);
}

useEffect(() => {
    let bmi1 = (weight/(height*2))*100;
    setBMI(bmi1.toFixed(2));
}, [height, weight]);

return (
    <div className="App" >
        <h1>BMI Calculator</h1>
        <div class="form-group">
        <label>Your height</label><input type="number" className="form-control w-75" onChange={handleHeight} ></input>
        <label>Your weight</label><input type="number" className="form-control w-75" onChange={handleWeight} ></input>
        <h2 className="mt-2">Your BMI is = {bmi}</h2>
        </div>
        
    </div>
);

}

export default App;