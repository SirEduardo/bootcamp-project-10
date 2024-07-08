const bcrypt = require("bcrypt");
const User = require("../models/users");
const { generateKey } = require("../../utils/jwt");

const getUsers = async (req, res, next) => {
  try {
    const users = await User.find().populate("favoritos");
    return res.status(200).json(users);
  } catch (error) {
    return res.status(400).json("Error");
  }
};

const getUsersById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id).populate("favoritos");
    return res.status(200).json(user);
  } catch (error) {
    return res.status(400).json("Usuario no encontrado");
  }
};

const register = async (req, res, next) => {
  try {
    const userDuplicated = await User.findOne({ userName: req.body.userName });

    if (userDuplicated) {
      return res.status(400).json("Usuario ya existente");
    }

    const newUser = new User({
      userName: req.body.userName,
      password: req.body.password,
      rol: "user",
    });
    const user = await newUser.save();
    return res.status(201).json({ ...user.toObject(), password: undefined });
  } catch (error) {
    return res.status(400).json("Error");
  }
};

const login = async (req, res, next) => {
  try {
    const { userName, password } = req.body;

    const user = await User.findOne({ userName });

    if (!user) {
      return res.status(400).json("Usuario o contraseña incorrectos");
    }

    if (bcrypt.compareSync(password, user.password)) {
      const token = generateKey(user._id);
      return res.status(200).json({ user, token });
    }

    return res.status(400).json("Usuario o contraseña incorrectos");
  } catch (error) {
    return res.status(400).json("Error al hacer login");
  }
};

const updateUser = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (req.user._id.toString() !== id) {
      return res
        .status(400)
        .json("No estas autorizado para modificar a este usuario");
    }
    const oldUser = await User.findById(id);
    const updatedUserData = { ...req.body };
    const updatedUser = await User.findByIdAndUpdate(
      id,
      {
        $set: {
          favoritos: updatedUserData.favoritos || oldUser.favoritos,
        },
      },
      {
        new: true,
        runValidators: true,
      }
    );
    return res.status(200).json(updatedUser);
  } catch (error) {
    return res.status(400).json("Error");
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedUser = await User.findByIdAndDelete(id);
    return res.status(200).json(deletedUser);
  } catch (error) {
    return res.status(400).json("Error al eliminar un usuario");
  }
};

module.exports = {
  getUsers,
  getUsersById,
  register,
  login,
  updateUser,
  deleteUser,
};
