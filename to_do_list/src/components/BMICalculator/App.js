import {useEffect, useState} from 'react';
import './sass/App.sass';

function App() {
    const [height, setHeight] = useState(0);
    const [weight, setWeight] = useState(0);
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
        <p>Height</p><input type="number" onChange={handleHeight}></input>
        <p>weight</p><input type="number" onChange={handleWeight}></input>
        <h2>BMI: {bmi}</h2>
    </div>
);

}

export default App;