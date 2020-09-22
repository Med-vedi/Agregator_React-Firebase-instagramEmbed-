import React from "react";
import HeaderMenu from "./HeaderMenu";

import "./Header.css";
import LoginMenu from "../Main/LoginMenu";
import PauseCircleOutlineIcon from "@material-ui/icons/PauseCircleOutline";

import { auth } from "../../firebase";

const Header = ({ user, menuItemClicked }) => {
  // const classes = useStyles();

  return (
    <div className="header__container">
      <div className="header__menu">
        <HeaderMenu menuItemClicked={menuItemClicked}>hey</HeaderMenu>
      </div>
      <div className="header__logo">
        {user ? <h5>Hi, {user.displayName}</h5> : <h5>Guest</h5>}
      </div>
      {/* <div className={classes.search}>
        <InputBase
          placeholder="Search…"
          classes={{
            root: classes.inputRoot,
            input: classes.inputInput,
          }}
          inputProps={{ "aria-label": "search" }}
        />
      </div> */}
      {/* <Search/> */}
      <div className="header__login">
        {user ? (
          <PauseCircleOutlineIcon
            color="error"
            onClick={() => auth.signOut()}
          />
        ) : (
          <LoginMenu />
        )}
      </div>
    </div>
  );
};

export default Header;
