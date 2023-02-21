import { ReactElement, useState } from "react";
import { ITask } from "../Task/Task";
import { TaskContext } from "./context";

export const TaskContextManager: React.FC<{children: ReactElement}> = ({ children }) => {
    const [Tasks, setTasks] = useState<ITask[]>([]);

    const deleteTask = (task: ITask) => {
        setTasks(prevTasks=>prevTasks.filter(prevTasks => prevTasks.id !== task.id));
    }

    const addTask = (task: ITask) => {
        setTasks(prevTasks => [...prevTasks, task])
    }
    const updateTask = (task: ITask) => {
        setTasks(prevTasks=>prevTasks.filter(prevTasks => prevTasks.id !== task.id));
        setTasks(prevTasks => [...prevTasks, task])
    }

    return <TaskContext.Provider value={{Tasks , addTask, updateTask, deleteTask,setTasks }}>{children}</TaskContext.Provider>;
};