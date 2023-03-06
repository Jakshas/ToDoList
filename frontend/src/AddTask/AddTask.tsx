import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { TaskContext, UserContext } from "../Context/context";
import useToken from "../Hooks/UseToken";
import { ITask } from "../Task/Task";
import { getColor } from "../utils/functions";
import { addTaskMutation } from "../utils/queries";
import "./AddTask.css"

export function AddTask(props: {setClicked:React.Dispatch<React.SetStateAction<boolean>>, date:Date|undefined}) {
  const {token} = useToken();
  const {User} = useContext(UserContext);
  const {addTask} = useContext(TaskContext);
    const initialFormState = {
        name: '',
        dueDate: props.date=== undefined ? new Date() : props.date,
        priority:'High'
      };
      const [task, setTask] = useState(initialFormState);

      const handleChange = (event: { target: { name: string; value: any; }; }) => {
        const { name, value } = event.target
    
        setTask({ ...task, [name]: value })
      }

    const handleSubmit = async (event: { preventDefault: () => void; }) => {
        event.preventDefault();
        task.dueDate = new Date(task.dueDate);
        task.dueDate = new Date(task.dueDate.getTime() - task.dueDate.getTimezoneOffset());
        let response = addTaskMutation(token, task);
        const content: ITask = await (await response).json();
        content.dueDate = new Date(task.dueDate);
        addTask(content);
        props.setClicked(false);
      }
      
    return(
        <form className="AddForm">
            <label>
                Name<br/>
                <input type="text" name="name" onChange={handleChange}></input>
            </label>
            <br/>
            <label>
                Due Date<br/>
                <input type="datetime-local" name="dueDate" defaultValue={new Date(initialFormState.dueDate.getTime()-(initialFormState.dueDate.getTimezoneOffset()*60000)).toISOString().slice(0,-8)} onChange={handleChange}></input>
            </label>
            <br/>
            <label>
                Priority<br/>
                <input  type="radio" id="high" name="priority" value="High"  onChange={handleChange} defaultChecked/> <label className="border" style={{color:getColor("High", User)}} htmlFor="High">High</label>
                <input type="radio" id="medium" name="priority" value="Medium" onChange={handleChange}/> <label className="border" style={{color:getColor("Medium", User)}} htmlFor="Medium">Medium</label>
                <input type="radio" id="low" name="priority" value="Low" onChange={handleChange}/> <label className="border" style={{color:getColor("Low", User)}} htmlFor="Low">Low</label>
            </label>
            <br/>
            <input type="button" value={"Submit"} onClick={handleSubmit}></input>
        </form>
    )
}
