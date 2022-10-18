import mongoose from "mongoose";
import { Model, Schema, model } from 'mongoose';
import bcrypt from "bcrypt";

interface IUser{
    name:string,
    surename:string,
    email:string,
    password:string
}

interface UserModel extends Model<IUser> {
    findByEmail(email, password): any;
  }

const userSchema = new mongoose.Schema<IUser, UserModel>({
    name:{
        type:String,
        required:true,
    },
    surename:{
        type:String,
        required:true
    },
    email:{
        type:String,
        unique:true,
        required:true,
    },
    password:{
        type:String,
        required:true,

    }

},
{
    timestamps:true
}
);

userSchema.virtual("blogs",{
    ref:"blog",
    localField:"_id",
    foreignField:"owner"
});


userSchema.methods.toJSON = function(){
//     const user = this
//     const userObject = user.toObject();
//        delete userObject.password;
//        delete userObject.tokens;
//        delete userObject.avatar
//    return userObject;
}


userSchema.static("findByEmail", async (email, password) => {

        const user = await User.findOne({email});

    if(!user){
        throw new Error("Incorrect Email or Password");
    }
    const isMatch = bcrypt.compare(password, user.password);

    if(!isMatch){
        throw new Error("Incorrect Email or Password");
    }
    return user;

})

userSchema.pre("save", async function(next){
    const user = this;

    if(user.isModified("password")){
        user.password = await bcrypt.hash(user.password, 8);
    }

    next()
})

const User =  mongoose.model<IUser, UserModel>("User", userSchema);
export default User;