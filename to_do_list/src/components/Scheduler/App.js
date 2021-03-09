import * as React from 'react';
import Paper from '@material-ui/core/Paper';
import { ViewState } from '@devexpress/dx-react-scheduler';
import {
  Scheduler,
  MonthView,
  Toolbar,
  DateNavigator,
  Appointments,
  TodayButton,
} from '@devexpress/dx-react-scheduler-material-ui';
import './sass/App.sass';

// import { appointments } from '../../../demo-data/month-appointments';

export default class Demo extends React.PureComponent {
  constructor(props) {
    super(props);

    this.ARRAY_TASKS_FOR_SCHEDULER = [];
    const TASKS = JSON.parse(window.localStorage.getItem('Tasks'));
    TASKS.forEach(task => 
      {
        if(task.text)
      {
        const TASK_FOR_SCHEDULER = {
          startDate: task.date + `T00:00`,
          endDate: task.date + `T00:01`,
          title: task.text + `, ` + task.calories + ` calories`,
        }
        this.ARRAY_TASKS_FOR_SCHEDULER.push(TASK_FOR_SCHEDULER);
      }}
      );

    this.state = {
      // data: [
      //   { startDate: '2021-03-09T09:45', endDate: '2021-03-09T09:46', title: 'Meeting' },
      //   { startDate: '2021-03-09T12:00', endDate: '2021-03-09T13:30', title: 'Go to a gym' },
      // ],
      data: this.ARRAY_TASKS_FOR_SCHEDULER
    };
  }



  render() {
    const { data } = this.state;
    const currentDate = new Date().toISOString().slice(0, 10);
    
    return (
      <Paper className="scheduler">
        <Scheduler
          data={data} 
        >
          <ViewState
            defaultCurrentDate={currentDate}
          />
          <MonthView />
          <Toolbar />
          <DateNavigator />
          <TodayButton />
          <Appointments />
        </Scheduler>
      </Paper>
    );
  }
}
