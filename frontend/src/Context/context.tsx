import React from "react";
import { ITask } from "../Task/Task";

export interface TaskContextType{
    Tasks: ITask[];
    addTask: (task:ITask) => void;
    updateTask: (task: ITask) => void;
    deleteTask: (task: ITask) => void;
    setTasks: (tasks:ITask[]) => void
}

export const TaskContext = React.createContext<TaskContextType>({
    Tasks: [],
    addTask: () => { },
    updateTask: () => { },
    deleteTask: () => { },
    setTasks: () => {}
});