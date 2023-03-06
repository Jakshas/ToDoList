import { Link, useNavigate } from "react-router-dom";
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import "react-big-calendar/lib/css/react-big-calendar.css"
import { SetStateAction, useContext, useEffect, useState } from "react";
import { TaskContext, UserContext } from "../Context/context";
import { ITask } from "../Task/Task";
import Popup from "reactjs-popup";
import { getTasksQuery } from "../utils/queries";
import { EditTaskModal } from "../EditTaskModal/EditTaskModal";
import "./CallendarView.css"
import { AddTaskModal } from "../AddTaskModal/AddTaskModal";
import useToken from "../Hooks/UseToken";
import { getColor } from "../utils/functions";
import { Colors } from "../Colors/Colors";

const localizer = momentLocalizer(moment)

interface IEvent {
    id: number,
    title: string,
    start: Date,
    end: Date,
    allDay?: boolean
    resource?: any,
    priority:"High"|"Medium"|"Low"
  }
  

export function CallendarView() {
    const {User} = useContext(UserContext)
    const navigate = useNavigate();
    const {token} = useToken();
    const {Tasks, setTasks} = useContext(TaskContext);
    const [events, setEvents] = useState<IEvent[]>([]);
    const [isShownEdit, setShownEdit] = useState(false);
    const [isShownAdd, setShownAdd] = useState(false);
    const [task, setTask] = useState<ITask>({
        id:0,
        name: "",
        dueDate: new Date(),
        priority:"Medium"
    });
    const [date, setDate] = useState(new Date());

    useEffect(() => {
        getTasksQuery(token).then(data => {
            if (data.error === "Forbidden") {
                sessionStorage.removeItem('auth-token');
                sessionStorage.removeItem('ID');
                navigate("/");
                window.location.reload();
              }
            let tasks:ITask[] = data.map((task:ITask)=>{ return{...task, dueDate : new Date(task.dueDate)}});
            tasks.sort((task1:ITask, task2:ITask) => {return task1.dueDate < task2.dueDate? -1 : 1});
            setTasks(tasks);
          })
      }, []);

    useEffect(()=>{
        setEvents(Tasks.map((task:ITask) => {return{
            id:task.id,
            title:task.name,
            start:task.dueDate,
            end:task.dueDate,
            priority:task.priority
        }}));
    },[Tasks])

    return(<>
    <div className='Header'>
    <button className='TitleHeader' onClick={() => {
            sessionStorage.removeItem('auth-token');
            window.location.reload();
          }}>Logout</button>
        <Link className='MainLink' to={'/callendar'}><h1>ToDo List</h1></Link>
        <Link className='CallendarLink' to={'/'}>Summary View</Link>
    </div>
    <Colors></Colors>
    <Calendar className="Callendar"
        selectable={true}   
        onSelectSlot={(SlotInfo) => {
            setDate(SlotInfo.start);
            setShownAdd(true);
        }}
        onSelectEvent={(event) => {
            setShownEdit(true);
            setTask(Tasks.find((task) => task.id === event.id) as ITask);
        }}
        localizer={localizer}
        events={events}
        eventPropGetter={(event) => {
            const backgroundColor = getColor(event.priority, User);
            return { style: { backgroundColor, border: "solid 1px black", color:"black" } }
        }}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 600, width: "100%" }}
    />
        <EditTaskModal isShown={isShownEdit} setShown={setShownEdit} task={task}></EditTaskModal>
        <AddTaskModal isShown={isShownAdd} setShown={setShownAdd} date={date}></AddTaskModal>
    </>)
}