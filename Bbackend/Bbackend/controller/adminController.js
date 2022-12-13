import mongoose from "mongoose";
import admin from '../model/usermodel';
import addbook from '../model/bookModel';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { sendemail } from '../middleware/sendmail';
const stripe = require('stripe')('');

export const userSignup = async (req, res) => {
  try {
    const otp = Math.floor(Math.random() * 1234 + 1000);
    const { role, firstname, lastname, mobile, email, password } = req.body;
    const useSignup = new admin({
      role,
      firstname, lastname, mobile,
      email,
      password: bcrypt.hashSync(password, 8),
      otp
    })
    const message = `Hello your verification code is ${otp} . `;
    const us = await useSignup.save();
    await sendemail('dhanshreebante29@gmail.com', req.body.email, 'Verification Code', message)

    if (us) {
      return res.send({ status: true, message: "PLEASE VERIFY YOUR EMAIL", code: 200, result: us })
    }
    // return res.send({ status: true, message: "User Registered", code: 200 ,result:us})
  }
  catch (e) {
    throw e
  }
}

export const verifyOTP = async (req, res) => {
  const EMAIL = req.body.email;
  const OTP = req.body.otp;
  const newotp = Math.floor(Math.random() * 1234 + 1000);
  console.log("OLD ->", OTP, "NEW ->", newotp);
  const isValid = await admin.find({
    email: EMAIL,
    otp: OTP
  }).count();
  if (isValid) {
    // update
    const filter = {
      email: EMAIL,
      otp: OTP
    }
    const update = {
      verified: true,
      otp: newotp
    }
    await admin.findOneAndUpdate(filter, update);
    res.send({ status: true, message: "OTP VERIFIED SUCCESFULLY", result: {} })
  } else {
    res.send({ status: false, message: "Incorrect otp", result: {} })
  }
}

export const userLogin = async (req, res) => {
  const { email, password } = req.body;
  const result = await admin.findOne({ email });
  if (!result) {
    res.send({
      status: false,
      message: "Email is Incorrect!!!",
    });
  } else {
    const isValid = bcrypt.compareSync(password, result.password);

    if (isValid) {
      let payload = {};
      payload._id = result._id;

      jwt.sign(
        payload,
        "SECRET_KEY",
        {
          expiresIn: "24h",
        },
        (err, token) => {
          res.send({
            Token: token,
            status: true,
            statusCode: 200,
            message: "Success Login",
            result: result,
            role: result.role
          });
        }
      );
    } else {
      res.send({ status: false, message: "Password is incorrect" });
    }
  }
}

// export const adminSignup = async (req, res) => {
//     try {
//         const {  role,firstname,lastname,mobile,email, password } = req.body;
//         const admSignup = new admin({
//           role:"1",
//           firstname,lastname,mobile,
//             email,
//             password: bcrypt.hashSync(password, 8),
//         })
//         const adm = await admSignup.save();
//         return res.send({ status: true, message: "Admin Registered", code: 200 })
//     }
//     catch (e) {
//         throw e
//     }
// }

// export const adminLogin = async (req, res) => {
//     const { email, password } = req.body;
//     const result = await admin.findOne({ email });
//     if (!result) {
//       res.send({
//         status: false,
//         message: "Email is Incorrect!!!",
//       });
//     } else {
//       const isValid = bcrypt.compareSync(password, result.password);
//       if (isValid) {
//         let payload = {};
//         payload._id = result._id;
//         jwt.sign(
//           payload,
//           "SECRET_KEY",
//           {
//             expiresIn: "24h",
//           },
//           (err, token) => {
//             res.send({
//               Token: token,
//               status: true,
//               statusCode: 200,
//               message: "Success Login",
//               result: result,
//               role:result.role
//             });
//           }
//         );
//       } else {
//         res.send({ status: false, message: "Password is incorrect" });
//       }
//     }
//   };


export const adddBook = async (req, res) => {
  try {
    const addBook = new addbook({
      title: req.body.title,
      author: req.body.author,
      genre: req.body.genre,
      price: req.body.price,
      image: req.file.filename
    })
    const bookdata = await addBook.save();
    if (bookdata) {
      return res.send({
        status: true, message: "Book added", code: 200, data: {
          path: "http://localhost:8888/upload/" + req.file.filename
        },
        result: bookdata
      })
    }
  }
  catch (e) {
    throw e
  }
}

