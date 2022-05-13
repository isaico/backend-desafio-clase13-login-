import express from 'express';
import dotenv from 'dotenv';//por alguna razon no me funciono el dotenv
import path from 'path';
import { auth } from './midlewares/auth.js';
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

/* -------------------------------------------------------------------------- */
/*                                  passport                                  */
/* -------------------------------------------------------------------------- */
app.use(passport.initialize())
// app.use(passport.session())
// passport.use(new Strategy({
//   clientID:"412085694098621",
//   clientSecret:"c06fa9eed6498d60efbcc6794c721dea",
//   callbackURL:'/auth/facebook/callback',
//   profileFields:['id','displayName', 'photos'],
//   scope:['email']
// })),
// (accessToken,refreshToken,userProfile,done)=>{
//   console.log(userProfile);
//   return done(null,userProfile)
// }
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

// app.post('/login', (req, res) => {
//   const user = req.body.user;
//   console.log(user);
//   if (user !== 'admin') {
//     res.send('error al iniciar sesion');
//   } else {
//     req.session.user = user;
//     req.session.admin = true;

//     res.render('index', { user: user });
//   }
// });
// app.get('/privada', auth, (req, res) => {
//   res.send('informacion privada solo para usuarios logeados');
// });
// app.get('/contador', (req, res) => {
//   if (req.session.contador) {
//     req.session.contador++;
//     res.send(`pagina visitada ${req.session.contador} veces`);
//   } else {
//     req.session.contador = 1;
//     res.send('Bienvenido');
//   }
// });
// app.get('/deslogeo', (req, res) => {
//   req.session.destroy((err) => {
//     if (!err) res.send(`Hasta Luego`);
//     else res.send({ status: 'logout error', body: err });
//   });
// });

const server = app.listen(PORT, () => {
  console.log(` 🚀🔥server is runing at http://localhost:${PORT} 🚀🔥`);
});

server.on('error', (err) => {
  console.log(err);
});
