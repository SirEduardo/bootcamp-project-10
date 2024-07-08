import "./login-register.css"
import Books from "./Books";
import { checkAuth, isAdmin } from "../main";

document.querySelector("#app")
const template = () => `
<section id="login">
${
   localStorage.getItem("user")
        ? `<h2>You are already logged</h2>`
        : `<form>
          <input type="text" placeholder="Username" id="username"/>
          <input type="password" id="password" placeholder="Password" />
          <button id="loginbtn">Login</button>
        </form>`
    }
  </section>
`;
const loginSubmit = async () => {

    
    const username = document.querySelector("#username").value
    const password = document.querySelector("#password").value

try {
  const data = await fetch("http://localhost:3000/api/v1/user/login", {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({
      userName: username,
      password: password,
    }),
  });

  const dataRes = await data.json()

  const existingError = document.querySelector(".error-message")
  if (existingError){
    existingError.remove()
  }

  if(data.status === 400){
    const pError = document.createElement("p")
    pError.className = "error-message"
    pError.textContent = "Usuario o contraseña incorrectos"
    document.querySelector("form").appendChild(pError)
  }else{
    localStorage.setItem("user", JSON.stringify(dataRes))
    isAdmin()
    checkAuth()  
    Books()
  }
} catch (error) {
  console.log(error);
}

}

const Login = () => {
    document.querySelector("main").innerHTML = template()

    document.querySelector("#loginbtn").addEventListener("click", (e) => {
        e.preventDefault()
        loginSubmit()

    })

    
}

export default Login