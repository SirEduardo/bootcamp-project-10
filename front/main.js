import "./style.css";
import Books from "./pages/Books";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Favs from "./pages/Favs";
import addBook from "./pages/Addbooks";



export const checkAuth = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  if (user) {
    document.querySelector("#loginlink").style.display = "none";
    document.querySelector("#registerlink").style.display = "none";
    document.querySelector("#logoutlink").style.display = "inline";
    document.querySelector("#favslink").style.display = "inline"
  } else {
    document.querySelector("#loginlink").style.display = "inline";
    document.querySelector("#registerlink").style.display = "inline";
    document.querySelector("#logoutlink").style.display = "none";
    document.querySelector("#favslink").style.display = "none"
  }
};

export const isAdmin = () => {
   try {
    const user = JSON.parse(localStorage.getItem("user"));
    const rol = user.user.rol;
      if (rol === "admin") {
        document.querySelector("#addlink").style.display = "inline";
      }
   } catch (error) {
    document.querySelector("#addlink").style.display = "none";
   }

  }

const initApp = () => {

  document.querySelector("#bookslink").addEventListener("click", () => Books());
  document.querySelector("#favslink").addEventListener("click", () => Favs());
  document.querySelector("#addlink").addEventListener("click", () => addBook())
  document.querySelector("#loginlink").addEventListener("click", () => Login());
  document.querySelector("#registerlink").addEventListener("click", () => Register());

  document.querySelector("#logoutlink").addEventListener("click", () => {
    localStorage.removeItem("user");
    isAdmin()
    checkAuth()
    Login();
  });
  isAdmin()
  checkAuth()
  Books()
};

initApp();
