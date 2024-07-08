const mongoose = require("mongoose")
const bcrypt = require("bcrypt")

const userSchema = mongoose.Schema(
    {
        userName: { type: String, trim:true, required: true },
        password: { type: String, trim:true, required: true },
        favoritos: [{ type: mongoose.Types.ObjectId, required: false, ref: "libros" }],
        rol: { type: String, required: true, default: "user", enum: [ "admin", "user" ] },
    },
    {
        timestamps: true,
        Collection: "users"
    }
)

userSchema.pre("save", function (next) {
    this.password = bcrypt.hashSync(this.password, 10)
    next()
})

const User = mongoose.model("users", userSchema, "users")
module.exports = User