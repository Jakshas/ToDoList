import React from 'react';
import './App.css';
import { TaskContextManager } from './Context/TaskContextMenager';
import { Route, BrowserRouter as Router, Routes, Link } from 'react-router-dom';
import { TaskSummary } from './TaskSummary/TaskSummary';
import { CallendarView } from './CallendarView/CallendarView';
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import useToken from './Hooks/UseToken';
import { Login } from './Login/Login';
import { Register } from './Register/Register';
import { UserContextManager } from './Context/UserContextmenager';

function App() {
  const { token, setToken } = useToken();

  if (!token) {
    return (
      <Router>
        <Routes>
          <Route path="*" element={<Login  />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Router>)

  }
  
  return (
    <TaskContextManager>
      <UserContextManager>
        <Router>
          <>
            <Routes>
              <Route path='/' element={<TaskSummary/>}/>   
              <Route path='/callendar' element={<CallendarView/>}/>          
            </Routes>
          </>
        </Router>
      </UserContextManager>
    </TaskContextManager>
  );
}

export default App;
