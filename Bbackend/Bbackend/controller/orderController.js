import mongoose from "mongoose";
import order from '../model/orderModel';

export const addOrder=async(req,res)=>{
    try {
        const addorderr = new order({
           userId:req.body.userId,
            bookId:req.body.bookId,
            title:req.body.title,
            price:req.body.price,
        })
       const orderdata= await addorderr.save();
       console.log(orderdata._id)
       if(orderdata){
        return res.send({ status: true, message: "Book added", code: 200,
        result:orderdata
       })}  
    }
    catch (e) {
        throw e
    }
}

export const UpdateOrder = async (req,res) => {
  try {
      order.updateOne({ _id: req.body.id },
          { $set: {payment : "Paid"} },
          { new: true },
          (err, updatedlist) => {
              if (err) {
                  res.send({ status: 404, message: "Failed", result: err })
              } else {
                  res.send({ status: 200, message: "Updated Successfully", result: updatedlist })
              }
          })
     }
  catch (e) {
      throw e
  }
}

export const orderDetailById = async (req,res) => {
    const { _id } = req.query;
    console.log(_id);
    const Detail = await order.findById(_id);
    return res.send(
      { status: true, message: "success", code: 200, data: Detail }
    )
  }





    