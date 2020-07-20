import React from "react";
import { makeStyles, Popover, Fab } from "@material-ui/core";

import VideoUpload from "./Upload/VideoUpload";
import AddIcon from "@material-ui/icons/Add";

const useStyles = makeStyles((theme) => ({
  typography: {
    padding: theme.spacing(2),
  },
  fabButton: {
    position: "fixed",
    zIndex: 1,
    // top: -30,
    bottom: 0,
    left: 0,
    right: 0,
    margin: "0 auto",
  },
}));

export default function Footer(props) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

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
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <VideoUpload username={props.username} />
      </Popover>
    </div>
  );
}
