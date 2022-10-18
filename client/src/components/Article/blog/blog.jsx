import React from 'react';
import "./blog.css"
const blog = ({image, title ,text}) => {
    return (
        <section>

<img className="blog-image" src={image.src} alt="" />
<div className="article">
<div className="article-title">
  <h1>{title}</h1>
</div>
<p>
  {text}
</p>
</div>

        </section>
    );
};

export default blog;