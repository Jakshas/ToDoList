import { ReactElement, useState } from "react";
import { IUser, UserContext } from "./context";


export const UserContextManager: React.FC<{children: ReactElement}> = ({ children }) => {
    const [User, setUser] = useState<IUser>({    
        id:0,
        username:"",
        email:"",
        password:"",
        colorHigh:"",
        colorMedium:"",
        colorLow:""});

    const changeUser= (user: IUser) => {
        setUser(user);
    }

    return <UserContext.Provider value={{ User, changeUser }}>{children}</UserContext.Provider>;
};