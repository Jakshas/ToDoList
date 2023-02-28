import { SetStateAction, useContext } from "react";
import Popup from "reactjs-popup";
import { TaskContext } from "../Context/context";
import { EditTask } from "../EditTask/EditTask";
import { ITask } from "../Task/Task";
import "./EditTaskModal.css"

async function handleOnClickDelete(task:ITask,deleteTask: (task: ITask) => void, setShown:React.Dispatch<React.SetStateAction<boolean>>) {
    await fetch(`http://localhost:8080/api/deletetask`, {
        method: 'Delete',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(task)
      })
    setShown(false);
    deleteTask(task);
}

export function EditTaskModal(props:{task:ITask ,isShown:boolean, setShown:React.Dispatch<React.SetStateAction<boolean>>}) {
    const {deleteTask} = useContext(TaskContext);   
    return(<Popup
            modal
            open={props.isShown}
            position="center center"
            onClose = {()=> {props.setShown(false)}}
        >
          <div className="modal">
          <button className="close" onClick={() => props.setShown(false)}>
          &times;
        </button>
            <EditTask setClicked={props.setShown} task={props.task}></EditTask>
            <input type="submit" value={"Done"} onClick={() => handleOnClickDelete(props.task, deleteTask, props.setShown)}></input>
          </div>
        </Popup>)      
}