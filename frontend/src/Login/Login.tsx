import { useState } from "react";
import { Link } from "react-router-dom";
import useToken from "../Hooks/UseToken";

export function Login() {
    const { token, setToken } = useToken();

    const initialFormState = {
        username:"",
        password:""
    };
    const [login, setLogin] = useState(initialFormState);

    const handleChange = (event: { target: { name: string; value: any; }; }) => {
        const { name, value } = event.target;
    
        setLogin({ ...login, [name]: value });
      }


    const sendLogin = async (event: { preventDefault: () => void; })=>{
        event.preventDefault();
        await fetch(`http://localhost:8080/api/login`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(login)
          }).then(async (data)=>{
            const content = await data.json();
            setToken(content.key)
          })
    }
    return(<form>
            <label>
                  Username<br/>
                  <input type="text" name="username" defaultValue={initialFormState.username} onChange={handleChange}></input>
            </label><br></br>
            <label>
                  Password<br/>
                  <input type="password" name="password" defaultValue={initialFormState.password} onChange={handleChange}></input>
            </label><br></br>
            <input type="submit" value={"Login"} onClick={sendLogin}></input>
            <Link to="/register">Register</Link>
    </form>)
}