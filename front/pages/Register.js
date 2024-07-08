import "./login-register.css"
import Login from "./Login";
import { checkAuth, isAdmin } from "../main";

const template = () => `
<section id="register">
<form>
<input type="text" placeholder="Username" id="username"/>
<input type="password" id="password" placeholder="Password"/>
<button id="registerbtn">Register</button>
</form>
</section>
`

const registerSubmit = async () => {
    const username = document.querySelector("#username").value
    const password = document.querySelector("#password").value

    const data = await fetch("http://localhost:3000/api/v1/user/register", {
        headers: {
            "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({
            userName: username,
            password: password,
        }),
    })
    
    alert(`Please, log in with your credentials ${username}`)

    Login()
    isAdmin()
    checkAuth()  
}

const Register = () => {
    document.querySelector("main").innerHTML = template()

    document.querySelector("#registerbtn").addEventListener("click", () => {
        registerSubmit()
        Login()
    })
}

export default Register