import React, { useState } from "react";
import { Button } from "@material-ui/core";
import { storage, db } from "../../../firebase";
import firebase from "firebase";

import "./VideoUpload.css";

function VideoUpload({ username }) {
  const [video, setVideo] = useState(null);
  //   const [url, setUrl] = useState("");
  const [progress, setProgress] = useState(0);
  const [caption, setCaption] = useState("");

  //to fix
  // const [anchorEl, setAnchorEl] = React.useState(null);
  // const open = Boolean(anchorEl);
  // const id = open ? "simple-popover" : undefined;

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setVideo(e.target.files[0]);
    }
  };
  //TO DO catch empty file
  const handleUpload = () => {
    let uploadTask = storage.ref(`videos/${video.name}`).put(video);

    console.log(uploadTask);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        //progress function
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progress);
      },
      (error) => {
        //error function
        console.log("error");
        alert(error.message);
      },
      () => {
        //complete function
        storage
          .ref("videos")
          .child(video.name)
          .getDownloadURL()
          .then((url) => {
            //post an video in  db
            db.collection("cards").add({
              timestamp: firebase.firestore.FieldValue.serverTimestamp(),
              caption: caption,
              videoUrl: url,
              username: username,
            });
            setProgress(0);
            setCaption("");
            setVideo(null);
            //to fix
            // setAnchorEl(null);
          });
      }
    );
  };

  return (
    <div className="videoupload__container">
      <h1>Share your Video</h1>
      <progress className="videoupload__progress" value={progress} max="100" />
      <input
        type="text"
        placeholder="Enter a caption"
        onChange={(e) => setCaption(e.target.value)}
        value={caption}
      />
      <input type="file" onChange={handleChange} />
      <Button onClick={handleUpload}>Upload</Button>
    </div>
  );
}

export default VideoUpload;
