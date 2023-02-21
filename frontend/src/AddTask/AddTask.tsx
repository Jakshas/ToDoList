import { useContext, useState } from "react";
import { TaskContext } from "../Context/context";
import { ITask } from "../Task/Task";

export function AddTask() {
  const {addTask} = useContext(TaskContext);
    const initialFormState = {
        name: '',
        dueDate:'',
        priority:"Medium"
      };
      const [task, setTask] = useState(initialFormState);

      const handleChange = (event: { target: { name: string; value: any; }; }) => {
        const { name, value } = event.target
    
        setTask({ ...task, [name]: value })
      }

    const handleSubmit = async (event: { preventDefault: () => void; }) => {
        event.preventDefault();
    
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
      }
    
    return(
        <form>
            <label>
                Name
                <input type="text" name="name" onChange={handleChange}></input>
            </label>
            <br/>
            <label>
                Due Date
                <input type="datetime-local" name="dueDate" onChange={handleChange}></input>
            </label>
            <br/>
            <label>
                Priority
                <input type="radio" id="high" name="priority" value="High"  onChange={handleChange} defaultChecked/> <label htmlFor="High">High</label>
                <input type="radio" id="medium" name="priority" value="Medium" onChange={handleChange}/> <label htmlFor="Medium">Medium</label>
                <input type="radio" id="low" name="priority" value="Low" onChange={handleChange}/> <label htmlFor="Low">Low</label>
            </label>
            <br/>
            <input type="button" value={"Submit"} onClick={handleSubmit}></input>
        </form>
    )
}
