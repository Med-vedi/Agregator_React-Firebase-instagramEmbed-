import React,{useState} from "react";
import { makeStyles, Popover, Fab } from "@material-ui/core";

import AddIcon from "@material-ui/icons/Add";
import VideoUpload from "./ImageUpload/VideoUpload";

const useStyles = makeStyles((theme) => ({

  loginPop: {
    backgroundColor: 'rgb(245,0,87)',
    color: 'white',
    padding: '10px'
  },
}));

export default function Footer({username}) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <div>
      <Fab
        color="secondary"
        aria-label="add"
        className={classes.fabButton}
        onClick={handleClick}
      >
        <AddIcon />
      </Fab>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
      >
        {username?
        <VideoUpload username={username} handleCloseFooterModal={handleClose} />:
        <h1 className={classes.loginPop} >Login to share a file</h1>}
      </Popover>
    </div>
  );
}
