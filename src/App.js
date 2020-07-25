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
      <h1>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Perferendis,
        nihil ipsum? Asperiores, laudantium esse quo aperiam atque accusamus
      </h1>
      <TabsModal user={user} />
      {/* <InstagramEmbed
        url="https://instagr.am/p/Zw9o4/"
        maxWidth={320}
        hideCaption={false}
        containerTagName="div"
        protocol=""
        injectScript
        onLoading={() => {}}
        onSuccess={() => {}}
        onAfterRender={() => {}}
        onFailure={() => {}}
      /> */}
      <div className="app__postcard__container">
        {/* hardcoded for the moment */}
        <PostCard />
        <PostCard />
        <PostCard />
        <PostCard />
        <PostCard />
        <PostCard />
      </div>
      {user?.displayName ? (
        // <ImageUpload username={user.displayName} />
        <Footer username={user.displayName} />
      ) : (
        <h3>Login to make your post</h3>
      )}
    </div>
  );
};

export default App;
