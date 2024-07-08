import "./books.css";

const handleAddToFavs = async (bookId) => {
  try {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      console.log("Usuario no encontrado en localStorage");
      return;
    }
    const token = user.token;
    const { _id: userId, favoritos } = user.user;

    if (favoritos.includes(bookId)) {
      console.log("El libro ya está en favoritos");
      return;
    }
    const updatedFavoritos = [...favoritos, bookId];

    const response = await fetch(
      `http://localhost:3000/api/v1/user/${userId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          favoritos: updatedFavoritos,
        }),
      }
    );
    if (!response.ok) {
      const errorData = await response.json();
      console.log("Error al añadir a favoritos:", errorData.message);
      return;
    }
    console.log("Libro añadido a favoritos");
    user.user.favoritos = updatedFavoritos;
    localStorage.setItem("user", JSON.stringify(user));
  } catch (error) {
    console.log("Error inesperado", error);
  }
};

const handleDeleteBook = async (bookId) => {
    try {
        const user = JSON.parse(localStorage.getItem("user"));
        if (!user) {
          console.log("Usuario no encontrado en localStorage");
          return;
        }
        const token = user.token;

        const response = await fetch(`http://localhost:3000/api/v1/libros/${bookId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            }
        })
            if (!response.ok) {
                const erroData = await response.json()
                console.log("Error al eliminar el libro", erroData);
                return
            }
            console.log("Libro eliminado con éxito");
            getBooks()
    } catch (error) {
        console.log("Error inesperado", error);
    }
}

const template = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const userName = user ? user.user.userName : null;

  return `
  <section id="books">
    ${
      localStorage.getItem("user")
        ? `
        <h3>Welcome ${userName}</h3>`
        : `<h3>Please, log in</h3>`
    }
    <ul id="bookscontainer">
    </ul>
  </section>
`;
};
const getBooks = async () => {
  const booksData = await fetch("http://localhost:3000/api/v1/libros");
  const books = await booksData.json();

  const booksContainer = document.querySelector("#bookscontainer");
  booksContainer.innerHTML = "";

  const user = JSON.parse(localStorage.getItem("user"))
  const isAdmin = user && user.user.rol === "admin"

  for (const book of books) {
    const li = document.createElement("li");
    li.innerHTML = `
        <img src=${book.caratula} alt=${book.titulo}/>
        <h3>${book.titulo}</h3>
        <h4>${book.autor}</h4>
        <h5>${book.valoracion}⭐</h5>
        <h5>${book.precio}€</h5>
        <button class="favorite-btn" data-book-id="${book._id}">❤</button>
        ${isAdmin ? `<button class="delete-btn" data-book-id="${book._id}">x</button>` : ""}`;

    booksContainer.appendChild(li);

    const favoriteBtn = li.querySelector(".favorite-btn");
    if (favoriteBtn) {
      favoriteBtn.addEventListener("click", () => {
        const bookId = favoriteBtn.getAttribute("data-book-id");
        handleAddToFavs(bookId);
      });
    }
    const deleteBtn = li.querySelector(".delete-btn")
    if (deleteBtn) {
      deleteBtn.addEventListener("click", () => {
          const bookId = deleteBtn.getAttribute("data-book-id")
          handleDeleteBook(bookId)
      })
    }
  }

};

const Books = () => {
  document.querySelector("main").innerHTML = template();
  getBooks();
};

export default Books;
