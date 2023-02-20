
export interface ITask{
    id:number
    name:String
}

export function Task(params:ITask) {
    return(<li>{params.name}</li>)
}