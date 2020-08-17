import React from "react";
import { makeStyles, Popover, Fab } from "@material-ui/core";

import AddIcon from "@material-ui/icons/Add";
import VideoUpload from "./ImageUpload/VideoUpload";

const useStyles = makeStyles((theme) => ({
  typography: {
    padding: theme.spacing(2),
  },
  // fabButton: {
  //   zIndex: 3,
  //   bottom: '90px',
  // },
}));

export default function Footer(props) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    console.log(event);
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
        <VideoUpload username={props.username} />
        {/* <ImageUpload username={props.username} /> */}
      </Popover>
    </div>
  );
}
