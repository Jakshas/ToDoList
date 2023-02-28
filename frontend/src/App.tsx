import React from 'react';
import './App.css';
import { TaskContextManager } from './Context/TaskContextMenager';
import { Route, BrowserRouter as Router, Routes, Link } from 'react-router-dom';
import { TaskSummary } from './TaskSummary/TaskSummary';
import { CallendarView } from './CallendarView/CallendarView';
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'

const localizer = momentLocalizer(moment)
function App() {
  return (
    <TaskContextManager>
      <Router>
        <>
          <Routes>
            <Route path='/' element={<TaskSummary/>}/>   
            <Route path='/callendar' element={<CallendarView/>}/>          
          </Routes>
        </>
      </Router>
    </TaskContextManager>
  );
}

export default App;
