
import { IUser } from "../Context/context";
import { ITask } from "../Task/Task";

export function getTasksQuery(Token:string|null) {


    return fetch('http://localhost:8080/api/tasks', {
        headers: {
            "authorization": `Bearer ${Token}`,
          },
    })
    .then(response => response.json())

}

export async function setUserMutation(Token:string|null, user:IUser){
    let response = await fetch(`http://localhost:8080/api/updateuser`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          "authorization": `Bearer ${Token}`,
        },
        body: JSON.stringify(user)
      })
}

export function getUserQuery(Token:string|null) {


    return fetch('http://localhost:8080/api/user', {
        headers: {
            "authorization": `Bearer ${Token}`,
          },
    })
    .then(response => response.json())

}

export async function addTaskMutation(token:string|null,task:{name: string,dueDate:Date,priority:string}){
  return await fetch(`http://localhost:8080/api/addtask`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      "authorization": `Bearer ${token}`,
    },
    body: JSON.stringify(task)
  })
}

export async function editTaskMutation(token:string|null,task:{name: string,dueDate:Date,priority:string}){
  return await fetch(`http://localhost:8080/api/edittask`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      "authorization": `Bearer ${token}`,
    },
    body: JSON.stringify(task)
  })
}