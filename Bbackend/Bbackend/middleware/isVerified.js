import admin from '../model/usermodel'

export const verifyUser = async (req,res,next) => {
    const EMAIL = req.body.email;
    const isValid = await admin.find({
      email : EMAIL,
      verified:true
    }).count();

    if(isValid){
        next()
    }else{
        res.send({ "status": 200, "message": "Please verify your email to login", result: {} })
    }
}   