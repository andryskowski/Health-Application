import React, { useEffect, useState } from 'react';
import './sass/App.sass';

const AddictionWidget = () => {
    // const BMRInformations = useSelector(store => store.BMRInformations);
    const [TASKS_TODAY, setTasksToday] = useState(0);

    const [ADDICTION_IMG, setAddictionImg] = useState(
        window.localStorage.getItem('ADDICTION_IMG') ?
        window.localStorage.getItem('ADDICTION_IMG') :
        "https://www.flaticon.com/svg/vstatic/svg/1685/1685853.svg?token=exp=1616529380~hmac=7a9c266abddf95432829fff3ba95c44d"
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
        const TODAY_DAY = new Date().getTime();
        const FIRST_DAY = window.localStorage.getItem('LAST_DAY_ADDICTION');
        const COUNTER = Math.floor(FIRST_DAY / TODAY_DAY);
        setDayWithoutAddiction(COUNTER.toString());
    }
    
    function changeActualAddiction(e) {
        const ACTUAL_ADDICTION = e.target.value;
        window.localStorage.setItem('ACTUAL_ADDICTION', ACTUAL_ADDICTION);
        let LINK_IMG;
        if(e.target.value == "cigarettes")
        {
            LINK_IMG = "https://www.flaticon.com/svg/vstatic/svg/1685/1685839.svg?token=exp=1616529803~hmac=276594dcd05b6082fa00cc73a6cfe275";
        }
        else if(e.target.value == "alcohol")
        {
            LINK_IMG = "https://www.flaticon.com/svg/vstatic/svg/1685/1685837.svg?token=exp=1616529760~hmac=15c5ef9af9bfea4e4f80a568ffccfe5a";
        }
        else if(e.target.value == "drugs")
        {
            LINK_IMG = "https://www.flaticon.com/svg/vstatic/svg/1685/1685841.svg?token=exp=1616529779~hmac=3a3747f6847ca9ed7fd0e56aab848f98";
        }
        setAddictionImg(LINK_IMG);
        window.localStorage.setItem('ADDICTION_IMG', LINK_IMG);

        setActualAddiction(ACTUAL_ADDICTION);
    }

    function showListOfAddictions() {
        const LIST_ADDICTIONS = document.querySelector('.form-select-addiction');
        LIST_ADDICTIONS.style.display = "inline-block";
    }

    return (
            <div className="addiction-widget widget">
            <h2>It's your {dayWithoutAddiction} day without {ACTUAL_ADDICTION}!</h2>
            <button onClick={resetDayWithoutAddiction} className="btn btn-outline-secondary">Reset</button>
            <h5 className="change-btn" onClick={showListOfAddictions}>Change</h5>
                <select style={{display: "none"}} class="form-select form-select-addiction ml-2" aria-label="Default select example" onChange={changeActualAddiction}>
                    <option selected>addiction</option>
                    <option value="cigarettes">cigarettes</option>
                    <option value="alcohol">alcohol</option>
                    <option value="drugs">drugs</option>
                </select>
            <img src={ADDICTION_IMG} width="100" height="100"></img>
            </div>
    );
};

export default AddictionWidget;

