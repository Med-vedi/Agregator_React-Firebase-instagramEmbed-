import React from "react";
import HeaderMenu from "./HeaderMenu";
import './Header.css'
import LoginMenu from './LoginMenu'
import PauseCircleOutlineIcon from '@material-ui/icons/PauseCircleOutline';

import { auth } from "../../firebase";

const Header = (props) => {
    const user = props.user
    console.log(user);

  return (
    <div className="header__container">
      <HeaderMenu />
      <div className='header__logo'> 
        <h1>Header</h1> 
      </div>
      {user? (
      <PauseCircleOutlineIcon color='error' onClick={() => auth.signOut()}/>
      ):(<LoginMenu/>)}
      
    </div>
  );
};

export default Header;