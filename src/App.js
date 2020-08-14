import React, { useState, useEffect } from "react";
import "./App.css";

import { auth, db } from "./firebase";

import Header from "./components/Header/Header";
import Video from "./components/Main/VideoPost/Video";
import Footer from "./components/Footer/Footer";

const App = () => {
  // const [username, setUsername] = useState("");
  const [user, setUser] = useState(null);
  const [videos, setVideos] = useState([]);

  const [category, setCategory] = useState("");

  const menuItemToCategory = (data) => setCategory(data);
  
  const Test = (e) => {
    e.currentTarget.innerHTML = 'Check out the icon in the corner'
  }
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

  useEffect(() => {
    db.collection("videos").onSnapshot((snapshot) =>
      setVideos(snapshot.docs.map((doc) => ({ id: doc.id, video: doc.data() })))
    );
  }, [videos]);
  // console.log(category);
  return (
    <div className="app">
      <div className="app__header">
        <Header user={user} menuItemClicked={menuItemToCategory}></Header>
      </div>
      <div className="app__main">
        <div className="app__main_video">
          {videos.map(({ id, video, likes, category }) => (
            <Video
              key={id}
              videoId={id}
              videoUrl={video.videoUrl}
              description={video.description}
              seller={video.seller}
              likes={video.likes}
              user={user}
            />
          ))}
        </div>
        {/* <TabsModal user={user} menuItem={category} /> */}
        {/* <div className="app__postcard__container"></div> */}


        {/* <div className="app__footer_contacts">Contacts</div> */}
      </div>
      <div className="app__footer">
          {user?.displayName ? (
            <Footer username={user.displayName} />
          ) : (
            <button onClick={Test}>Login to make your post</button>
          )}
        </div>
    </div>
  );
};

export default App;
