
import { ITask } from "../Task/Task";

export function getTasksQuery() {

    return fetch('http://localhost:8080/api/tasks')
    .then(response => response.json())

}
