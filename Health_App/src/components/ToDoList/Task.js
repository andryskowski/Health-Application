import React from 'react';
import './sass/App.sass';

const Task = props => {
    const { text, date, id, calories} = props.task;
    if (props.task.isFoodOrSport && props.task.active) return (
        
        <tr key={id} style={{ backgroundColor: "#96b9d0" }}>
               <td>{text}</td>
               <td>{date}</td>
               <td>{calories}</td>
               <td><button className="checked-button task-activity-button" onClick={() => props.change(id)}>&#10003;</button></td>
               <td><button className="x-button task-activity-button" onClick={() => props.remove(id)}>X</button></td>
            </tr>


    );
    else if (props.task.active) return (
<tr key={id} style={{ backgroundColor: "#e27978" }}>
               <td>{text}</td>
               <td>{date}</td>
               <td>{calories}</td>
               <td><button className="checked-button" onClick={() => props.change(id)}>&#10003;</button></td>
               <td><button className="x-button task-activity-button" onClick={() => props.remove(id)}>X</button></td>
               </tr>
    );

    else if (!props.task.active && props.task.isFoodOrSport) return (
        <tr key={id} style={{ backgroundColor: "#96b9d0" }}>
                       <td>{text}</td>
                       <td>{date}</td>
                       <td>{calories}</td>
                       <td><button className="x-button task-activity-button" onClick={() => props.remove(id)}>X</button></td>
                       </tr>
    );

    else return (
        <tr key={id} style={{ backgroundColor: "#e27978" }}>
                       <td>{text}</td>
                       <td>{date}</td>
                       <td>{calories}</td>
                       <td><button className="x-button task-activity-button" onClick={() => props.remove(id)}>X</button></td>
                       </tr>
            );
};


export default Task;