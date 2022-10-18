import mongoose from "mongoose";

const blogShcema = new mongoose.Schema({
    title: String,
    author:String,
    text:String,
    tags:[String],
    image:{
        name: String,
        src: String
    },
    authorID:{
        type: mongoose.Schema.Types.ObjectId,
        required:true
    },
    owner:{
        type: mongoose.Schema.Types.ObjectId,
        require:true,
        ref:"user"
    }
   
    
},
{
    timestamps:true,
}
);




const blog = mongoose.model("Blog", blogShcema);

export default blog;