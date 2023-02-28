import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { TaskContext } from "../Context/context";
import { ITask } from "../Task/Task";
import "./AddTask.css"

export function AddTask(props: {setClicked:React.Dispatch<React.SetStateAction<boolean>>, date:Date|undefined}) {
  const {addTask} = useContext(TaskContext);
  const navigate = useNavigate();
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
        let response = await fetch(`http://localhost:8080/api/addtask`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(task)
        })
        const content: ITask = await response.json();
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
                <input  type="radio" id="high" name="priority" value="High"  onChange={handleChange} defaultChecked/> <label className="High" htmlFor="High">High</label>
                <input type="radio" id="medium" name="priority" value="Medium" onChange={handleChange}/> <label className="Medium" htmlFor="Medium">Medium</label>
                <input type="radio" id="low" name="priority" value="Low" onChange={handleChange}/> <label className="Low" htmlFor="Low">Low</label>
            </label>
            <br/>
            <input type="button" value={"Submit"} onClick={handleSubmit}></input>
        </form>
    )
}
