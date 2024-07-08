require("dotenv").config()
const cors = require("cors")
const express = require("express")
const userRoutes = require("./src/api/routes/users")
const librosRouter = require("./src/api/routes/libros")
const { connectDB } = require("./src/config/db")
const cloudinary = require("cloudinary").v2


const app = express()

app.use(express.json())
app.use(cors())

connectDB()

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
})


app.use("/api/v1/user", userRoutes)
app.use("/api/v1/libros", librosRouter)

app.use("*", (req, res, next) => {
    return res.status(404).json("Route not found")
})

app.use((error, req, res, next) => {
    return res.status(error.status || 500).json(error.message || "Unexpected error")
})

app.listen(3000, () => {
    console.log("Servidor levantado en: http://localhost:3000");
})