import { useContext, useEffect } from "react"
import { IUser, UserContext } from "../Context/context";
import useToken from "../Hooks/UseToken";
import { getUserQuery, setUserMutation } from "../utils/queries";



export function Colors() {
    const {token} = useToken();
    const {User, changeUser} = useContext(UserContext);

    useEffect(()=>{
        getUserQuery(token).then((data) => {
            let user:IUser = data;
            changeUser(user);
          })
    },[])

    function sendChanges(){
        setUserMutation(token,User)
    }

    return(<>
            <input className="ColorPicker" type="color" value={User.colorHigh} onBlur={sendChanges} onChange={(e)=>{changeUser({...User,colorHigh:e.target.value})}} />
            <label htmlFor="cb_1">
                High
            </label>
            <input className="ColorPicker" type="color"  value={User.colorMedium} onBlur={sendChanges} onChange={(e)=>{changeUser({...User,colorMedium:e.target.value})}} />
            <label htmlFor="cb_1">
                Medium
            </label>
            <input className="ColorPicker" type="color"  value={User.colorLow} onBlur={sendChanges} onChange={(e)=>{changeUser({...User,colorLow:e.target.value})}} />
            <label htmlFor="cb_1">
                Low
            </label><br/>
            
    </>)
}