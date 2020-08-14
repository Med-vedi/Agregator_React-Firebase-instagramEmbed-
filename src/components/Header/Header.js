import React from "react";
import HeaderMenu from "./HeaderMenu";

import InputBase from "@material-ui/core/InputBase";
import { makeStyles } from "@material-ui/core/styles";



import "./Header.css";
import LoginMenu from "./LoginMenu";
import PauseCircleOutlineIcon from "@material-ui/icons/PauseCircleOutline";

import { auth } from "../../firebase";


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

const Header = ({ user, menuItemClicked }) => {
  const classes = useStyles();

  return (
    <div className="header__container">
      <HeaderMenu menuItemClicked={menuItemClicked} />
      <div className="header__logo">
        {user ? <h3>Hi, {user.displayName}</h3> : <h1>Guest</h1>}
      </div>
      <div className={classes.search}>
        <InputBase
          placeholder="Search…"
          classes={{
            root: classes.inputRoot,
            input: classes.inputInput,
          }}
          inputProps={{ "aria-label": "search" }}
        />
      </div>
      {user ? (
        <PauseCircleOutlineIcon color="error" onClick={() => auth.signOut()} />
      ) : (
        <LoginMenu />
      )}
    </div>
  );
};

export default Header;
