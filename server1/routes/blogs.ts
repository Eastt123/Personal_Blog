const Express =  require("express");
import {
    getBlog,
    createBlog,
    getBlogById,
    deleteBlog,
    editPost,
    getBlogBySearch,
    likeBlog
} from "../controllers/blog";
import isAuth from "../middleware/auth";



const router = Express.Router();
router.post("/search", isAuth ,getBlogBySearch);
router.get("/",isAuth ,getBlog);
router.post("/", isAuth, createBlog);
router.post("/:id", getBlogById);
router.delete("/:id",isAuth ,deleteBlog);
router.patch("/editblog",isAuth ,editPost);
router.patch("/:id/likeblog", isAuth,likeBlog);


export default router;