import {configureStore} from "@reduxjs/toolkit";
import blogs from "../features/blogsSlice";

export const store = configureStore({
    reducer:{
        blogs,
    }
})