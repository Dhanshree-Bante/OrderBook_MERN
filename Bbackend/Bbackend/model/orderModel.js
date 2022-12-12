import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
   
    userId: {
        type: String,
        required: false
    },
    bookId: {
        type: String,
        required: false
    },
    title:{
        type:String
    },
    price:{
        type:String
    },
    payment:{
        type:String,
        default:"Unpaid"
    }
    
})
const orderdata = mongoose.model("order", orderSchema)
export default orderdata;