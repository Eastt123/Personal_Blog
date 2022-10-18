import React, { useState, useRef, useEffect } from "react";
import "./navStyles.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { getUser,getLogInStatus } from "../../features/blogsSlice";
// import image from "../../assets/Images/1.png"

const Navbar = () => {
  
  const [openBurgerMenu, setOpenBurgerMenu] = useState(false);
  const links = useRef(null);
  const linksContainer = useRef(null);
  const signup = useRef(null)
  const user = useSelector(getUser);
  const isloggedIn = useSelector(getLogInStatus);
  const handleResize = (e) => {
    const width =  window.innerWidth;
    console.log(width);
    if(width > 600){

        setOpenBurgerMenu(false);
    }
  }

 


  useEffect(()=>{
    const linksHeight = links.current.getBoundingClientRect().height;
    const signupHeight = signup.current.getBoundingClientRect().height;
    if(openBurgerMenu){
        window.addEventListener('resize', handleResize);

        linksContainer.current.style.height = linksHeight + signupHeight + "px"
    }else{

        linksContainer.current.style.height = 0 + "px"
    }

     return () => window.removeEventListener('resize', handleResize);

  }, [openBurgerMenu]);



  return (
    
    <nav>
      <div className="banner">
        <div className="heading">
          <div className="title">
              <Link to={'/'} >nordic rose</Link>
          </div>
          <div onClick={()=>{setOpenBurgerMenu((prevState) => !prevState)}} className="burger-menu">
            <div className="line"></div>
          </div>
        </div>

        <div ref={linksContainer} className="links">
          <ul ref={links}>
          <li>
              <Link to={'/'}>home</Link>
            </li>
            <li>
            <Link to={'createblog'}>Create Blog</Link>
            </li>
            <li>
            <Link to={'about'}>About</Link>
            </li>
            <li>
            {isloggedIn ? <input className="logout" type="button" value="Sign-Out" /> : <Link to={'login'}>Sign-in</Link>}
            </li>
            
          </ul>
          {isloggedIn ? <div className="user" ref={signup}> {user.name} {user.surename} </div> : 
          <Link ref={signup} className="sign-up" to={'/signup'}>Sign-up</Link>}
        </div>

      </div>
    </nav>


  );
};


export default Navbar;
