import React, { useState, useEffect } from "react";
import "./App.css";

import { auth, db } from "./firebase";

import Header from "./components/Header/Header";
import Video from "./components/Main/Video";
import Footer from "./components/Footer/Footer";

const App = () => {
  const [user, setUser] = useState(null);
  const [videos, setVideos] = useState([]);

  const [category, setCategory] = useState("all");

  const handleMenuItemClick = (data) => {
    setCategory(data);
  };

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

  //menu activated
  useEffect(() => {
    if (category !== "all") {
      db.collection("videos")
        .where("category", "==", category ? category : null)
        .onSnapshot((snapshot) => {
          setVideos(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              video: doc.data(),
            }))
          );
        });
      // console.log(category);
    } else {
      db.collection("videos").onSnapshot((snapshot) =>
        setVideos(
          snapshot.docs.map((doc) => ({ id: doc.id, video: doc.data() }))
        )
      );
    }
  }, [category]);

  return (
    <div className="app">
      <div className="app__header">
        <Header user={user} menuItemClicked={handleMenuItemClick}></Header>
      </div>
      <div className="app__main">
        {videos.map(({ id, video }) => (
          <Video
            key={id}
            videoId={id}
            videoUrl={video.videoUrl}
            description={video.description}
            seller={video.seller}
            sellerLink={video.insta}
            user={user}
            menuItem={category}
          />
        ))}
      </div>
      <div className="app__footer">
        {user?.displayName ? (
          <Footer username={user.displayName} />
        ) : (
          <div>
            <Footer username={null} />
          </div>
        )}
      </div>
      <div className="app__contacts">
        <ul>
          <li>Instagram</li>
          <li>GitHub</li>
          <li>Facebook</li>
          <li>LinkedIn</li>
        </ul>
      </div>
    </div>
  );
};

export default App;
