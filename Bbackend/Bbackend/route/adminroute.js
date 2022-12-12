import express from "express";
import {userSignup,userLogin,verifyOTP,adddBook,Booklist,UpdateBook,BookDetailById,bookDelete,payment,bookSearch, forgotpassword, userPasswordReset} from '../controller/adminController'
import { upload } from '../middleware/Uploadfile';
import { verifyUser } from "../middleware/isVerified";

const router =express.Router();

router.post("/userSignup",userSignup);
router.post("/userLogin",[verifyUser],userLogin)
router.post("/verifyOTP",verifyOTP)

router.post("/forgotpassword",forgotpassword)
router.post("/userPasswordReset/:_id/:token",userPasswordReset)

router.post("/addbook",upload.single('image'),adddBook)
router.post("/booklist",Booklist)
router.put("/updatebook",UpdateBook)
router.get("/getbookdetailById",BookDetailById);
router.delete("/bookDelete/:_id",bookDelete)
router.post("/bookSearch/:key",bookSearch)

router.post("/payment",payment)
export default router;
