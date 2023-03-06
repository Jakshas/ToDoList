import { useContext, useState } from "react";
import { TaskContext, UserContext } from "../Context/context";
import useToken from "../Hooks/UseToken";
import { ITask } from "../Task/Task";
import { getColor } from "../utils/functions";
import { editTaskMutation } from "../utils/queries";

export function EditTask(props: {setClicked:React.Dispatch<React.SetStateAction<boolean>>, task:ITask}) {
  const {User} = useContext(UserContext);
    const {token} = useToken();
    const { updateTask } = useContext(TaskContext)
      const initialFormState = {
            id:props.task.id,
            name: props.task.name,
            dueDate:props.task.dueDate,
            priority:props.task.priority
        };
        const [task, setTask] = useState(initialFormState);
  
        const handleChange = (event: { target: { name: string; value: any; }; }) => {
          const { name, value } = event.target
      
          setTask({ ...task, [name]: value })
        }
  
      const handleSubmit = async (event: { preventDefault: () => void; }) => {
          event.preventDefault();
      
          let response = editTaskMutation(token, task);
          const content: ITask = await (await response).json();
          content.dueDate = new Date(task.dueDate);
          updateTask(content);
          props.setClicked(false);
        }
      
      return(
          <form className="EditForm">
              <label>
                  Name<br/>
                  <input type="text" name="name" defaultValue={initialFormState.name} onChange={handleChange}></input>
              </label>
              <br/>
              <label>
                  Due Date<br/>
                  <input type="datetime-local" name="dueDate" defaultValue={new Date(initialFormState.dueDate.getTime() -(initialFormState.dueDate.getTimezoneOffset()*60000)).toISOString().slice(0,-8)} onChange={handleChange}></input>
              </label>
              <br/>
              <label>
                  Priority<br/>
                  <input  type="radio" id="high" name="priority" value="High"  onChange={handleChange} defaultChecked={initialFormState.priority === "High"}/> <label className="border" style={{color:getColor("High", User)}} htmlFor="High">High</label>
                  <input type="radio" id="medium" name="priority" value="Medium" onChange={handleChange} defaultChecked={initialFormState.priority === "Medium"}/> <label className="border" style={{color:getColor("Medium", User)}} htmlFor="Medium">Medium</label>
                  <input type="radio" id="low" name="priority" value="Low" onChange={handleChange} defaultChecked={initialFormState.priority === "Low"}/> <label className="border" style={{color:getColor("Low", User)}} htmlFor="Low">Low</label>
              </label>
              <br/>
              <input type="submit" value={"Save"} onClick={handleSubmit}></input>
          </form>
      )
}