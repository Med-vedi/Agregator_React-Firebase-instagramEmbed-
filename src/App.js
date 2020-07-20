import React, { useState, useEffect } from "react";
import "./App.css";
// import Post from "./components/Post/Post";

import { db, auth } from "./firebase";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import { Button, Input } from "@material-ui/core";
// import ImageUpload from "./ImageUpload";

// import VideoUpload from './components/Footer/Upload/VideoUpload'

// import Plug from "./components/Plug/Plug";
import Header from "./components/Header/Header";
import TabsModal from "./components/Header/Tabs";
import PostCard from "./components/Card/PostCard";
import Footer from "./components/Footer/Footer";

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}
const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const App = () => {
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);

  // const [cards, setCards] = useState([]);


  // const [posts, setPosts] = useState([]);
  const [open, setOpen] = useState(false);

  const [openSignIn, setOpenSignIn] = useState(false);

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  // useEffect(() => {
  //   //controll and sort
  //   db.collection("posts")
  //     .orderBy("timestamp", "desc")
  //     .onSnapshot((snapshot) => {
  //       setPosts(
  //         snapshot.docs.map((doc) => ({
  //           id: doc.id,
  //           post: doc.data(),
  //         }))
  //       );
  //     });
  // }, []);

  // useEffect(() => {
  //   //controll and sort
  //   db.collection("cards")
  //     .orderBy("timestamp", "desc")
  //     .onSnapshot((snapshot) => {
  //       setCards(
  //         snapshot.docs.map((doc) => ({
  //           id: doc.id,
  //           card: doc.data(),
  //         }))
  //       );
  //     });
  // }, []);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        //user has logged in
        // console.log(authUser.l);
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
  }, [user, username]);

  const signUp = (e) => {
    e.preventDefault();
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((authUser) => {
        return authUser.user.updateProfile({
          displayName: username,
        });
      })
      .catch((error) => alert(error.message));
    setOpen(false);
  };

  const signIn = (e) => {
    e.preventDefault();
    auth
      .signInWithEmailAndPassword(email, password)
      .catch((error) => alert(error.message));
    setOpenSignIn(false);
  };

  return (
    <div className="app">
      <Modal open={open} onClose={() => setOpen(false)}>
        <div style={modalStyle} className={classes.paper}>
          <form className="app__signup">
            <center>
              <img
                className="app__headerImage"
                src="https://www.instagram.com/static/images/web/mobile_nav_type_logo-2x.png/1b47f9d0e595.png"
                alt=""
              />
            </center>
            <Input
              placeholder="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <Input
              placeholder="email"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              placeholder="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button type="submit" onClick={signUp}>
              Sign Up
            </Button>
          </form>
        </div>
      </Modal>
      <Modal open={openSignIn} onClose={() => setOpenSignIn(false)}>
        <div style={modalStyle} className={classes.paper}>
          <form className="app__signup">
            <center>
              <img
                className="app__headerImage"
                src="https://www.instagram.com/static/images/web/mobile_nav_type_logo-2x.png/1b47f9d0e595.png"
                alt=""
              />
            </center>
            <Input
              placeholder="email"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              placeholder="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button type="submit" onClick={signIn}>
              Sign In
            </Button>
          </form>
        </div>
      </Modal>

      <Header user={user} />
      {user ? (
        console.log(user)
      ) : (
        <div className="app__loginContainer">
          <Button variant="outlined" onClick={() => setOpenSignIn(true)}>
            Sign In
          </Button>

          <Button variant="outlined" onClick={() => setOpen(true)}>
            Sign Up
          </Button>
        </div>
      )}

      <h1>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Perferendis,
        nihil ipsum? Asperiores, laudantium esse quo aperiam atque accusamus
      </h1>
      <TabsModal />
      {/* <Plug /> */}

      {/* {posts.map(({ id, post }) => (
        <Post
          key={id}
          username={post.username}
          caption={post.caption}
          imageUrl={post.imageUrl}
        />
      ))} */}

       {/* {cards.map(({ id, card }) => (
        <Post
          key={id}
          username={card.username}
          caption={card.caption}
          videoUrl={card.videoUrl}
        />
      ))} */}

      <div className="app__postcard__container">
        <PostCard />
        <PostCard />
        <PostCard />
        <PostCard />
        <PostCard />
        <PostCard />
      </div>
      {user?.displayName ? (
        // <ImageUpload username={user.displayName} />
        <Footer username={user.displayName}/>

      ) : (
        <h3>Sorry, you need to login</h3>
      )}
    </div>
  );
};

export default App;
