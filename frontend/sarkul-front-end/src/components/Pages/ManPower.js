import React from 'react'
import SideBarMp from '../Sidebar/SideBarMp'
import WelcomePage from '../WelcomePage/WelcomePage'
import SideBarMain from '../Sidebar/SideBarMain';
import Image from '../../assets/Manpower.jpeg';

function ManPower() {
  let heading = "Man Power";
  let subHeading= "Now you have access to Map Power related stuffs"
  let disc = "You can now manage the Manpower details accordingly. To do so, go through the options in the side bar"
  return (
    <div className='manpower-page'>
      <SideBarMain/>
      <SideBarMp/>
      <h1 style={{color:"black", zIndex:"1000"}}>Man Power</h1>
    </div>
  )
}

export default ManPower