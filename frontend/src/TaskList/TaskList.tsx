import { useContext, useEffect, useState } from "react";
import { TaskContext } from "../Context/context";
import { ITask, Task } from "../Task/Task";

export function TaskList() {
    const [loading, setLoading] = useState(false);
    const { Tasks, setTasks } = useContext(TaskContext)

    useEffect(() => {
        setLoading(true);
    
        fetch('http://localhost:8080/api/tasks')
          .then(response => response.json())
          .then(data => {
            setTasks(data.map((task:ITask)=>{ return{...task, dueDate : new Date(task.dueDate)}}));
            setLoading(false);
          })
      }, []);

    return(<>
            {Tasks.map((task: ITask, idx: number) => (
                <Task key={idx} name={task.name} id={task.id} dueDate={task.dueDate} priority={task.priority} />
              ))}
              </>)
}