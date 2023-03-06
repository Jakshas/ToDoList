import { SetStateAction, useContext, useEffect, useState } from "react";
import { AddTask } from "../AddTask/AddTask";
import { TaskContext, UserContext } from "../Context/context";
import { EditTask } from "../EditTask/EditTask";
import useToken from "../Hooks/UseToken";
import { getColor } from "../utils/functions";
import  "./Task.css";

export interface ITask{
    id:number
    name:string
    dueDate:Date
    priority:"High"|"Medium"|"Low"
}



export function Task(params:ITask) {
    const [clicked, setClicked] = useState(false);
    const {deleteTask} = useContext(TaskContext);
    const {User} = useContext(UserContext)
    const {token} = useToken();

    async function handleOnClickDelete(task:ITask,deleteTask: (task: ITask) => void) {
        await fetch(`http://localhost:8080/api/deletetask`, {
            method: 'Delete',
            headers: {
              'Content-Type': 'application/json',
              "authorization": `Bearer ${token}`,
            },
            body: JSON.stringify(task)
          })
        deleteTask(task);
    }

    return(<li className="TaskList">
        <div className={"Task border"} style={{color: getColor(params.priority, User)}}>{params.name}<br/>{params.dueDate.toLocaleTimeString().slice(0,5)} </div> 
        <div className="hide">
            <button  onClick={() => handleOnClickDelete(params, deleteTask)}>Done</button>
            <button  onClick={() => setClicked(!clicked)}>Edit</button>
        </div>
        <div className={"EditTask " + (clicked ? "open" : "")}><EditTask setClicked={setClicked} task={params}></EditTask></div>
    </li>)
}