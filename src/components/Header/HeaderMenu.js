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
    setCategory(e.currentTarget.id);
    props.menuItemClicked(category);
    console.log(category);
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
                  shoes
                </MenuItem>
                <MenuItem onClick={handleMenuItem} id="style">
                  style
                </MenuItem>
                <MenuItem onClick={popupState.close} id="other">
                  other
                </MenuItem>
              </Menu>
            </React.Fragment>
          )}
        </PopupState>
    </div>
  );
};

export default HeaderMenu;
