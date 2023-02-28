import { useContext, useEffect, useState } from "react";
import { JsxElement } from "typescript";
import { TaskContext } from "../Context/context";
import { ITask, Task } from "../Task/Task";
import { getTasksQuery } from "../utils/queries";
import "./TaskList.css"

export function TaskList() {
    const { Tasks, setTasks } = useContext(TaskContext)
    const [ list, setList] = useState<JSX.Element[]>()

    useEffect(() => {
        getTasksQuery().then(data => {
          let tasks:ITask[] = data.map((task:ITask)=>{ return{...task, dueDate : new Date(task.dueDate)}});
          tasks.sort((task1:ITask, task2:ITask) => {return task1.dueDate < task2.dueDate? -1 : 1});
          setTasks(tasks);
        })
      }, [setTasks]);
    
      useEffect(() => {
        let tasks = Tasks;
        tasks.sort((task1:ITask, task2:ITask) => {return task1.dueDate < task2.dueDate? -1 : 1});
            setTasks(tasks);
        let array:JSX.Element[] = [];
        if (Tasks.length == 0) {
          setList(array);
          return;
        }
        array.push(<div key={0} className="lines"><span>{Tasks[0].dueDate.toDateString()}</span></div>)
        array.push(<Task key={1} name={Tasks[0].name} id={Tasks[0].id} dueDate={Tasks[0].dueDate} priority={Tasks[0].priority}  />)
        for (let index = 1, key = 2; index < Tasks.length; index++) {
          if (Tasks[index].dueDate.toDateString() !== Tasks[index-1].dueDate.toDateString()) {
            array.push(<div key={key} className="lines"><span>{Tasks[index].dueDate.toDateString()}</span></div>)
            key++;
          }
          array.push(<Task key={key} name={Tasks[index].name} id={Tasks[index].id} dueDate={Tasks[index].dueDate} priority={Tasks[index].priority}  />)
          key++;
        }
        setList(array);
      }, [Tasks, setTasks])

      return(
        <div className="List">
          {list}
        </div>
      )
}