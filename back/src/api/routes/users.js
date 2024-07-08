const userRoutes = require("express").Router()
const { getUsers, getUsersById, login, updateUser, register, deleteUser } = require("../controllers/users")
const { isAuth } = require("../../middlewares/auth")



userRoutes.get("/", getUsers)
userRoutes.get("/:id", getUsersById)
userRoutes.post("/register", register)
userRoutes.post("/login", login)
userRoutes.put("/:id", [isAuth], updateUser)
userRoutes.delete("/:id", [isAuth], deleteUser)


module.exports = userRoutes