import session from 'express-session'
import MongoStore from 'connect-mongo'

export const sessionStorage=()=>{
    session({
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
    })
}