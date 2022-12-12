import jwt from 'jsonwebtoken';

export const verifyToken = async(req,res,next)=>{
    try{
        const token = req.header("authorization")
        let jwtSecretKey="SECRET_KEY"

        if(!token){
            return res.send({
                status:true,
                message:"token is null",
            })
        }
        const decode=jwt.verify(token,jwtSecretKey)
        req.result=decode
        next();
    }catch(error){
        console.log(error)
    }
}