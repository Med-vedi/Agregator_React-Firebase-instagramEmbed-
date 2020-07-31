import React, { useState, useEffect } from "react";
// import InstagramEmbed from "react-instagram-embed";

import "./App.css";

import { auth } from "./firebase";

import Header from "./components/Header/Header";
import TabsModal from "./components/Main/TabsModal";
// import PostCard from "./components/Main/Card/Card";
import Footer from "./components/Footer/Footer";

const App = () => {
  // const [username, setUsername] = useState("");
  const [user, setUser] = useState(null);

  const [category, setCategory] = useState('')


  const menuItemToCategory = (data) => setCategory(data)

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
        <Header user={user} menuItemClicked = {menuItemToCategory}></Header>
      </div>
      {/* <div className="app__intro">
        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Perferendis,
          nihil ipsum? Asperiores, laudantium esse quo aperiam atque accusamus
        </p>
      </div> */}
      <div className="app__main">
        <TabsModal user={user} menuItem={category}/>
        <div className="app__postcard__container">
          {/* hardcoded for the moment */}
          {/* <PostCard />
          <PostCard />
          <PostCard />
          <PostCard />
          <PostCard />
          <PostCard /> */}
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
