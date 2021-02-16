import {useEffect, useState} from 'react';

function App() {
    const [height, setHeight] = useState(0);
    const [weight, setWeight] = useState(0);
    const [bonus, setBonus] = useState(0);
    const [age, setAge] = useState(0);
    const [gender, setGender] = useState(false);
    const [cal, setCal] = useState(0);
    function setHeightOn(e){
        setHeight(e.target.value);
    }
    function setWeightOn(e){
        setWeight(e.target.value);
    }
    function setAgeOn(e){
        setGender(e.target.value);
    }
    function setGenderOn(e){
        setGender(e.target.value);
    }
    function setBonusOn(e){
        setBonus(e.target.value);
    }

    useEffect(() => {
        if(height !==0) {
            if (gender) {
                setCal(10*weight+6.25*height-5*age-(-bonus+-5));
            }
            else {
                setCal(10*weight+6.25*height-5*age-(161-bonus));
            }
        } else {}
        if (cal>1000) {

        } else {

        }

        });

        return (
            <div className="App">
                <h1>Calories calculator</h1>
                height <input onChange={setHeightOn}></input>
                weight <input onChange={setWeightOn}></input>
                age <input onChange={setAgeOn}></input>
                male <input type="radio" onChange={setGenderOn}></input>
                burned today <input onChange={setBonusOn}></input>
                <h1>Your BMR is = {cal}</h1>
            </div>
        );
}

export default App;