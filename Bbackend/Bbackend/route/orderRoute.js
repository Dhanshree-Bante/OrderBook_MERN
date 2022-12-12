import express from "express";
import {addOrder,orderDetailById,UpdateOrder} from '../controller/orderController';

const router =express.Router();

router.post("/addOrder",addOrder);
router.get("/orderDetailById",orderDetailById)
router.put("/UpdateOrder",UpdateOrder)

export default router;