import React, { useState } from "react";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import PopupState, { bindTrigger, bindMenu } from "material-ui-popup-state";
import DehazeIcon from "@material-ui/icons/Dehaze";
import Context from "../../context/context";

const HeaderMenu = (props) => {
  const [category, setCategory] = useState(""); //to arg for prop

  const handleMenuItem = (e) => {
    setCategory(e.currentTarget.id);
    props.menuItemClicked(category);
  };
  return (
    <div>
      <Context.Provider category={category}>
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
      </Context.Provider>
    </div>
  );
};

export default HeaderMenu;
