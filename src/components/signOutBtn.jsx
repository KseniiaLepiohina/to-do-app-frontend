import React from "react";
import { Link } from "react-router-dom";
import {Icon} from '@iconify/react';

const signOutBtn = ({ isMobile }) => {
  return (
    <Link to="/">
      <button 
      className="btn_signUp">
        {isMobile ? <h6>Sign Up</h6> : <h5>Sign Up</h5>}
        <span><Icon icon="mdi:logout" color="#FFFFFF"/></span>
      </button>
    </Link>
  );
};
export default signOutBtn;