export const BookDetailById = async (req, res) => {
  const { _id } = req.query;
  console.log(_id);
  const BookDetail = await addbook.findById(_id);
  return res.send(
    { status: true, message: "success", code: 200, data: BookDetail }
  )
}

export const Booklist = async (req, res) => {
  try {
    const { limit, page } = req.body;
    const Data = await addbook.paginate({}, {limit, page})
    for (let key in Data.docs) {
        Data.docs[key].image = `http://localhost:8888/upload/${Data.docs[key].image}`
    }
    res.send({ status: 200, message: "Product List", result: Data })
}
catch (e) {
    res.send({ status: false, messgae: "No Results Found", Result: e });
} 
}

export const UpdateBook = async (req, res) => {
  try {
    let jsondata = {};

    if (req.body.title) {
      jsondata.title = req.body.title;
    }
    if (req.body.author) {
      jsondata.author = req.body.author;
    }
    if (req.body.genre) {
      jsondata.genre = req.body.genre;
    }
    if (req.body.price) {
      jsondata.price = req.body.price;
    }
    addbook.updateOne({ _id: req.body._id },
      { $set: jsondata },
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

export const bookDelete = async (req, res) => {
  const { _id } = req.params
  try {
    addbook.deleteOne({ _id: mongoose.Types.ObjectId(_id) },
      (error, result) => {
        if (error) {
          res.send({
            status: 404,
            message: "ERROR",
            result: error
          })
        }
        else {
          res.send({
            status: 200,
            message: "Success",
            result: result
          })
        }
      }
    )
  }
  catch (e) {
    throw e
  }
}

// payment--------------------------------------------------------
export const payment = async (req, res) => {
  const { title, price,order_id} = req.body;
  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price_data: {
          currency: 'usd',
          product_data: {
            name: title,
          },
          unit_amount: price,
        },
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: `http://localhost:3000/success/${order_id}`,
    cancel_url: 'http://localhost:3000/fail',
  });
  console.log("session", session)
  // res.send({url: session.url});
  res.send({ status: 200, message: "SUCCESS", result: session })
}

// search---------------------------------------------------------
export const bookSearch = async (req, res) => {
  try {
    const data = await addbook.find({   "$or": [
      { title: { $regex: req.params.key } },
      { price: { $regex: req.params.key } },
      { author: { $regex: req.params.key } },
  ] });

    for (let key in data) {
      data[key].image = `http://localhost:8888/upload/${data[key].image}`
    }
    res.send({
      status: 200,
      message: "Success",
      result: data
    })
  }
  catch (e) {
    throw e
  }
}

// forgot Password-------------------------------------------
export const forgotpassword =async(req,res)=>{
const { email } = req.body;
    if (email) {
        const user1 = await admin.findOne({ email: email })
        if (user1) {
            const secret = user1._id + "secret"
            console.log(user1._id)
            const token = jwt.sign({ userID: user1._id }, secret, { expiresIn: '5m' })
            sendemail("dhanshreebante29@gmail.com", req.body.email,
             "Forget Passoword",
                `<p>Click <a href="http://localhost:3000/reset/?userId=${user1._id}&token=${token}&' +  '">here</a> to reset your password</p>`
            )
            res.send({ status: true, message: "Password Reset Email Sent... Please Check Your Email" })
        } else {
            res.send({ status: false, message: "Email doesn't exists" })
        }
    } else {
        res.send({ status: false, message: "Email Field is Required" })
    }
}

//reset password -----------------------------------------------------
export const userPasswordReset = async (req, res) => {
    const { password, confirm_password } = req.body
    const { _id, token } = req.params
    const user1 = await admin.findById(_id)
    const new_secret = user1._id + "secret"
    try {
        jwt.verify(token, new_secret)
        if (password && confirm_password) {
            if (password !== confirm_password) {
                res.send({ status: false, message: "New Password and Confirm New Password doesn't match" })
            } else {
                const newHashPassword = await bcrypt.hashSync(password, 8)
                await admin.findByIdAndUpdate(user1._id, { $set: { password: newHashPassword } })
                res.send({ status: true, message: "Password Reset Successfully" })
            }
        } else {
            res.send({ status: false, message: "All Fields are Required" })
        }
    } catch (error) {
        res.send({ status: false, message: "Invalid Token" })
    }
}
