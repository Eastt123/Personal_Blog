import {Request, Response} from "express";
import User from "../models/userModel";

declare module "express-session" {
    interface SessionData {
      isAuth: Boolean,
      userID: string,
      name:string
    }
  }


export const signup = async (req: Request, res:Response) => {

    const user = new User({...req.body});

    await user.save();
    res.status(201).send(user);


}




export const signin = async (req: Request, res:Response) => {
    const {email, password} = req.body;

    try {
      const user = await User.findByEmail(email, password);
      req.session.isAuth = true;
      req.session.userID = user._id;
      req.session.name = "djakllas";
      
      res.status(200).send(user)
    } catch (error) {
      console.log(error);

    }



}