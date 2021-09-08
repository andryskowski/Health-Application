import React, { useEffect, useState } from 'react';
import './sass/App.sass';
import Addiction from './icons/workaholic.svg';
import Drugs from './icons/capsules.svg';
import Alcohol from './icons/beer.svg';
import Cigarettes from './icons/cigarette.svg';

const AddictionWidget = () => {
    // const BMRInformations = useSelector(store => store.BMRInformations);
    const [TASKS_TODAY, setTasksToday] = useState(0);

    const [ADDICTION_IMG, setAddictionImg] = useState(
        window.localStorage.getItem('ADDICTION_IMG') 
        ?
        window.localStorage.getItem('ADDICTION_IMG') :
        Addiction
    )
    
    const [ACTUAL_ADDICTION, setActualAddiction] = useState(
        window.localStorage.getItem('ACTUAL_ADDICTION') 
        ? 
        window.localStorage.getItem('ACTUAL_ADDICTION') :
        "addiction"
    );

    const [dayWithoutAddiction, setDayWithoutAddiction] = useState(0);

    function resetDayWithoutAddiction() {
        const TODAY_DATE = new Date();
        window.localStorage.setItem('LAST_DAY_ADDICTION', TODAY_DATE.getTime());
        setDayWithoutAddiction(0);
    }

    function changeDayWithoutAddiction() {
        const SECOND = 1000;
        const MINUTE = SECOND * 60;
        const HOUR = MINUTE * 60;
        const DAY = HOUR * 24;
        const TODAY_DAY = new Date().getTime();
        const FIRST_DAY = window.localStorage.getItem('LAST_DAY_ADDICTION');
        const COUNTER = Math.floor(Number(TODAY_DAY - FIRST_DAY) / DAY);
        setDayWithoutAddiction(COUNTER.toString());
    }
    
    function changeActualAddiction(e) {
        const ACTUAL_ADDICTION = e.target.value;
        window.localStorage.setItem('ACTUAL_ADDICTION', ACTUAL_ADDICTION);
        let LINK_IMG;
        if(e.target.value == "cigarettes")
        {
            LINK_IMG = Cigarettes;
        }
        else if(e.target.value == "alcohol")
        {
            LINK_IMG = Alcohol;
        }
        else if(e.target.value == "drugs")
        {
            LINK_IMG = Drugs;
        }
        else if(e.target.value == "addiction")
        {
            LINK_IMG = Addiction;
        }
        setAddictionImg(LINK_IMG);
        window.localStorage.setItem('ADDICTION_IMG', LINK_IMG);

        setActualAddiction(ACTUAL_ADDICTION);
    }

    function showListOfAddictions() {
        const LIST_ADDICTIONS = document.querySelector('.form-select-addiction');
        LIST_ADDICTIONS.style.display = "inline-block";
    }

    useEffect(() => {
        changeDayWithoutAddiction();
    });

    return (
            <div className="addiction-widget widget b-card">
                <h2 class="days-without-addiction">It's your {dayWithoutAddiction} day without {ACTUAL_ADDICTION}!</h2>
                <div class="buttons-add">
                    <button onClick={resetDayWithoutAddiction} className="btn btn-outline-secondary reset-btn">Reset</button>
                    <h5 className="change-btn" onClick={showListOfAddictions} className="btn btn-outline-secondary change-add-btn">Change</h5>
                        <select style={{display: "none"}} class="form-select form-select-addiction ml-3 addictions" aria-label="Default select example" onChange={changeActualAddiction}>
                            <option class="addictions" value="addiction">Addiction</option>
                            <option class="addictions" value="cigarettes">Cigarettes</option>
                            <option class="addictions" value="alcohol">Alcohol</option>
                            <option class="addictions" value="drugs">Drugs</option>
                        </select>
                </div>
                <img src={ADDICTION_IMG} width="100" height="100"></img>
            
            </div>
    );
};

export default AddictionWidget;

