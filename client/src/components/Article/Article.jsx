import React, { useEffect } from "react";
import image from "../../assets/Images/1.png";
import "./article.css";
import img from "../../assets/Images/12.png";
import img2 from "../../assets/Images/5.png";
import { useParams, useNavigate } from "react-router-dom";
import { fetchBlogById , getBlog , getBlogs , getLoadingBlog } from "../../features/blogsSlice";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { Link } from "react-router-dom";
import Blog from "./blog/blog";
import { Editing } from "../../features/blogsSlice";

const Article = () => {
  const loading = useSelector(getLoadingBlog);
  const blog = useSelector(getBlog)
  const {id} = useParams();
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);


  useEffect(()=>{

    dispatch(fetchBlogById(id)); 
    
  },[])

  if(loading){
    return(
      <h1>Loading...</h1>
    )
  }


  return (
    <article>
      <div className="landing-img-container">
        <img className="landing-img" src={image} alt="" />
      </div>

      <div className="title-container">
        <h1 className="title">
          A few words about this blog platform, Ghost, and how this site was
          made
        </h1>
        <p>
          Why Ghost (& Figma) instead of Medium, WordPress or other options?
        </p>
      </div>
      <div className="break-line"></div>


      <div className="author-container">
        <div className="icon-author">
          <div className="icon">
            <img src={img} alt="" />
          </div>
          <div className="author">
            <h4>{blog.author}</h4>
            <p>{blog.createdAt}</p>
          </div>
        </div>


        <div className="social">
          <div className="social-icon">
            <img
              alt="facebook"
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAABmJLR0QA/wD/AP+gvaeTAAAExUlEQVRoge2abWjXVRTHP3+XfyhbNR2CT1m52WgQFQxBiI0odUlmJg18FaUj8UWvsnwTCUYFQUFFEBFk2IO9qJCwMLSRGmmagx4Ws8BSbBs+tbXqn9u/F+f8und3v4f7e/jnm33hx+F/fueeh9+599xz7wZTmEJNUCpQ15XA7UA70Ao0A7OVDzACDAD9wHdAD7Bf+ZccJaAT2An8BVRTPn8C7wIrKPajpsJaoNdy6iJwANgGrAFuAhqA6fo0IJlaAzwNHNQxwfhjwH3/ZwBNwB7LgRPAY8DcDLrmAZuBXyx9nwA3FOJpDNYBv6vBAWA98rXzogx0A0Oq+wLQVYDeSSghUyb4atuRqVI0ZgI7LDtbi1ReAl5RxX8DDxWpPALdQEVtvlSU0iATI8DyopR6oBP4A8/MJJW8dUiqK8Aq4NOczi1C9peZmEp3ATiDLPghR74T+AhZh11ImU+NJszCzjOdGoAnmViZop5bQsZ367vzZKxmQYndnmWwog04iXH0NLAbyfIO5Avvw0yhsEDAFIDdaR1YiymxWatTCzCsenqApTGy3xAfyCxMab7X14ESZsde7zsoRMcR1fE2cFmCfFIgAI+ozFE825lOzI6ddbNbZumYEfK+EegA7tTnOMmBlIFfVc6reu5U4c2+XofgzRgdW4huMOMCAXhC5d5JcqAe6Ugvkq13CtCvBm92+F3KryAN5h7nWZSgdwEwBowCV8QJBtPqQErHbZQxXUCd8+6wvtuUQ/9XqmOZzZzmCLUr3ZfD0DVKzyNfL0AZuA34B5l6WbFXaYfNdANpVXo0h6F6pcMOf7baGyTfqfCI0lab6QayWOmPOQwFpbHq8IMjrxtgWvQpXWwz3UAalZ7OaayW+E1po810Nyr7osAHq4E3HJ77cVw0A2cj3i1HCkIcgozW20w3kKhpEYUy6VuYupgxP3uMD3ybsLu7gYyokRlI1fHFh0zukMed3/1I++5iDnI9NIS080kIXWtuIINIIPNJF0gFOJcgMxYhc6tS3wIzT+mAzXTn83GlzZ5Ki8CNSvtipQwC336ymW5GeoGVyDnigxTOtACPO7xzwGvW71mEd9MrlPpmZInS3jihlchi+tJT6QNEn/b6HdmWGNkqcI+nzaBFmdABuxn5HGnIliBz8VSC0j7gOYfXgBxPo3AGeD2E/3WCLZC124acKL9IEn4fiXibh+IwNBGfkR8y6gVzo/Oej/BdmMP+1RmM1SqQq5B1VwXucF+G7cKfAd8iQWzIaLQW2Ih01scwHXAiVmGysjClwVpkZD7S1lSRM1MqBNdBe0nun2wUHcg0pAgFN/WpcR3mgs7dI+JQdCBbMLNjQcqx/2E10jONI3PUB0UG8jDS2owje1YubFUHxoAHPeSLCmQDEkAVeMpzTCJexATzLPH3XXkDmQ48gwni+Qz+xuJRS/lhxOEw5AnkeuQGp6q2CsuEi/sxm9Iokqk5jkyWQOYCL2Aus88ifzStKRYCuzDN3ijwMnKVVEe6QNqAV5l487gLuLZ27k/G3cAhy4Eq0hB+THwgg8i91gln7CHVecnQDryF2XPStPHDyN9fOsiJpOt+H/ToU0b+hWMpcny93JEbQ9r+75FD0X59KgX4MIUp1Ar/AvMwjImqcry6AAAAAElFTkSuQmCC"
            />
          </div>
          <div className="social-icon">
            <img
              alt="twitter"
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAABmJLR0QA/wD/AP+gvaeTAAABjElEQVRIie3Wv0vVURjH8ZdKEojYD9ocHTTE1RYTIxAy3ARRaBcM+hfEWaJoaysaxEGJWhpadBSHEBx0KYWWCkJIM38N537hcvvec7/n3tuSfuDZzvm8z/OcH8/hUv+7WprkcxUPMYAzfMJ7HFaMa8dRnsFtXEuEjmC3BCyPzxjGDUzjAzqrmbzCamxAhe7gIAeaxRGOcYopkQpvliaso7sAeCMCzeIUy1jA42pG22UTvmEyAu0rAC2PJbRVM1vJmbCKB/4u03gC9CVaI0lEzb7gGSZK2Y4lgCdiULiC1wmGRWO4ElSZ/oZwGL7XWmGivtYa8E7zs90XHo6oRv8B+G0taKb5JoNnioLhEfaaAP2hyiuYd7daMYQt/E5ZbY6eC3tcWE80nu0erqeutAUvGoCe4F4qtFz3hVOZ1/ZiMdcINFMv1hKgTzXwwegQ7vQi/hQEHoq0vZiGhO/KjtDAU0r7Ef31QDN1YVb4CNSC/cQb3K0HFNuLWxhED24KneuXcE02hYZyXA/0UhdD5+q+K5z2ztKIAAAAAElFTkSuQmCC"
            />
          </div>
          <div className="social-icon">
            <img
              alt="viber"
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAABmJLR0QA/wD/AP+gvaeTAAAECklEQVRoge3ZW4hVdRTH8c9EWZoaNpYYVhhdrMipKMKwh6KQMCGjC2RFL+VbL93IEiKELhARdLEeukCRFhVhBPpS9KIUUnZFQ+yCkqA0NeY06szpYe2Dp+Oes/97z56ZBvzBgv8Ma63//7v3f6//5XBURzUq6qohx3RchPnowTzMwik4uaWPP9CHXvyCn7Ed3+Fr7K1hLKV1JlbiSwyhMUIbwrd4DleMBUAPPsRgDYPvZN9jmXpmzH80FS+q5+mXsU1i2taiuWIejyVAq/Vh6Ugh5ogPc7wgmnYIN1SFOF5Uk/GGaFqvKDKltaqGzu8XBaIbk3EWFuEF7KqQb21ZiFOxrwaQ7g59TMZD4kmn5hvChWVAHihIuA8rxBM+He8P47cT32AP9osF8G3ciGOyvs7D1hIwT5cB2dghUS8uaPM/DuuH8b8J08QbOBv3ZPk345IsvhvbEkG2pUJMwYEOiZYPEzcdW3L8z8/x7cLt2I3F2f/m4a8EkCGx/SnU/IJEMzvEXipKZav/gWyA+0UVXCEWWLgsg+nJ/l6RANLAkhSQpQVJZhTEv5wTcyVOxNVYh59wTua/DF+ItzQlAysCeTwFpOhDv7kgfqYjp+bCNp9HM5ipGcAmhxe8VxJA3kgByXuirba+IP4E/J0TtxNPYVLmtw6PZO178XrWXpIA8mkKyIaCJIMOT4t2TcI7BfFPZr7X4KusfS5+yNrzEkC2p4CklMHVOXFd+CQhdmfmP028OeLb6M3aJyXk2J0C8ntCon6xELbq4oS41m/mKlHNiNK9K2vPTohvQndU6tbkvba405Q/cA2IdeYuUbng8oS4f1JAygzmurbY4bYqKfarOOunbFYHUkD6S3T+m7hgaOoM+RWrbtuTArK3ZNL2KbZ8DEB2pIDsqJD4wbYcK0cZZEsKyGcVEg/ilrY8t+HPHN8nROmdi2dxsEJ/G1JAXquQuCG+rfZz9RyxUxjIfF7K6W+BuKwr01feOnaEivZanWxA/l5sliPPMK2agQ9K9HNfCsiCEYA0xDb+YeUv17rwamIfSbeRk9RTQteIFbuMZiXk7XV441moNTWANMSd2LUlQHoScr5VIp/FNYE0xNH0TfHhF2ltQr7ry4AcKy6S64JpiOm6Sv5RuUvaMXerChfbi2oGado+PC/O65PFMfjzxNhby0I0tXqUYKrYuqoQxBT7+H8AsVn5CpgL84yx/22kaR8pvrkppYXi9VbZG1WxHbjbKPxq1dRsPDZKg+/Du2Kbk7zoMTLaRoLPkNgBHxTVql8cU/vE3cBucVbfJW4hfxQ76TFVpyd7UFxeTwgNB3FIXFBPGA0Hccd4DqqK2iEGcee4jqii2t/EhIRggk+nVg2Jo+2EqU4TQv8CAgKVWkEN6R4AAAAASUVORK5CYII="
            />
          </div>
        </div>
      </div>
      
      {isEditing ? null : <Blog {...blog}/> }
      {/* <Blog {...blog}/> */}
      {/* <div className="edit-button-container" >
        <button className="edit-button" type="button" onClick={(e) =>{console.log("12")}} >Edit Blog</button>
      </div> */}
      <div className="edit-link">
      <Link to={`/editblog/${id}`} onClick={()=>{dispatch(Editing())}} >Edit Blog</Link>
      {/* <input className="edit-button" value="Delete Blog" /> */}
      <button className="edit-button" >Delete Blog</button>
      </div>


      <div className="share">Share:</div>

      <div className="social-bottom">
          <div className="social-icon">
            <img
              alt="facebook"
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAABmJLR0QA/wD/AP+gvaeTAAAExUlEQVRoge2abWjXVRTHP3+XfyhbNR2CT1m52WgQFQxBiI0odUlmJg18FaUj8UWvsnwTCUYFQUFFEBFk2IO9qJCwMLSRGmmagx4Ws8BSbBs+tbXqn9u/F+f8und3v4f7e/jnm33hx+F/fueeh9+599xz7wZTmEJNUCpQ15XA7UA70Ao0A7OVDzACDAD9wHdAD7Bf+ZccJaAT2An8BVRTPn8C7wIrKPajpsJaoNdy6iJwANgGrAFuAhqA6fo0IJlaAzwNHNQxwfhjwH3/ZwBNwB7LgRPAY8DcDLrmAZuBXyx9nwA3FOJpDNYBv6vBAWA98rXzogx0A0Oq+wLQVYDeSSghUyb4atuRqVI0ZgI7LDtbi1ReAl5RxX8DDxWpPALdQEVtvlSU0iATI8DyopR6oBP4A8/MJJW8dUiqK8Aq4NOczi1C9peZmEp3ATiDLPghR74T+AhZh11ImU+NJszCzjOdGoAnmViZop5bQsZ367vzZKxmQYndnmWwog04iXH0NLAbyfIO5Avvw0yhsEDAFIDdaR1YiymxWatTCzCsenqApTGy3xAfyCxMab7X14ESZsde7zsoRMcR1fE2cFmCfFIgAI+ozFE825lOzI6ddbNbZumYEfK+EegA7tTnOMmBlIFfVc6reu5U4c2+XofgzRgdW4huMOMCAXhC5d5JcqAe6Ugvkq13CtCvBm92+F3KryAN5h7nWZSgdwEwBowCV8QJBtPqQErHbZQxXUCd8+6wvtuUQ/9XqmOZzZzmCLUr3ZfD0DVKzyNfL0AZuA34B5l6WbFXaYfNdANpVXo0h6F6pcMOf7baGyTfqfCI0lab6QayWOmPOQwFpbHq8IMjrxtgWvQpXWwz3UAalZ7OaayW+E1po810Nyr7osAHq4E3HJ77cVw0A2cj3i1HCkIcgozW20w3kKhpEYUy6VuYupgxP3uMD3ybsLu7gYyokRlI1fHFh0zukMed3/1I++5iDnI9NIS080kIXWtuIINIIPNJF0gFOJcgMxYhc6tS3wIzT+mAzXTn83GlzZ5Ki8CNSvtipQwC336ymW5GeoGVyDnigxTOtACPO7xzwGvW71mEd9MrlPpmZInS3jihlchi+tJT6QNEn/b6HdmWGNkqcI+nzaBFmdABuxn5HGnIliBz8VSC0j7gOYfXgBxPo3AGeD2E/3WCLZC124acKL9IEn4fiXibh+IwNBGfkR8y6gVzo/Oej/BdmMP+1RmM1SqQq5B1VwXucF+G7cKfAd8iQWzIaLQW2Ih01scwHXAiVmGysjClwVpkZD7S1lSRM1MqBNdBe0nun2wUHcg0pAgFN/WpcR3mgs7dI+JQdCBbMLNjQcqx/2E10jONI3PUB0UG8jDS2owje1YubFUHxoAHPeSLCmQDEkAVeMpzTCJexATzLPH3XXkDmQ48gwni+Qz+xuJRS/lhxOEw5AnkeuQGp6q2CsuEi/sxm9Iokqk5jkyWQOYCL2Aus88ifzStKRYCuzDN3ijwMnKVVEe6QNqAV5l487gLuLZ27k/G3cAhy4Eq0hB+THwgg8i91gln7CHVecnQDryF2XPStPHDyN9fOsiJpOt+H/ToU0b+hWMpcny93JEbQ9r+75FD0X59KgX4MIUp1Ar/AvMwjImqcry6AAAAAElFTkSuQmCC"
            />
          </div>
          <div className="social-icon">
            <img
              alt="twitter"
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAABmJLR0QA/wD/AP+gvaeTAAABjElEQVRIie3Wv0vVURjH8ZdKEojYD9ocHTTE1RYTIxAy3ARRaBcM+hfEWaJoaysaxEGJWhpadBSHEBx0KYWWCkJIM38N537hcvvec7/n3tuSfuDZzvm8z/OcH8/hUv+7WprkcxUPMYAzfMJ7HFaMa8dRnsFtXEuEjmC3BCyPzxjGDUzjAzqrmbzCamxAhe7gIAeaxRGOcYopkQpvliaso7sAeCMCzeIUy1jA42pG22UTvmEyAu0rAC2PJbRVM1vJmbCKB/4u03gC9CVaI0lEzb7gGSZK2Y4lgCdiULiC1wmGRWO4ElSZ/oZwGL7XWmGivtYa8E7zs90XHo6oRv8B+G0taKb5JoNnioLhEfaaAP2hyiuYd7daMYQt/E5ZbY6eC3tcWE80nu0erqeutAUvGoCe4F4qtFz3hVOZ1/ZiMdcINFMv1hKgTzXwwegQ7vQi/hQEHoq0vZiGhO/KjtDAU0r7Ef31QDN1YVb4CNSC/cQb3K0HFNuLWxhED24KneuXcE02hYZyXA/0UhdD5+q+K5z2ztKIAAAAAElFTkSuQmCC"
            />
          </div>
          <div className="social-icon">
            <img
              alt="viber"
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAABmJLR0QA/wD/AP+gvaeTAAAECklEQVRoge3ZW4hVdRTH8c9EWZoaNpYYVhhdrMipKMKwh6KQMCGjC2RFL+VbL93IEiKELhARdLEeukCRFhVhBPpS9KIUUnZFQ+yCkqA0NeY06szpYe2Dp+Oes/97z56ZBvzBgv8Ma63//7v3f6//5XBURzUq6qohx3RchPnowTzMwik4uaWPP9CHXvyCn7Ed3+Fr7K1hLKV1JlbiSwyhMUIbwrd4DleMBUAPPsRgDYPvZN9jmXpmzH80FS+q5+mXsU1i2taiuWIejyVAq/Vh6Ugh5ogPc7wgmnYIN1SFOF5Uk/GGaFqvKDKltaqGzu8XBaIbk3EWFuEF7KqQb21ZiFOxrwaQ7g59TMZD4kmn5hvChWVAHihIuA8rxBM+He8P47cT32AP9osF8G3ciGOyvs7D1hIwT5cB2dghUS8uaPM/DuuH8b8J08QbOBv3ZPk345IsvhvbEkG2pUJMwYEOiZYPEzcdW3L8z8/x7cLt2I3F2f/m4a8EkCGx/SnU/IJEMzvEXipKZav/gWyA+0UVXCEWWLgsg+nJ/l6RANLAkhSQpQVJZhTEv5wTcyVOxNVYh59wTua/DF+ItzQlAysCeTwFpOhDv7kgfqYjp+bCNp9HM5ipGcAmhxe8VxJA3kgByXuirba+IP4E/J0TtxNPYVLmtw6PZO178XrWXpIA8mkKyIaCJIMOT4t2TcI7BfFPZr7X4KusfS5+yNrzEkC2p4CklMHVOXFd+CQhdmfmP028OeLb6M3aJyXk2J0C8ntCon6xELbq4oS41m/mKlHNiNK9K2vPTohvQndU6tbkvba405Q/cA2IdeYuUbng8oS4f1JAygzmurbY4bYqKfarOOunbFYHUkD6S3T+m7hgaOoM+RWrbtuTArK3ZNL2KbZ8DEB2pIDsqJD4wbYcK0cZZEsKyGcVEg/ilrY8t+HPHN8nROmdi2dxsEJ/G1JAXquQuCG+rfZz9RyxUxjIfF7K6W+BuKwr01feOnaEivZanWxA/l5sliPPMK2agQ9K9HNfCsiCEYA0xDb+YeUv17rwamIfSbeRk9RTQteIFbuMZiXk7XV441moNTWANMSd2LUlQHoScr5VIp/FNYE0xNH0TfHhF2ltQr7ry4AcKy6S64JpiOm6Sv5RuUvaMXerChfbi2oGado+PC/O65PFMfjzxNhby0I0tXqUYKrYuqoQxBT7+H8AsVn5CpgL84yx/22kaR8pvrkppYXi9VbZG1WxHbjbKPxq1dRsPDZKg+/Du2Kbk7zoMTLaRoLPkNgBHxTVql8cU/vE3cBucVbfJW4hfxQ76TFVpyd7UFxeTwgNB3FIXFBPGA0Hccd4DqqK2iEGcee4jqii2t/EhIRggk+nVg2Jo+2EqU4TQv8CAgKVWkEN6R4AAAAASUVORK5CYII="
            />
          </div>
        </div>
        <div className="tags">Tags:</div>
        <div className="doted-line"></div>
        <div className="about-author">
        <div className="icon">
            <img src={img} alt="" />
          </div>
          <p>
          <span><strong>Mika Matikainen </strong></span> is a Design Founder & Advisor, Berlin School of Creative Leadership Executive MBA participant, Zippie advisor, Wolt co-founder, and Nordic Rose stakeholder.
          </p>
        </div>
        <div className="break-line"></div>
        <div className="sign-up">
        <h1>Sign up for the newsletter</h1>
        <p>If you want relevant updates occasionally, sign up for the private newsletter. Your email is never shared. </p>
        <button>SIGN UP</button>
        </div>
    </article>
  );
};

export default Article;
