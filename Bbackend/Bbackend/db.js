import mongoose from 'mongoose' 
import dotenv from 'dotenv/config';
console.log(process.env.Node_env)
// dotenv.config();
const DB = require('./config').get(process.env.Node_env).DB;


var option = {
    user : DB.userName,
    pass : DB.Password
};

const MONGOURL = `mongodb://${DB.HOST}:${DB.PORT}/${DB.DATABASE}`

export const mongoconnection = async ()=>{
    try{
        await mongoose.connect(MONGOURL,option);
        console.log("Connected to Database");
    }
    catch(e){
        console.log(e);
   }
}
