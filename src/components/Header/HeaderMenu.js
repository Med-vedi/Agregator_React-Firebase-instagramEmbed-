import React from "react";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import PopupState, { bindTrigger, bindMenu } from "material-ui-popup-state";
import DehazeIcon from '@material-ui/icons/Dehaze';

const HeaderMenu = () => {
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
              <MenuItem onClick={popupState.close}>Item One</MenuItem>
              <MenuItem onClick={popupState.close}>Item Two</MenuItem>
              <MenuItem onClick={popupState.close}>Item Three</MenuItem>

            </Menu>
          </React.Fragment>
        )}
      </PopupState>
    </div>
  );
};

export default HeaderMenu;
