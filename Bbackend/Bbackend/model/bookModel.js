import mongoose from "mongoose";
import paginate from 'mongoose-paginate-v2';

const bookSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    genre: {
        type: String,
        required: true,  
    },
    price: {
        type: String,
        required: true
    },
    image:{
        type:String
    },
    // userId:{
    //     type:mongoose.Schema.Types.ObjectId
    // }
    
})

bookSchema.plugin(paginate)
const bookdata = mongoose.model("addbook", bookSchema)
export default bookdata;