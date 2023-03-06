import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function Register() {
    const initialFormState = {
        username:"",
        email:"",
        password:""
    };
    const [login, setLogin] = useState(initialFormState);
    const navigate = useNavigate();

    const handleChange = (event: { target: { name: string; value: any; }; }) => {
        const { name, value } = event.target;
    
        setLogin({ ...login, [name]: value });
      }

    const sendRegister = async (event: { preventDefault: () => void; })=>{
        event.preventDefault();
        await fetch(`http://localhost:8080/api/register`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(login)
          }).then(async (data)=>{
            navigate("/");
          })
    }

    return(<form>
            <label>
                Username<br/>
                <input type="text" name="username" defaultValue={initialFormState.username} onChange={handleChange}></input>
            </label><br></br>
            <label>
                Email<br/>
                <input type="text" name="email" defaultValue={initialFormState.email} onChange={handleChange}></input>
            </label><br/>
            <label>
                  Password<br/>
                  <input type="password" name="password" defaultValue={initialFormState.password} onChange={handleChange}></input>
            </label><br/>
            <input type="submit" value={"Register"} onClick={sendRegister}></input>
    </form>)
}