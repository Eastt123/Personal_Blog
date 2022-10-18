import React, {  useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import {  postBlog, editBlog,getBlogs } from "../../features/blogsSlice";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { getUser, getIsEditing } from '../../features/blogsSlice';
import { useParams } from "react-router-dom";
import "./createblog.css";
import { useEffect } from "react";
const CreateBlog = () => {
  const user = useSelector(getUser);
  const blogs = useSelector(getBlogs);
  const isEditing = useSelector(getIsEditing);
  const {id} = useParams();
  const [post, setPost] = useState({
    title: "",
    author: "",
    image: {
      name:"",
      src:""
    },
    text: "",
    tags:[]
  });
  const [tag, setTag] = useState([]);
  const [tagError,setTagError] = useState(false);
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const imageToBase64 = (image) => {
    const {name:imageName} = image;
    var reader = new FileReader();
    reader.readAsDataURL(image);
    reader.onload = async function () {
      const image = reader.result;
      setPost((prevState) => {
        return { ...prevState, image: {name:imageName, src:image} };
      });
    };
    reader.onerror = function (error) {
      console.log("Error: ", error);
    };
  };




  const handleData = (data) => {
    if (data.target.name === "image") {
      const image = data.target.files[0];
      imageToBase64(image);
    } else {
      setPost((prevState) => {
        return { ...prevState, [data.target.name]: data.target.value };
      });
    }
  };

  const onSubmit =  () => {
    if(checkTags() && !isEditing){
      dispatch(postBlog(post)).unwrap();
      // navigate("/", {replace:true})
    }else if(isEditing && checkTags()){
      dispatch(editBlog(post)).unwrap();
    }
    else{
      return
    }

  };

  const checkTags = () => {
    if(post.tags.length === 0){
      setTagError(true);
      return false
    }else{
      setTagError(false)
      return true
    }

  }

  const handleKeyDown = (e) =>{
    if(e.key !== "Enter") return;
    if(e.key === "Enter") e.preventDefault();
    const tag = e.target.value;
    if(!e.target.value.trim()) return
    checkTags();
    setPost((prevState) => {

      return {...prevState, tags:[...prevState.tags, tag]}

    });
    setTag("");
    setTagError(false);

  }

  const removeTag = (index) => {
    setPost((prevState) => {
      const newState = {...prevState};
      newState.tags = newState.tags.filter((tag, i) => i !== index );
      return newState;
    })
  }

  const submit = () => {

    handleSubmit(onSubmit)().then(()=>checkTags())

  }



useEffect(()=>{
  if(isEditing){
    const blogToEdit = blogs.find((item) => {
      return item._id === id;
    })
    setPost({...blogToEdit});    
    reset({...blogToEdit});
  }
// eslint-disable-next-line react-hooks/exhaustive-deps
},[blogs])

  return (
    <section>
      <div className="blog-title">
        <h2>Create Title</h2>
      </div>
      <form className="blog-form" onSubmit={handleSubmit(onSubmit)} >


        <div>
          <label className="title" htmlFor="title">
            Blog Title
          </label>
          <input
          placeholder="Title"
            value={post.title}
            type="text"
            {...register("title", {
              required: "Title is required",
              onChange: (e) => {

                handleData(e);

              },
            })}
          />
          {errors.title && (
            <label className="error">*{errors.title.message}</label>
          )}
        </div>
        <div>
          <label className="title" htmlFor="author">
            Author
          </label>

          <input
            value={post.author}
            type="text"
            {...register("author", {
              required: "Author is required",
              onChange: (e) => {
                handleData(e);
              },
            })}
          />
          {errors.author && (
            <label className="error">*{errors.author.message}</label>
          )}
        </div>

        <div>
          <div>
            <label className="title" htmlFor="text">
              Text
            </label>
            <textarea
              value={post.text}
              cols="30"
              rows="10"
              {...register("text", {
                required: "Text is Required",
                onChange: (e) => {
                  handleData(e);
                },
              })}
            ></textarea>
          </div>
          {errors.text && (
            <label className="error">*{errors.text.message}</label>
          )}
        </div>

        <div className="tags-container">

              {post.tags.map((tag, index) => {
                return(
                  <div key={index} className="tag-item">
                  <span className="text">{tag}</span>
                  <span onClick={()=>{removeTag(index)}} className="close">&times;</span>
                </div>
                )
              })}
            <input value={tag}
            autoFocus
            onChange={(e) =>{setTag(e.target.value)}}
            onKeyDown={(e)=>{
              handleKeyDown(e);
            }}
            type="text" placeholder="Add Tag" className="tag-input" />
          </div>
          {tagError && <label className="error">*Tags are required</label> }

        <div>
          <div>
            <label className="title" htmlFor="imagePicker">
              Select Image: {post.image.name}
            </label>
            <input
            id="imagePicker"
            style={{visibility:"hidden"}}
              type="file"
              {...register("image", {
                required: isEditing ? false : "image is required",
                onChange: (e) => {
                  e.preventDefault();
                  handleData(e);
                },
              })}
            />
          </div>
          {errors.image && (
            <label className="error">{errors.image.message}</label>
          )}
        </div>

          {isEditing ? 

<input
className="submit-btn"
type="button"
value={"Edit Blog"}
onClick={submit}
/>

         : 
         <input
         className="submit-btn"
         type="button"
         value={"Create Blog11"}
         onClick={submit}
       />
        
        }
      </form>
    </section>
  );
};

export default CreateBlog;
