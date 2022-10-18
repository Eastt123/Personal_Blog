import mongoose from "mongoose";
import {Request, Response} from "express";
import blog from "../models/blogModel";

export const getBlog = async (req:Request, res:Response) => {
        const sort = {};
        const perPage = 12;
        let page = 1;

        if(req.query.pageNumber){
           page = parseInt(req.query.pageNumber.toString());
        }
        
        if(req.query.sortBy){
            const parts = req.query.sortBy.toString().split(":");
            console.log(parts);
            
            sort[parts[0]] = parts[1] === "desc" ? -1 : 1;
        }

        const totalBlogs = await blog.count();

    try {
        const blogs = await blog.find().sort(sort).skip(perPage * (page - 1)).limit(8);

        const user = req.user;
        if(req.user){
            res.status(200).json({blogs, user,
                paginationData:{
                    totalPages: Math.ceil(totalBlogs / perPage),
                    currentPage: page,
                    totalResults: totalBlogs,
                    showingFrom: perPage * (page - 1 ) + 1,
                    showingUntil: perPage * page > totalBlogs ? totalBlogs : perPage * page
                }

            });

        }else{
            res.status(200).json({blogs,
                paginationData:{
                    totalPages: Math.ceil(totalBlogs / perPage),
                    currentPage: page,
                    totalResults: totalBlogs,
                    showingFrom: perPage * (page - 1 ) + 1,
                    showingUntil: perPage * page > totalBlogs ? totalBlogs : perPage * page
                }

            });
        }


    } catch (error) {
        console.log(error);
    }
}



export const createBlog = async (req:Request, res:Response) => {
    
    const {title, author, image, text, tags} = req.body;

    const blogPost = {
        title:title,
        author:author,
        text:text,
        tags:tags,
        image: image
    }

    const newBlog = new blog({...req.body, authorID:req.user._id})

    try {

       await newBlog.save();

       res.status(201).json(newBlog);


    } catch (error) {
        res.status(409).json({message:error.message})

    }
}

export const deleteBlog = async (req:Request, res:Response) => {
    const {id} = req.params;
    if(!mongoose.Types.ObjectId.isValid(id) ) return res.status(406).json({message:"invalid ID"});

    await blog.findByIdAndRemove({_id:id});
    res.json({message:" Deleted successfully"})



}

export const editPost = async (req:Request, res:Response) => {
    
    try {
        const {_id:id} = req.body;
        const {_id:authorID} = req.user;
        const blogToUpdate = (({title, author, text, tags, image}) => ({title, author, text, tags, image}))(req.body);
        
        await blog.findById(id).then( async (dbBlog) => {
            if(dbBlog.authorID.toString() === authorID.toString()){
                
            const newBlog = await blog.findOneAndUpdate({_id:id}, blogToUpdate, {new:true});
            res.status(200).json(newBlog);
            }else{
                throw Error("something went wrong")
            }
            
        })

    } catch (error) {
        console.log(error);
        
    }
    

}


export const getBlogBySearch = async (req:Request, res:Response) => {
    const blogTitle = req.body.title;
    const regexp = new RegExp(`^${blogTitle}`, "i");
    if(!blogTitle){
        res.status(200).send([]);
    }
    
    try {
        await blog.find({title: regexp})
        .then((blogs) =>{
            res.status(200).send(blogs);
        });
        
    } catch (error) {
        console.log(error);
        
    }
    
}

export const getBlogById = async (req: Request, res:Response) => {
    try {
        const id = req.body.id;
        const foundBlog = await blog.findById({_id:id});
        res.status(200).send(foundBlog);

    } catch (error) {
        console.log(error);
        
    }
    

}

export const likeBlog = async (req:Request, res:Response) => {

}


