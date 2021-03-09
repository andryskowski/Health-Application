import * as React from 'react';
import Paper from '@material-ui/core/Paper';
import { ViewState } from '@devexpress/dx-react-scheduler';
import {
  Scheduler,
  DayView,
  Toolbar,
  MonthView,
  Appointments,
} from '@devexpress/dx-react-scheduler-material-ui';
import './sass/App.sass';

import { DateNavigator } from '@devexpress/dx-react-scheduler-material-ui';

const currentDate = new Date().toISOString().slice(0, 10);
const schedulerData = [
  { startDate: '2018-11-01T09:45', endDate: '2018-11-01T09:46', title: 'Meeting' },
  { startDate: '2018-11-01T12:00', endDate: '2018-11-01T13:30', title: 'Go to a gym' },
];

export default () => (
    
  <Paper className="scheduler">
      
    <Scheduler
      data={schedulerData}
    >
        
      <ViewState
        currentDate={currentDate}
      />
      <MonthView></MonthView>
      <Toolbar />
          <DateNavigator />
      
      <Appointments />
    </Scheduler>
  </Paper>
);