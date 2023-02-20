import React from 'react';
import './App.css';
import { AddTask } from './AddTask/AddTask';
import { TaskList } from './TaskList/TaskList';

function App() {
  return (
    <>
      <AddTask></AddTask>
      <TaskList></TaskList>
    </>
  );
}

export default App;
