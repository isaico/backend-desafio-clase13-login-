import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { auth } from './midlewares/auth.midleware.js';
import  passport  from 'passport';
import UserRouter from './router/user.router.js'
import AuthRouter from './router/auth.router.js'
import './config/db.config.js'
import session from 'express-session'
import cookieParser from 'cookie-parser';
// import {sessionStorage} from './config/session.config.js'
import MongoStore from 'connect-mongo'
dotenv.config();

const app = express();
const PORT = 8080;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(passport.initialize())
app.use(cookieParser())
/* -------------------------------------------------------------------------- */
/*                                   SESSION                                  */
/* -------------------------------------------------------------------------- */
app.use(session({
  store:MongoStore.create({
      mongoUrl:process.env.MONGO_URI_SESSION,
      options:{
          useNewUrlParser:true,
          useUnifiedTopology:true
      },
  }),
  secret:process.env.SECRET_SESSION,
  resave:false,
  saveUninitialized:false,
  cookie:{
      maxAge:600000
  }
}))
/* -------------------------------------------------------------------------- */
/*                                     EJS                                    */
/* -------------------------------------------------------------------------- */

app.set('view engine', 'ejs');
app.set('views', path.resolve('src/views'));
/* -------------------------------------------------------------------------- */
/*                                   ROUTES                                   */
/* -------------------------------------------------------------------------- */

app.get('/', (req, res) => {
  req.session.token="asd"
  res.render('input');
});
app.use('/user',UserRouter)
app.use('/login',AuthRouter)
app.get('/register',(req,res)=>{
  res.render('register')
})
app.get('/logout',(req,res)=>{
  req.session.destroy((err)=>{
    if(!err){
      res.render(`logout`)
    } 
  })
})

app.get('/inicio',auth,(req,res)=>{
  const user=req.user//usuario obtenido de la base
  res.render('index',{user:user.userName})
})


const server = app.listen(PORT, () => {
  console.log(` 🚀🔥server is runing at http://localhost:${PORT} 🚀🔥`);
});

server.on('error', (err) => {
  console.log(err);
});
