import React from 'react'
import SideBar from '../Sidebar/SideBar';
import WelcomePage from '../WelcomePage/WelcomePage'


function CallMasterPage() {
  const heading = "Call Master Page.";
  const subHeading= "Now you have access to call related details";
  const disc ="You can now manage the call details accordingly. To do so, go through the options in the side bar";
  return (
    <div>
       <SideBar/>
       <WelcomePage heading={heading} subHeading={subHeading} disc={disc}/>
       
     </div>
  )
}

export default CallMasterPage;