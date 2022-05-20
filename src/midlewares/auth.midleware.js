import jwt from 'jsonwebtoken'

export const auth = async (req,res,next)=>{
    try {
        const token = req.session?.token
        if(!token) res.send("acceso denegado, token no recibido")
        const encoded=jwt.verify(token,process.env.SECRET_KEY)
        req.user=encoded.user
        next()
    } catch (error) {
        console.log(error)
        res.status(401).send(error)
    }
}