import axios from "axios";

const API = axios.create({baseURL: "http://localhost:3001"});


export const fetchBlogs = () => API.get("/blogs", {withCredentials:true})