import { useState } from "react";

export function AddTask() {
    const initialFormState = {
        name: '',
        dueDate:'',
        
      };
      const [task, setTask] = useState(initialFormState);

      const handleChange = (event: { target: { name: any; value: any; }; }) => {
        const { name, value } = event.target
    
        setTask({ ...task, [name]: value })
      }

    const handleSubmit = async (event: { preventDefault: () => void; }) => {
        event.preventDefault();
    
        await fetch(`http://localhost:8080/api/addtask`, {
          method: 'POST',
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(task)
        });
      }
    
    return(
        <form>
            <label>
                Name
                <input type="text" onChange={handleChange}></input>
            </label>
            <input type="button" value={"Submit"} onClick={handleSubmit}></input>
        </form>
    )
}