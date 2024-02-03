import React from 'react'
import SideBar from '../Sidebar/SideBar';
import WelcomePage from '../WelcomePage/WelcomePage'
import SideBarMain from '../Sidebar/SideBarMain';
import Image from '../../assets/CallMaster.jpeg';



function CallMasterPage() {
  const heading = "Call Master";
  // const subHeading= "Now you have access to call related details";
  // const disc ="You can now manage the call details accordingly. To do so, go through the options in the side bar";
  return (
    <div className='call-master-page'>
       <SideBarMain/>
       <SideBar/>
       <h1 style={{color:"black", zIndex:"1000"}}>Call Master</h1>
       {/* <WelcomePage heading={heading} Image={Image} /> */}
       
     </div>
  )
}

export default CallMasterPage;