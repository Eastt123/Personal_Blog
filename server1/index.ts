import Express from "express";
import { Request, Response } from "express";
import bodyParser from "body-parser";
import "dotenv/config";
import cors from "cors";
import blogRoutes from "./routes/blogs";
import userRoutes from "./routes/user";
import mongoose from "mongoose";
import session from "express-session";
const mongoDBSession = require("connect-mongodb-session")(session);


const PORT = process.env.PORT || 4000;
// console.log(PORT)
const server = Express();
const store = new mongoDBSession({
    url:"mongodb://127.0.0.1:27017",
    collection:"sessions",
    expires: 5000000
})


server.use(bodyParser.json({limit:"30mb"}));
server.use(bodyParser.urlencoded({extended:true}));
server.use(cors({
    origin:"http://localhost:3000",
    credentials:true
}));
server.use(session({
    secret:"Shota",
    resave:false,
    saveUninitialized: false,
    store:store
}));



server.use("/blogs", blogRoutes);
server.use("/signup", userRoutes);



mongoose.connect("mongodb://127.0.0.1:27017").then(()=>{
    server.listen(PORT, ()=> console.log(`Server is up on ${PORT}`));
}).catch((error)=>{
    console.log(error);
})


