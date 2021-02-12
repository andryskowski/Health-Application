import React from 'react';
import Task from './Task'


const TaskList = props => {
    return (
        <>
            <h2>Zadania do zrobienia</h2>
            <Task />
            <Task />


            <div className="active">
                <h2>Zadania do zrobienia</h2>
                <Task />
                <Task />
            </div>

            <div className="done">
                <h2>Zadania zrobione</h2>
                <Task />
                <Task />
            </div>
        </>
    );
};


export default TaskList;