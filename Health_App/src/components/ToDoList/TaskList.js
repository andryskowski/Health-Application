import React from 'react';
import Task from './Task'


const TaskList = props => {
    // const tasks = props.tasks.map(task => <Task key={task.id} task={task} remove={props.remove} change={props.change}/>)
    const active = props.tasks.filter(task => task.active);
    const done = props.tasks.filter(task => !task.active);

    if (done.length >= 2) {
    done.sort((a, b) => {
        return a.finishDate - b.finishDate;
    })
    }
    
    const activeTasks = active.map(task => <Task key={task.id}
        task={task} remove={props.remove} change={props.change} />);
    const doneTasks = done.map(task => <Task key={task.id} task={task}
        remove={props.remove} change={props.change} />);
    console.log(active, done);

    return (
        <>
            <div className="active">
                <h2 className="tasks-to-do">Tasks to do</h2>
                <div className="task-list-headers">
                    <span className="task-activity-header"> Activity </span>
                    <span className="task-activity-header"> Date </span>
                    <span className="task-activity-header"> Calories </span>
                </div>
                {activeTasks.length > 0 ? activeTasks : <span className="nth-to-do">Nothing to do</span>}

            </div>

            <div className="done">
                <h2 className="tasks-to-do">Done tasks: {done.length}</h2>
                <div className="task-list-headers">
                    <span className="task-activity-header"> Activity </span>
                    <span className="task-activity-header"> Date </span>
                    <span className="task-activity-header"> Calories </span>
                </div>
                {doneTasks}
            </div>
        </>
    );
};


export default TaskList;