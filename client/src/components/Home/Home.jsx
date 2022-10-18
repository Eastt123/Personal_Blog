import React from 'react';
import "./home.css";
import image from "../../assets/Images/1.png";
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllBlogs, 
    getPaginationData, 
    searchBlog,
    getBlogs, 
    getLoading, 
    seatchedBlog  } from '../../features/blogsSlice';
import { Link } from 'react-router-dom';
import {useDebouncedCallback} from "use-debounce"
import { useEffect } from 'react';

const Home = () => {
    const dispatch = useDispatch();
    const blogs = useSelector(getBlogs);
    const isLoading = useSelector(getLoading);
    const searchedBlogs = useSelector(seatchedBlog);
    const {totalPages, currentPage} = useSelector(getPaginationData)
    const pages = Array(totalPages).fill(null).map((page, index) => index);
    
    const debounced = useDebouncedCallback(
        (value) => {
            dispatch(searchBlog(value));
        },
        500
    );
    
    
    const setActive = (pageNumber) => {
        const title = document.getElementById("title");
            const offsetTop = title.offsetTop;
            window.scrollTo(0, offsetTop);

        const pages = document.querySelectorAll(".page");
        pages.forEach((page) => {
            if(parseInt(page.innerHTML) === parseInt(pageNumber)){
                page.classList.add("selected")
            }else{
                page.classList.remove("selected")
            }
        })
    }

    const changePage = (e) => {
        const pageNumber = e.target.innerHTML;
        setActive(pageNumber);        
        dispatch(fetchAllBlogs(`pageNumber=${pageNumber}`));
    }

    const nextPage = () => {
        if(parseInt(currentPage) === parseInt(totalPages)){
            setActive(1)
        dispatch(fetchAllBlogs(`pageNumber=${1}`));
        }else{
            setActive(currentPage + 1)
            dispatch(fetchAllBlogs(`pageNumber=${currentPage + 1}`));
        }
    }

    const prevPage = () => {
        if(parseInt(currentPage) === 1){
            dispatch(fetchAllBlogs(`pageNumber=${totalPages}`));
            setActive(totalPages)
        }else{
        dispatch(fetchAllBlogs(`pageNumber=${currentPage - 1}`));
        setActive(currentPage - 1)
        }
    }


    

    if(isLoading){
        return (
            <div>
                <h1>LOADING...</h1>
            </div>
        )
    }
    return (
        <main>
            <div className='search-container'>
                <label htmlFor="">Search Blog: </label>
                <div className='input-container'>
                <input onChange={(e) =>{
                    debounced(e.target.value);
                    }} className='search-bar' type="text" placeholder='Search Blog' />
                    
                    {searchedBlogs &&  <div className='blogs'>{searchedBlogs.map((blog, index) => {
                return <Link to={`/${blog._id}`} key={index}>
                    <div className='searched-blog'>
                        <img className='blog-icon' src={blog.image.src} alt="no-img" />
                        <h5>{blog.title}</h5>
                    </div>
                </Link>
            })}</div> }
                </div>
            </div>

            <div className="landing-img-container">

            <img className='landing-img' src={image} alt="" />

            </div>

            <div className="title-container">
                <h1 className='title'>A few words about this blog platform, Ghost, and how this site was made</h1>
                <p>Why Ghost (& Figma) instead of Medium, WordPress or other options?</p>
            </div>
            <div className="break-line"></div>
            <section>
                <div className="section-title">
                    <h1 id='title' className='title'><span>all</span> articles</h1>
                </div>
                <div className="articles-container">
                {blogs.map((blog) => {
                    return (
                        
                        <article key={(blog._id)}>
                            <img className='article-image' src={blog.image.src} alt="" />
                            <Link to={`/${blog._id}`} >{blog.title}</Link>
                        </article>
                    )
                })}

                </div>
                <div className='page-container'>
                    <div className="pages">
                    <button
                    className='page-buttons'
                    onClick={(e)=>{prevPage();}}
                    > {"<"} </button>

                        {pages.map((page, index) => {
                            return (
                                <div 
                                className={`page ${index === 0 ? "selected" : ""}`}  
                                key={index}
                                onClick={(e) => changePage(e) }
                                >
                                    {page + 1}

                                </div>
                            )
                        })}
                         <button
                         className='page-buttons'
                         onClick={(e)=>{nextPage();}}
                         > {">"} </button>
                    </div>
                </div>
            </section>

        </main>
    );
};
export default Home;