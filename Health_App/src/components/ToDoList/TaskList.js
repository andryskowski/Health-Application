import React from 'react';
import Task from './Task'
import './sass/App.sass'

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
        remove={props.unDone} />);
    console.log(active, done);

    return (
        <>
            <div className="active">
                <h2 className="tasks-to-do">Tasks to do: {active.length}</h2>
                {activeTasks.length > 0 ? 
                    <div>
            <table id='active-table'>
               <tbody>
               <tr>
                    <th>Activity</th>
                    <th>Date</th>
                    <th>Calories</th>
                    <th>Done</th>
                    <th>Delete</th>
               </tr>
                  {activeTasks}
               </tbody>
            </table>
         </div>
                     : <span ></span>}

            </div>

            <div className="done">
            {doneTasks.length > 0 ?
                <div>
                <h2 className="tasks-to-do">Tasks done: {done.length}</h2>
                <table id='done-table'>
               <tbody>
               <tr>
                    <th>Activity</th>
                    <th>Date</th>
                    <th>Calories</th>
                    <th>Delete</th>
               </tr>
                  {doneTasks}
               </tbody>
            </table>
            </div>
            : <div></div>}
            </div>
        </>
    );
};


export default TaskList;