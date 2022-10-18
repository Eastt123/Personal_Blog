import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {fetchBlogs} from "../api/index";
import axios from 'axios';



export const fetchAllBlogs = createAsyncThunk(
  'blogs/fetchAllBlogs', async (urlParams) => {
    
    try {
      const response = await axios
      .get(`http://localhost:3001/blogs?${urlParams}`, {withCredentials:true});
      // console.log(response);
      // const response = await fetchBlogs();
      console.log(response);
      return response.data
    } catch (error) {
        return error.message
    }

  }
)

export const searchBlog = createAsyncThunk("/blogs/searchBlog", async (blogTitle) => {
  const response = await axios.post("http://localhost:3001/blogs/search", {title:blogTitle}, {withCredentials:true});
  return response.data;
})

export const editBlog = createAsyncThunk("blogs/editBlog", async (blog) =>{
  const response = await axios
      .patch("http://localhost:3001/blogs/editblog", blog, { withCredentials: true });
    return response.data;
})

export const postBlog = createAsyncThunk("blogs/postBlog", async (blog)=>{
   const response = await axios
      .post("http://localhost:3001/blogs", blog, { withCredentials: true });

    return response.data;

})

export const registerUser = createAsyncThunk("blogs/registerUser", async (user) => {
  const response = await axios.post("http://localhost:3001/signup", user, { withCredentials: true });
  console.log(response);
})

export const logIn = createAsyncThunk("/login", async (user) => {
 const response = await axios.post("http://localhost:3001/signup/login", user , { withCredentials: true })
  .then((response) => {
    return response.data;
  }).catch((error) => {
    console.log(error);
  })

  return response;


})
export const fetchBlogById = createAsyncThunk("blogs/fetchBlogById", async (blogId) => {
  const response = await axios.post("http://localhost:3001/blogs/:id", {id:blogId}, {withCredentials:true});
  return response.data;
  
})

const blogSlice = createSlice({
  name:"blogs",
  initialState:{
    loading:true,
    loadingBlog:true,
    status:"idle",
    blogs:[],
    seatchedBlog:[],
    blog:{},
    user:{},
    paginationData:{},
    loggedIn:false,
    isEditing:false
  },
  reducers:{
    Editing(state){
      state.isEditing = true;
    }
  },
  extraReducers:(builder) => {

    builder.addCase(fetchAllBlogs.pending, (state, action) =>{
      state.status = "loading";
    })
    builder.addCase(fetchAllBlogs.fulfilled, (state, action)=>{
        state.status = "succeeded";
        const {user, blogs, paginationData} = action.payload
        const loadedPosts = blogs;

        if(user){
          state.user = user;
          state.loggedIn = true;
        }
        state.paginationData = paginationData;
      //  state.blogs = state.blogs.concat(loadedPosts);
      state.blogs = loadedPosts;
       state.loading = false;
    });

    builder.addCase(postBlog.fulfilled,(state, action)=>{
      const blog = action.payload;
        state.blogs.push(blog);
    });

    

    builder.addCase(logIn.fulfilled, (state, action) => {
      const user = {...action.payload};
      state.user = user;
      state.loggedIn = true;
    });

    builder.addCase(editBlog.fulfilled,(state, action) =>{
      const newBlogs = state.blogs.map((blog) => {
        if(blog._id.toString() === action.payload._id){
          return blog = action.payload
        }else{
          return blog
        }
      });
      state.blogs = newBlogs;
      state.isEditing = false;
    });

    builder.addCase(searchBlog.fulfilled, (state, action) => {
      state.seatchedBlog = action.payload;
    });

    builder.addCase(fetchBlogById.pending, (state, action) =>{
      state.loadingBlog = true;
    });

    builder.addCase(fetchBlogById.fulfilled, (state, action) => {
      const date = new Date(action.payload.createdAt);
      let blog = action.payload;
      blog.createdAt = date.toLocaleString().replaceAll("/", "-");
      state.blog = action.payload;
      state.loadingBlog = false;
    })



  }
});


export const getBlogs = (state) => state.blogs.blogs;
export const getBlog = (state) => state.blogs.blog;
export const seatchedBlog = (state) => state.blogs.seatchedBlog;
export const getStatus = (state) => state.blogs.status;
export const getState = (state) => state;
export const getUser = (state) => state.blogs.user;
export const getLogInStatus = (state) => state.blogs.loggedIn;
export const getLoading = (state) => state.blogs.loading;
export const getLoadingBlog = (state) => state.blogs.loadingBlog;
export const getIsEditing = (state) => state.blogs.isEditing;
export const getPaginationData = (state) => state.blogs.paginationData;
export const {Editing} = blogSlice.actions;
export default blogSlice.reducer