import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import DehazeIcon from "@material-ui/icons/Dehaze";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import "./Header.css";

const HeaderMenu = (props) => {

  const [anchorEl, setAnchorEl] = React.useState(null);

  const [category, setCategory] = useState(""); //to arg for prop

  const handleMenuItem = (e) => {
    console.log(e.currentTarget.id);
    setCategory(e.currentTarget.id);
    props.menuItemClicked(category);
  };
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className="simpleMenu">
      <div className="simpleMenu__menuBtn">
        <DehazeIcon onClick={handleClick} fontSize="large"/>
      </div>
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
