import React, { useState } from "react";
import "./styles.css";
import Button from "../Button";
import { useNavigate } from "react-router-dom";
import Image from '../../assets/Sarkul.png';

function Logout() {
  const navigate = useNavigate();

  
  function handleLogout() {
    sessionStorage.removeItem("accessToken");
    navigate('/');
    window.location.reload(true);
  }
  function handleNo() {
    navigate(-1);
  }

  return (
    <div>
        {/* <img className='image logout-image' src={Image} alt='Image here' /> */}
      <div className="logout-div">
        <div>
        <h2>Are you sure ,you want to Logout?</h2>
        </div>
        
        <div className="logout-btn-container">
          <div className="logout-btn" onClick={handleLogout}>
            <button className="yes">Yes</button>
          </div>
          <div className="logout-btn" onClick={handleNo}>
          <button className="no">No</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Logout;
