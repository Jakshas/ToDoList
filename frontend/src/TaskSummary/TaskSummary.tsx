import { useState } from "react";
import { Link, NavigateFunction, useNavigate } from "react-router-dom";
import { AddTask } from "../AddTask/AddTask";
import { TaskList } from "../TaskList/TaskList";
import "./TaskSummary.css"

function onClickAdd(clicked:boolean, setClicked:React.Dispatch<React.SetStateAction<boolean>>) {
    setClicked(!clicked);
}

export function TaskSummary() {
    const [clicked, setClicked] = useState(false);

    return(<>
              <div className='Header'>
            <Link className='MainLink' to={'/'}><h1>ToDo List</h1></Link>
            <Link className='CallendarLink' to={'/callendar'}>Callendar View</Link>
          </div>
    <div className='MainApp'>
        <h2>Task Summary</h2>
        <input className="ColorPicker" type="color" id="head" name="head" value="#ff0000" disabled />
            <label htmlFor="cb_1">
                High
            </label>
            <input className="ColorPicker" type="color" id="head" name="head" value="#ff9900" disabled />
            <label htmlFor="cb_1">
                Medium
            </label>
            <input className="ColorPicker" type="color" id="head" name="head" value="#ffff00" disabled />
            <label htmlFor="cb_1">
                Low
            </label><br/>
            
        <button className="AddTaskButton" onClick={() => onClickAdd(clicked, setClicked)}>{clicked ? "Hide new task" : "Add new task"}</button><br/>
        <div className={"AddTask " + (clicked ? "open" : "")}><AddTask setClicked={setClicked} date={undefined}></AddTask></div>
        <TaskList></TaskList>
    </div>
    </>)
}