import React, { useState, useEffect } from "react";
// import InstagramEmbed from "react-instagram-embed";

import "./App.css";

import { auth } from "./firebase";

import Header from "./components/Header/Header";
import TabsModal from "./Tabs";
import PostCard from "./components/Card/PostCard";
import Footer from "./components/Footer/Footer";

const App = () => {
  // const [username, setUsername] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        //user has logged in
        setUser(authUser);
      } else {
        //user has logged out
        setUser(null);
      }
    });
    return () => {
      //perfom some cleanup action
      unsubscribe();
    };
  }, [user]);

  return (
    <div className="app">
      <div className="app__header">
        <Header user={user}></Header>
      </div>
      <div className="app__parallax">
        <div className="app__parallax-group">
          <div className="app__layer_base">
            <div className="app__content">ReactJS</div>
          </div>

          <div className="app__layer_closer">
            <div className="app__content">FireBase</div>
          </div>

          <div className="app__layer_closest">
            <div className="app__content">JavaScript</div>
          </div>
        </div>
      </div>

      {/* <div className="app__intro">
        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Perferendis,
          nihil ipsum? Asperiores, laudantium esse quo aperiam atque accusamus
        </p>
      </div> */}

      <div className="app__main">
        <TabsModal user={user} />
        <div className="app__postcard__container">
          {/* hardcoded for the moment */}
          <PostCard />
          <PostCard />
          <PostCard />
          <PostCard />
          <PostCard />
          <PostCard />
        </div>
      </div>
      <div className="app__footer">
        {user?.displayName ? (
          // <ImageUpload username={user.displayName} />
          <Footer username={user.displayName} />
        ) : (
          <h3>Login to make your post</h3>
        )}
      </div>
    </div>
  );
};

export default App;
