import "./favs.css";

const handleRemoveFromFavs = async (bookId) => {
  try {
    const user = JSON.parse(localStorage.getItem("user"));
    const { _id: userId, favoritos } = user.user;
    const token = user.token;

    const updatedFavoritos = favoritos.filter((id) => id !== bookId)

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
    if (response.ok) {
      user.user.favoritos = updatedFavoritos
      localStorage.setItem("user", JSON.stringify(user));

      const bookElement = document.querySelector(`[data-book-id="${bookId}"]`)
      if (bookElement){
        bookElement.parentElement.remove()
      }
    } else {
      const errorData = await response.json()
      console.log("Error al eliminar de favoritos", errorData.message);
    }
  } catch (error) {
    console.log("Error inesperado");
  }
};

const template = () => `
<section id="favs">
  <ul id="bookscontainer">
  </ul>
</section>
`;

const getFavs = async () => {
 try {
  const userId = JSON.parse(localStorage.getItem("user")).user._id;
  const booksData = await fetch(`http://localhost:3000/api/v1/user/${userId}`);
  const data = await booksData.json();
  const books = data.favoritos;
  const booksContainer = document.querySelector("#bookscontainer");
  booksContainer.innerHTML = "";
  for (const book of books) {
    const li = document.createElement("li");
    li.innerHTML = `
    <img src=${book.caratula} alt=${book.titulo}/>
    <h3>${book.titulo}</h3>
    <h4>${book.autor}</h4>
    <h5>${book.valoracion}⭐</h5>
    <h5>${book.precio}€</h5>
    <button class="remove-btn" data-book-id="${book._id}">✖</button>`;
    booksContainer.appendChild(li);

    const removeBtn = li.querySelector(".remove-btn");
    if (removeBtn) {
      removeBtn.addEventListener("click", () => {
        const bookId = removeBtn.getAttribute("data-book-id");
        handleRemoveFromFavs(bookId);
      });
    }
  }
 } catch (error) {
    const errMessage = document.createElement("p")
    errMessage.textContent = "Log in please"
    document.querySelector("#favs").appendChild(errMessage)
 }
};

const Favs = () => {
  document.querySelector("main").innerHTML = template();
  getFavs();
};

export default Favs;
