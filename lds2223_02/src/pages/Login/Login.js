import "./Login.css";
import { useNavigate } from "react-router-dom";

function Login(){

    let history = useNavigate();

    const handleSubmit = (event) =>{

        event.preventDefault();

        let users = JSON.parse(localStorage.getItem('users'));
        let control = false;

        const user = {

            username:document.getElementById("username").value,
            password:document.getElementById("password").value,

        };

        for(let i=0;i<users.length;i++){

            	if(users[i].Email === user.username && users[i].Password === user.password){

                    localStorage.setItem('LoggedUser', JSON.stringify(user));
                    control = true;

                }

        }

        if(control){
            history('/', { replace: true });
        }
        else{

            alert("Incorrect username or password!\nPlease try again");
        }

    }

    return(
            
        <div className="bodyLogin" >
        <h1 className="text-center">Login</h1>
       
        <div className="box">     
        <form>
            <label>
                <p className = "center" >Username</p>
                <input type="text" id="username"/>
            </label>
            <label>
                <p className = "center" >Password</p>
                <input type="password" id="password"/>
            </label>
            <div>
                <a href="/">
                <button className="butao" type="submit" onClick={(e) => handleSubmit(e)}>Entrar</button>
                </a>
            </div>
        </form>
        </div>
    </div>

    )
}

export default Login;
