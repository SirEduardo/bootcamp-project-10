const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const dbUrl = process.env.DB_URL
    if(!dbUrl){
        console.log("Error con la url");
    }
    await mongoose.connect(dbUrl);
    console.log("Conectado con éxito a la BBDD");
  } catch (error) {
    console.log("Error al conectar a la BBDD", error.message);
  }
};

module.exports = { connectDB };
