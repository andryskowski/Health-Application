import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useDispatch } from 'react-redux';
import './sass/App.sass';
import {addBMRInformation} from '../../actions/appActions';

import store from '../../store/store';
import { useSelector } from 'react-redux';

function App() {
    const [height, setHeight] = useState(0);
    const [weight, setWeight] = useState(0);
    const [bonus, setBonus] = useState(0);
    const [age, setAge] = useState(0);
    const [gender, setGender] = useState(false);
    const [cal, setCal] = useState(0);

    const [BMRInfo, setBMRInfo] = useState(0);
    const BMRInformations = useSelector(store => store.BMRInformations);
    const bmrbmr = JSON.stringify(BMRInformations);
    

    const BMRObject = {
        height: 10,
        weight: 12,
        BMR: 13
    }

    function setHeightOn(e) {
        setHeight(e.target.value);
    }
    function setWeightOn(e) {
        setWeight(e.target.value);
    }
    function setAgeOn(e) {
        setAge(e.target.value);
    }
    function setGenderOn(e) {
        console.log(gender, e.target.value, e.target.checked);
        setGender(e.target.checked);
    }
    function setBonusOn(e) {
        setBonus(e.target.value);
    }

    useEffect(() => {
        if (height !== 0) {
            //male
            console.log(weight, height, age, bonus);
            if (gender) {
                const BMR = (10 * weight + 6.25 * height - 5 * age - (-bonus + -5));
                setCal(BMR);
                localStorage.setItem('BMR', BMR);
            }//female
            else {
                const BMR = (10 * weight + 6.25 * height - 5 * age - (161 - bonus));
                setCal(BMR);
                localStorage.setItem('BMR', BMR);
            }
        } 
    });

    const dispatch = useDispatch();
    
  const handleOnSubmit = event => {
    const actualHeight = Number(height);
    const actualWeight = Number(weight);
    const actualBMR = cal;

    const BMRObject = {
        height: actualHeight,
        weight: actualWeight,
        BMR: actualBMR
    };

    dispatch(addBMRInformation(BMRObject));

    console.log(BMRInformations);
  }

  

    return (
        // <Provider store={store}>
        <motion.div initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="App form-group">
            <h1 className="h1-bmi">Calories calculator</h1>
                height <input onChange={setHeightOn} className="form-control w-75"></input>
                weight <input onChange={setWeightOn} className="form-control w-75"></input>
                age <input onChange={setAgeOn} className="form-control w-75"></input>
                 
                <label htmlFor="bonus">burned today</label>
                <input id="bonus" onChange={setBonusOn} className="form-control w-75"></input>
                
                <div className="form-inline">
                <input id="checkbox" type="checkbox" onChange={setGenderOn} className="form-check-label"></input>
                <label htmlFor="checkbox">{gender ? `male` : `female` }</label>
                </div>

            <h1>Your BMR is = {cal}</h1>
            {/* <button type="submit" onClick={handleOnSubmit}>SUBMIT //I am testing here sth</button> */}
            {/* <div>{bmrbmr}</div> */}
            <div className="bmr-info">
                    <h2>What is the Basal Metabolic Rate?(BMR)?</h2>
                    <p>Basal metabolic rate (BMR) is the total number of calories that your body needs to perform basic, life-sustaining functions. These basal functions include circulation, breathing, cell production, nutrient processing, protein synthesis, and ion transport. You can calculate the basal metabolic rate using a mathematical formula. </p>
            </div>

        </motion.div>
        // {/* </Provider> */}
    );
}

export default App;