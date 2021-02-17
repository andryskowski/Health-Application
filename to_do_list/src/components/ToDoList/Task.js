import React from 'react';

const Task = props => {
    const {text,date, id, calories} = props.task;
    return (
        <div>
            <p>
                {props.task.text} / 
                {props.task.date} / 
                {props.task.calories} {'calories'}
                
                <button className="x-button" onClick={() => props.remove(id)}>X</button>
                <button className="checked-button"onClick={() => props.change(id)}>&#10003;</button>
            </p>
        </div>
    );
};


export default Task;