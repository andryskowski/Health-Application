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
            <div className="active" className="klasafajna">
                <h2>Tasks to do</h2>
                {activeTasks.length > 0 ? activeTasks : <p>Nothing to do</p>}

            </div>

            <div className="done">
                <h2>Done tasks <em>({done.length})</em></h2>
                
                {doneTasks}
            </div>
        </>
    );
};


export default TaskList;