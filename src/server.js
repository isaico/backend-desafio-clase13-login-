import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { auth } from './midlewares/auth.midleware.js';
import  passport  from 'passport';
import UserRouter from './router/user.router.js'
import AuthRouter from './router/auth.router.js'
import './config/db.config.js'
dotenv.config();

const app = express();
const PORT = 8080;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(passport.initialize())
/* -------------------------------------------------------------------------- */
/*                                     EJS                                    */
/* -------------------------------------------------------------------------- */

app.set('view engine', 'ejs');
app.set('views', path.resolve('src/views'));
/* -------------------------------------------------------------------------- */
/*                                   ROUTES                                   */
/* -------------------------------------------------------------------------- */

app.get('/', (req, res) => {
  res.render('input');
});
app.use('/user',UserRouter)
app.use('/login',AuthRouter)
app.get('/register',(req,res)=>{
  res.render('register')
})
app.get('/inicio',auth,(req,res)=>{
  const {user}=req.user
  console.log(user,"asd")
  res.send(`estas autorizado , ${user.firstName} ${user.lastName}`)
})

const server = app.listen(PORT, () => {
  console.log(` 🚀🔥server is runing at http://localhost:${PORT} 🚀🔥`);
});

server.on('error', (err) => {
  console.log(err);
});
