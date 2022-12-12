import express from "express";
import bodyParser from 'body-parser';
import cors from 'cors';
import adminroute from './route/adminroute'
import orderRoute from './route/orderRoute'
import{mongoconnection} from './db';

const app=express();
mongoconnection();
app.use(cors({origin : '*'}));

app.use(bodyParser.urlencoded({
    extended:true
}));

app.use(bodyParser.json());
app.use("/admin",adminroute)
app.use("/order",orderRoute)

app.use("/upload",express.static("uploads"))

export default app;
