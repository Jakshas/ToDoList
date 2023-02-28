import { Link } from "react-router-dom";
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import "react-big-calendar/lib/css/react-big-calendar.css"
import { SetStateAction, useContext, useEffect, useState } from "react";
import { TaskContext } from "../Context/context";
import { ITask } from "../Task/Task";
import Popup from "reactjs-popup";
import { getTasksQuery } from "../utils/queries";
import { EditTaskModal } from "../EditTaskModal/EditTaskModal";
import "./CallendarView.css"
import { AddTaskModal } from "../AddTaskModal/AddTaskModal";

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
        getTasksQuery().then(data => {
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
        <Link className='MainLink' to={'/callendar'}><h1>ToDo List</h1></Link>
        <Link className='CallendarLink' to={'/'}>Summary View</Link>
    </div>
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
            const backgroundColor = event.priority === "Low" ? 'yellow' : event.priority === "Medium"? 'orange' : 'red';
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