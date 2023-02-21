import { useContext } from "react";
import { TaskContext } from "../Context/context";

export interface ITask{
    id:number
    name:String
    dueDate:Date
    priority:"High"|"Medium"|"Low"
}

async function handleOnClick(task:ITask,deleteTask: (task: ITask) => void) {
    await fetch(`http://localhost:8080/api/deletetask`, {
        method: 'Delete',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(task)
      })
    deleteTask(task);
}

export function Task(params:ITask) {
    const {deleteTask} = useContext(TaskContext);
    return(<li>{params.name}, {params.dueDate.toDateString()}, {params.priority}, <button onClick={() => handleOnClick(params, deleteTask)}>Done</button></li>)
}