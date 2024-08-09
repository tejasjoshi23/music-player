import React from 'react';
import { SpotifyLogo } from '../../assets/svgIcons';
import Profile from '../../assets/Profile.png';
import '../../App.css'; 

const MobileNavbar = () => {
  return (
    <div className="mobile-navbar">
      <div className="logo-mobile">
        <SpotifyLogo />
      </div>
      <img src={Profile} alt="profile" className="profile-mobile" />
    </div>
  );
};

export default MobileNavbar;
