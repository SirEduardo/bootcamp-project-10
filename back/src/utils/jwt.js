const jwt = require("jsonwebtoken")

const generateKey = (id) => {
    return jwt.sign({ id }, process.env.SECRET_KEY, { expiresIn: "1y" })
}

const verifyKey = (token) => {
    return jwt.verify(token, process.env.SECRET_KEY)
}

module.exports = { generateKey, verifyKey }