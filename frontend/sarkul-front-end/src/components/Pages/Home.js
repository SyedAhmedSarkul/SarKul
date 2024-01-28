import React from 'react'
import { Link,Route,Routes } from 'react-router-dom'
import CallMasterPage from './CallMasterPage';
import StockManagementPage from './StockManagementPage';
import PartTransaction from './PartTransaction';
import ManPower from './ManPower';
import NavBar from '../Navbar';
import CallLogs from '../CallMaster/CallLogs';
import CallAssign from '../CallMaster/CallAssign';
import CallRegister from '../CallMaster/CallRegister';
import CallUpdate from '../CallMaster/CallUpdate';
import PendingCallReports from '../CallMaster/PendingCallReports';
import ClosedCall from '../CallMaster/ClosedCall';
import Image from '../../assets/Sarkul.png';
import CallDetails from '../Helper/CallDetail';
import CallDetailsPage from '../CallMaster/CallDetailsPage';


function Home() {
   
  return (
    <div>
       <NavBar/>
      
         
     
      {/* <img className='image' src={Image} alt='Image here'/> */}
    </div>
  )
}

export default Home


/*
 <Link to="/">Home</Link>
      <Link to="/callmaster">Call Master</Link>
      <Link to="/stockmanagement">StockManagement</Link>
      <Link to="/parttransaction">Part Transaction</Link>
      <Link to="/manpower">Man Power</Link>
      */