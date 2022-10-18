import {Request, Response} from "express";
import mongoose from "mongoose"
declare global {
    namespace Express {
        interface Request {
            user: {
                _id: object
                name:string,
                surename:string,
                email:string,
                password:string
            };
        }
        
        interface Response {
                data:string
        }
    }
}
