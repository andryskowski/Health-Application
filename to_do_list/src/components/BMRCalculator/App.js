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
                const BMR = (10*weight+6.25*height-5*age-(-bonus+-5));
                setCal(BMR);
                localStorage.setItem('BMR', BMR);
            }
            else {
                const BMR = (10*weight+6.25*height-5*age-(161-bonus));
                setCal(BMR);
                localStorage.setItem('BMR', BMR);
            }
        } else {}
        if (cal>1000) {

        } else {

        }

        });

        return (
            <div className="App form-group">
                <h1>Calories calculator</h1>
                height <input onChange={setHeightOn} className="form-control"></input>
                weight <input onChange={setWeightOn} className="form-control"></input>
                age <input onChange={setAgeOn} className="form-control"></input>
                male <input type="radio" onChange={setGenderOn} className="form-check-label"></input>
                burned today <input onChange={setBonusOn} className="form-control"></input>
                <h1>Your BMR is = {cal}</h1>
            </div>
        );
}

export default App;