import React from 'react';
import './App.css';
import { AddTask } from './AddTask/AddTask';
import { TaskList } from './TaskList/TaskList';
import { TaskContextManager } from './Context/TaskContextMenager';

function App() {
  return (
    <TaskContextManager>
      <>
        <AddTask></AddTask>
        <TaskList></TaskList>
      </>
    </TaskContextManager>
  );
}

export default App;
