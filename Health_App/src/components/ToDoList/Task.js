import React from 'react';

const Task = props => {
    const { text, date, id, calories} = props.task;
    return (
        
        <div className="task-list">
            
            {props.task.isFoodOrSport ?

                <p style={{ color: "blue" }} >
                    
                    <span className="task-activity"> {props.task.text} </span>
                    <span className="task-activity"> {props.task.date} </span>
                    <span className="task-activity"> {props.task.calories} {'calories'} </span>
                    <button className="x-button task-activity-button" onClick={() => props.remove(id)}>X</button>
                    <button className="checked-button task-activity-button" onClick={() => props.change(id)}>&#10003;</button>
                </p>
                :
                <p style={{ color: "#BC243C" }}>  
                    <span className="task-activity"> {props.task.text} </span>
                    <span className="task-activity"> {props.task.date} </span>
                    <span className="task-activity"> {props.task.calories} {'calories'} </span>
                 <button className="x-button task-activity-button" onClick={() => props.remove(id)}>X</button>
                <button className="checked-button task-activity-button" onClick={() => props.change(id)}>&#10003;</button>
                 </p>
                 
            }

            {/* {props.task.text} / 
                 {props.task.date} / 
                 {props.task.calories} {'calories'} */}

                 {/* <button className="x-button" onClick={() => props.remove(id)}>X</button>
                <button className="checked-button" onClick={() => props.change(id)}>&#10003;</button> */}

        </div>
    );
};


export default Task;