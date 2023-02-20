import { useEffect, useState } from "react";
import { ITask, Task } from "../Task/Task";

export function TaskList() {
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [items, setItems] = useState([]);

    useEffect(() => {
        setLoading(true);
    
        fetch('/api/tasks')
          .then(response => response.json())
          .then(data => {
            setItems(data);
            setLoading(false);
          })
      }, []);

    return(<>
            {items.map((task: ITask, idx: number) => (
                <Task key={idx} name={task.name} id={task.id} />
              ))}
              </>)
}