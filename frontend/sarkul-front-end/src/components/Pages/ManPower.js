import React from 'react'
import SideBarMp from '../Sidebar/SideBarMp'
import WelcomePage from '../WelcomePage/WelcomePage'

function ManPower() {
  let heading = "Map Power Page";
  let subHeading= "Now you have access to Map Power related stuffs"
  let disc = "You can now manage the Manpower details accordingly. To do so, go through the options in the side bar"
  return (
    <div>
      <SideBarMp/>
      <WelcomePage heading={heading} subHeading={subHeading} disc={disc}/>
    </div>
  )
}

export default ManPower