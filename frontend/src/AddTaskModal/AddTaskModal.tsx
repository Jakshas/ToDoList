import { SetStateAction } from "react";
import Popup from "reactjs-popup";
import { AddTask } from "../AddTask/AddTask";
import { EditTask } from "../EditTask/EditTask";
import { ITask } from "../Task/Task";
import "./AddTaskModal.css"


export function AddTaskModal(props:{date:Date ,isShown:boolean, setShown:React.Dispatch<React.SetStateAction<boolean>>}) {
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
            <AddTask setClicked={props.setShown} date={props.date}></AddTask>
          </div>
        </Popup>)      
}