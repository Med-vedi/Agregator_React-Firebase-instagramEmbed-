import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Popover from "@material-ui/core/Popover";
import Fab from "@material-ui/core/Fab";

import ImageUpload from "../../ImageUpload";
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
        <ImageUpload username={props.username} />
      </Popover>
    </div>
  );
}

// import React, { useState } from "react";
// import { makeStyles } from "@material-ui/core/styles";
// import AppBar from "@material-ui/core/AppBar";
// import CssBaseline from "@material-ui/core/CssBaseline";
// import Toolbar from "@material-ui/core/Toolbar";
// import IconButton from "@material-ui/core/IconButton";
// import Fab from "@material-ui/core/Fab";
// import MenuIcon from "@material-ui/icons/Menu";
// import AddIcon from "@material-ui/icons/Add";
// import SearchIcon from "@material-ui/icons/Search";
// import MoreIcon from "@material-ui/icons/MoreVert";

// import cls from "classnames";
// import s from "./Footer.module.scss";

// import VideoUpload from "./Upload/VideoUpload";

// import ImageUpload from "../../ImageUpload";

// const useStyles = makeStyles((theme) => ({
//   appBar: {
//     top: "auto",
//     bottom: 0,
//   },
//   grow: {
//     flexGrow: 1,
//   },
//   fabButton: {
//     position: "absolute",
//     zIndex: 1,
//     top: -30,
//     left: 0,
//     right: 0,
//     margin: "0 auto",
//   },
// }));

// export default function Footer(props) {
//   const classes = useStyles();

//   // const [openSignIn, setOpenSignIn] = useState(false);
//   const [open, setOpen] = useState(false);

//   // }
//   const handleUploadClick = () => {
//     setOpen((s) => !s);
//   };
//   return (
//     <React.Fragment>
//       <VideoUpload />

//       <CssBaseline />
//       <AppBar position="fixed" color="primary" className={classes.appBar}>
//         <Toolbar>
//           <IconButton edge="start" color="inherit" aria-label="open drawer">
//             <MenuIcon />
//           </IconButton>

//           <Fab
//             color="secondary"
//             aria-label="add"
//             className={classes.fabButton}
//             // onClick={handleUploadClick}
//             onClick={() => setOpen(true)}
//           >
//             <AddIcon />
//           </Fab>
//           <div className={classes.grow} />
//           <IconButton color="inherit">
//             <SearchIcon />
//           </IconButton>
//           <IconButton edge="end" color="inherit">
//             <MoreIcon />
//           </IconButton>
//         </Toolbar>
//       </AppBar>
//       <div className={cls(s.footer__imageupload, { [s.done]: open })}>
//         {/* <ImageUpload username={props.username} /> */}
//       </div>

//     </React.Fragment>
//   );
// }
