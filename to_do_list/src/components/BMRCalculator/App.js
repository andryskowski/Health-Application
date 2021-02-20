import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
// import {Provider} from 'react-redux';

import { useDispatch } from 'react-redux';

import {addBMRInfromations} from '../../actions/appActions';

function App({height = '1', weight= '1', BMR = '1'}) {
    const [heightt, setHeight] = useState(0);
    const [weightt, setWeight] = useState(0);
    const [bonus, setBonus] = useState(0);
    const [age, setAge] = useState(0);
    const [gender, setGender] = useState(false);
    const [cal, setCal] = useState(0);
    const [BMRD, setBRM] = useState(0);

    const BMRObject = {
        height: 10,
        weight: 12,
        BMR: 13
    }
    const dispatch = useDispatch();
    dispatch(addBMRInfromations(BMRObject));

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
        if (heightt !== 0) {
            //male
            console.log(weightt, heightt, age, bonus);
            if (gender) {
                const BMR = (10 * weightt + 6.25 * heightt - 5 * age - (-bonus + -5));
                setCal(BMR);
                localStorage.setItem('BMR', BMR);
            }//female
            else {
                const BMR = (10 * weightt + 6.25 * heightt - 5 * age - (161 - bonus));
                setCal(BMR);
                localStorage.setItem('BMR', BMR);
            }
        } 
    });



    return (
        // <Provider store={store}>
        <motion.div initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="App form-group">
            <h1>Calories calculator</h1>
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
        </motion.div>
        // {/* </Provider> */}
    );
}

export default App;