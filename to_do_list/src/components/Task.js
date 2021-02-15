import React from 'react';

const Task = props => {
    const {text,date, id} = props.task;
    return (
        <div>
            <p>
                {props.task.text}
                {props.task.date}
                
                <button onClick={() => props.remove(id)}>X</button>
                <button onClick={() => props.change(id)}>Done</button>
            </p>
        </div>
    );
};


export default Task;