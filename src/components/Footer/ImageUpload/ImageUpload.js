import React, { useState } from "react";
import { Button } from "@material-ui/core";
import { storage, db } from "../../../firebase";
import firebase from "firebase";

import "./ImageUpload.css";

function ImageUpload({ username }) {
  const [image, setImage] = useState(null);
  //   const [url, setUrl] = useState("");
  const [progress, setProgress] = useState(0);
  const [caption, setCaption] = useState("");

  //to fix
  // const [anchorEl, setAnchorEl] = React.useState(null);
  // const open = Boolean(anchorEl);
  // const id = open ? "simple-popover" : undefined;

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };
  //TO DO catch empty file
  const handleUpload = () => {
    let uploadTask = storage.ref(`images/${image.name}`).put(image);

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
          .ref("images")
          .child(image.name)
          .getDownloadURL()
          .then((url) => {
            //post an image in  db
            db.collection("posts").add({
              timestamp: firebase.firestore.FieldValue.serverTimestamp(),
              caption: caption,
              imageUrl: url,
              username: username,
            });
            setProgress(0);
            setCaption("");
            setImage(null);
            //to fix
            // setAnchorEl(null);
          });
      }
    );
  };

  return (
    <div className="imageupload__container">
      <h1>Share your photo</h1>
      <progress className="imageupload__progress" value={progress} max="100" />
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

export default ImageUpload;
