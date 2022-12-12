import admin from "../model/usermodel";

export const CheckMail = async (req,res,next)=>{

    const result = await admin.findOne({email:req.body.email});
    if(!result){
        next();
    }
    else{
        res.send({
            status:false,
            message:"Email Alredy Registered!!!!"
        })
    }
}