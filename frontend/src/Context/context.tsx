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

export interface IUser{
    id:number;

    username:string;

    email:string;

    password:string;

    colorHigh:string;
    colorMedium:string;
    colorLow:string;
}

export interface UserContextType{
    User:IUser
    changeUser:(user:IUser)=> void
}

export const UserContext = React.createContext<UserContextType>({
    User: {    
        id:0,
        username:"",
        email:"",
        password:"",
        colorHigh:"",
        colorMedium:"",
        colorLow:""},
    changeUser:()=> {}
});