import jwt from 'jsonwebtoken';
import { UserModel } from '../models/user.model.js';
import dotenv from 'dotenv';
dotenv.config();

export const login = async (req, res) => {
  const { body } = req;
  try {
    const user = await UserModel.findOne({ userName: body.userName });
   
    if (!user) {
      res.render("failLogin",{error:"usuario no encontrado en la base de datos"}) //aca va fail login
    }
    const password = jwt.verify(user.password, process.env.SECRET_KEY).password;
    // console.log(password,"pasword desencriptada")
    if (body.password === password) {
      delete user.password
      const token = jwt.sign({ user }, process.env.SECRET_KEY, { expiresIn: "10m" });
      // res.json({ token });
      res.header('Authorization',token).json({
        message:"usuario autenticado",
        token:token
      })
      // req.body.authorization=token
      // res.redirect('/inicio')
    } else {
      res.send('usuario o clave incorrecta!');
    }
  } catch (error) {
    console.log(error);
  }
};
