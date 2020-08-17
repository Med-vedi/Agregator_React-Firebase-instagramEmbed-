import React, { useState, useEffect } from "react";
import DehazeIcon from "@material-ui/icons/Dehaze";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import "./Header.css";

const HeaderMenu = ({ menuItemClicked }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const [category, setCategory] = useState("all"); //to arg for prop
  useEffect(() => {
    menuItemClicked(category);
  }, [category]);

  const handleMenuItem = (e) => {
    setCategory(e.currentTarget.id);
    // props.menuItemClicked(e.currentTarget.id);
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
        <DehazeIcon onClick={handleClick} fontSize="large" />
      </div>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleMenuItem} id="travel">
          Travel
        </MenuItem>
        <MenuItem onClick={handleMenuItem} id="style">
          Style
        </MenuItem>
        <MenuItem onClick={handleMenuItem} id="other">
          Other
        </MenuItem>{" "}
        <MenuItem onClick={handleMenuItem} id="all">
          All
        </MenuItem>
      </Menu>
    </div>
  );
};
export default HeaderMenu;
