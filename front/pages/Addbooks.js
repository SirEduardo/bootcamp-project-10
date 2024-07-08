import "./addbooks.css"
import Books from "./Books";

document.querySelector("#app")

const template = () => `
<section id="addbooks"
<form>
<input type="text" placeholder="Titulo" id="titulo"/>
<input type="number" placeholder="€" id="precio"/>
<input type="number" placeholder="⭐" id="valoracion"/>
<input type="text" placeholder="Autor" id="autor"/>
<input type="file" id="caratula"/>
<button id="subir">Subir</button>
</form>
</section>
`;

const PostBook = async () => {
    const titulo = document.querySelector("#titulo").value
    const precio = Number(document.querySelector("#precio").value)
    const valoracion = Number(document.querySelector("#valoracion").value)
    const autor = document.querySelector("#autor").value
    const caratula = document.querySelector("#caratula").files[0]
  
    if (!caratula) {
        console.error("No has seleccionado ningun archivo")
        return;
    }

    console.log(caratula)

    const formData = new FormData();
    formData.append("titulo", titulo)
    formData.append("precio", precio)
    formData.append("valoracion", valoracion)
    formData.append("autor", autor)
    formData.append("caratula", caratula)

    const user = JSON.parse(localStorage.getItem("user"))
    const token = user.token 

  try {
    const response = await fetch("http://localhost:3000/api/v1/libros", {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`,
            'Access-Control-Allow-Origin': '*',
        },
        mode: "cors",
        body: formData
    })
    const data = await response.json()
    if (response.ok) {
        console.log("Libro añadido a la BBDD")
        document.querySelector("form").reset()
        Books()
    } else {
        console.error("Error al añadir el libro a la BBDD", data)
    }

  } catch (error) {
    console.error("Error de red", error);
  }
}

const addBook = () => {
    document.querySelector("main").innerHTML = template()

    document.querySelector("#subir").addEventListener("click", (e) => {
        e.preventDefault()
        PostBook()
        Books()
        
    })
}

export default addBook

