import React, { useState } from "react";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import PopupState, { bindTrigger, bindMenu } from "material-ui-popup-state";
import DehazeIcon from "@material-ui/icons/Dehaze";

// -------------TO DO------------
// category state update issue to fix

const HeaderMenu = (props) => {
  const [category, setCategory] = useState(""); //to arg for prop

  const handleMenuItem = (e) => {
    // console.log(e.currentTarget.id);
    setCategory(e.currentTarget.id);
  };
  return (
    <div>
      <PopupState variant="popover" popupId="demo-popup-menu">
        {(popupState) => (
          <React.Fragment>
            <DehazeIcon
              variant="contained"
              color="primary"
              {...bindTrigger(popupState)}
            >
              Menu
            </DehazeIcon>
            <Menu {...bindMenu(popupState)}>
              <MenuItem onClick={handleMenuItem} id="shoes">
                Shoes
              </MenuItem>
              <MenuItem onClick={handleMenuItem} id="style">
                Style
              </MenuItem>
              <MenuItem onClick={handleMenuItem} id="other">
                Other
              </MenuItem>
            </Menu>
          </React.Fragment>
        )}
      </PopupState>
    </div>
  );
};

export default HeaderMenu;
