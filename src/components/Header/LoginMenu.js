import React from "react";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import PopupState, { bindTrigger, bindMenu } from "material-ui-popup-state";
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';


const HeaderMenu = () => {
  return (
    <div>
      <PopupState variant="popover" popupId="demo-popup-menu">
        {(popupState) => (
          <React.Fragment>
            <PersonOutlineIcon color="primary"
              {...bindTrigger(popupState)}/>
            <Menu {...bindMenu(popupState)}>
                to do
              <MenuItem onClick={popupState.close}>Sign In</MenuItem>
              <MenuItem onClick={popupState.close}>Sign Up</MenuItem>
            </Menu>
          </React.Fragment>
        )}
      </PopupState>
    </div>
  );
};

export default HeaderMenu;