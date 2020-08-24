import React, { useState } from "react";
import { Button } from "@material-ui/core";
import { storage, db } from "../../../firebase";
import firebase from "firebase";

import "./VideoUpload.css";

function VideoUpload({ username, handleCloseFooterModal }) {
  const [video, setVideo] = useState(null);
  const [progress, setProgress] = useState(0);
  const [caption, setCaption] = useState("");
  const [uploadGreet, setUploadGreet] = useState('Share your video')

  const handleChange = (e) => {
    uploadGreet?console.log(uploadGreet):console.log('ok');;

    if (e.target.files[0]) {
      setVideo(e.target.files[0]);
    }
  };
  //TO DO catch empty file
  const handleUpload = () => {
    setUploadGreet('Share your video')

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
            //post a video in  db
            db.collection("videos").add({
              timestamp: firebase.firestore.FieldValue.serverTimestamp(),
              seller: username,
              description: caption,
              videoUrl: url,
              likes: 0,
              username: username,
            });
            setProgress(0);
            setCaption("");
            setVideo(null);
            setUploadGreet('Done')
            handleCloseFooterModal()

            //to fix
            // setAnchorEl(null);
          });
      }
    );
  };

  return (
    <div className="videoupload__container">
      <h1>{uploadGreet}</h1>
      <progress className="videoupload__progress" value={progress} max="100" />
      <input
        type="text"
        placeholder="Enter a caption"
        onChange={(e) => setCaption(e.target.value)}
        value={caption}
      />
      <input type='file' onChange={handleChange} />
      <Button className="videoupload__btn" onClick={handleUpload}>
        Upload
      </Button>
    </div>
  );
}

export default VideoUpload;
