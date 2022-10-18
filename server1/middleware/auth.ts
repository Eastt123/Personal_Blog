import { Request, Response, Express } from "express";
import User from "../models/userModel";
import mongoose from "mongoose";
const sessionSchema = new mongoose.Schema({
    _id:{
        type:String,
        required:true
    },
    expires:{
        type:Date
    }
    ,
    session:{
        type:Object,
        required:true
    }
});



const sessionDB = mongoose.model("session", sessionSchema);

const isAuth = async (req: Request, res: Response, next: any) => {
        
    const sessionID = req.sessionID;
            
    try {

        const session = await sessionDB.findById(sessionID);
        if(session){
        const _id = session.session.userID.toString();

        const user = await User.findById({_id});
            console.log(user);
            
        if(!user){
            throw Error()
        }
        
        req.user = user; 

            next();
        }else{
            
            next();
        }    
       

    } catch (error) {
        res.status(401).send({error:"Please authenticate"})
    }



//   next()



}


export default isAuth;
