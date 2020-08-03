import React, { useState } from "react";
import { storage, db } from "../../../firebase";
import firebase from "firebase";

import "./ImageUpload.css";

function ImageUpload({ username }) {
  const [image, setImage] = useState(null);
  
  const [progress, setProgress] = useState(0);
  const [caption, setCaption] = useState("");
  const [radioValue, setRadioValue] = useState("");



  const handleRadio = (e) => {
    e.preventDefault();
    setRadioValue(e.currentTarget.value)
    console.log(radioValue);
  };

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };
  //TO DO catch empty file
  const handleUpload = () => {
    let uploadTask = storage.ref(`videos/${image.name}`).put(image);

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
          .child(image.name)
          .getDownloadURL()
          .then((url) => {
            //post an image in  db
            db.collection("videos").add({
              timestamp: firebase.firestore.FieldValue.serverTimestamp(),
              caption: caption,
              url: url,
              seller: username,
              category: radioValue
            });
            setProgress(0);
            setCaption("");
            setImage(null);
            console.log(radioValue);
            setRadioValue('')
            //to fix
            // setAnchorEl(null);
          });
      }
    );
  };

  return (
    <div className="imageupload__container">
      <h1>Share your file</h1>
      <progress className="imageupload__progress" value={progress} max="100" />
      <input
        type="text"
        placeholder="Enter a caption"
        onChange={(e) => setCaption(e.target.value)}
        value={caption}
      />
      <input type="file" onChange={handleChange} />
      <form>
        <p>Please select category</p>
        <div>
          <input
            type="radio"
            id="contactChoice1"
            name="contact"
            value="shoes"
            onChange={handleRadio}
          />
          <label>Shoes</label>

          <input
            type="radio"
            id="contactChoice2"
            name="contact"
            value="style"
            onChange={handleRadio}
          />
          <label>Style</label>

          <input
            type="radio"
            id="contactChoice3"
            name="contact"
            value="other"
            onChange={handleRadio}
          />
          <label>Other</label>
        </div>
        <div>
          {/* <button type="submit" onClick={()=> setRadioValue('ok')}>Submit</button> */}
        </div>
      </form>

      <button onClick={handleUpload}>Upload</button>
    </div>
  );
}

export default ImageUpload;
