import React from "react";
import "./App.css";
import Post from "./Post";

const App = () => {
  return (
    <div className="app">
      <div className="app__header">
        <img
          className="app__headerImage"
          src="https://www.instagram.com/static/images/web/mobile_nav_type_logo-2x.png/1b47f9d0e595.png"
          alt=""
        />
      </div>
      <h1>
        Note that the development build is not optimized. To create a production
        build, use npm run build.
      </h1>
      <Post
        username="Vladi"
        caption="WOW its awesome"
        imageUrl="https://scontent-mxp1-1.cdninstagram.com/v/t51.2885-15/e35/s1080x1080/62012341_450008379089640_176485431659869456_n.jpg?_nc_ht=scontent-mxp1-1.cdninstagram.com&_nc_cat=100&_nc_ohc=s9iBK3-nPtQAX9UXv9o&oh=a3d37d2f20f1b787914ac501687c0c17&oe=5F30E862"
      />
      <Post />
      <Post />
    </div>
  );
};

export default App;
