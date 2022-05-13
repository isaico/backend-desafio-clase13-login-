import jwt from 'jsonwebtoken';
import { UserModel } from '../models/user.model.js';
import dotenv from 'dotenv';
dotenv.config();

export const login = async (req, res) => {
  const { body } = req;
  try {
    const user = await UserModel.findOne({ userName: body.userName });
    console.log(user);
    if (!user) {
      throw new Error('usuario no encontrado'); //aca va fail login
    }
    
    const password =  jwt.verify(user.password, process.env.SECRET_KEY).password;
    console.log(user.password);
    console.log(body.password)
    console.log(process.env.SECRET_KEY)
    console.log(password)
    // if (body.password === password) {
    //   const token = jwt.sign({ user }, process.env.SECRET_KEY);
    //   res.json({ token });
    // } else {
    //   res.send('usuario o clave incorrecta!');
    // }
  } catch (error) {
    console.log(error);
  }
};
