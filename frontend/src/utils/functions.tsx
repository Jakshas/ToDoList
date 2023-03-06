import { IUser } from "../Context/context";
import { ITask } from "../Task/Task";

export function getColor(priority:"Low"|"Medium"|"High", User:IUser){
    return priority == "Low" ? User.colorLow : (priority == "Medium" ? User.colorMedium: User.colorHigh)
}
