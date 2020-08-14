import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import "./Header.css";

const HeaderMenu = (props) => {
  const style = {
    // background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    borderRadius: 3,
    // border: 0,
    color: "black",
    height: 48,
    // padding: '10px 10px',
    // boxShadow: "0 3px 5px 2px rgba(255, 255, 255, .3)",
  };

  const [anchorEl, setAnchorEl] = React.useState(null);

  const [category, setCategory] = useState(""); //to arg for prop

  const handleMenuItem = (e) => {
    // console.log(e.currentTarget.id);
    setCategory(e.currentTarget.id);
  };
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className="simpleMenu">
      <Button
        style={style}
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        Menu
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleMenuItem} id="shoes">
          Shoes
        </MenuItem>
        <MenuItem onClick={handleMenuItem} id="style">
          Style
        </MenuItem>
        <MenuItem onClick={handleMenuItem} id="other">
          Other
        </MenuItem>{" "}
      </Menu>
    </div>
  );
};
export default HeaderMenu;
