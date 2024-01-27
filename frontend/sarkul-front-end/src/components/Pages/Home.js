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
      
         <Routes>
         <Route path='/callmaster' element={<CallMasterPage/>}/>
              <Route path='/callmaster/call-logs' element={<CallLogs/>}/>
              <Route path='/callmaster/call-assign' element={<CallAssign/>}/>
              <Route path='/callmaster/call-register' element={<CallRegister/>}/>
              <Route path='/callmaster/call-update' element={<CallUpdate/>}/>
              <Route path='/callmaster/call-closed' element={<ClosedCall/>}/>
              <Route path='/callmaster/call-pending' element={<PendingCallReports/>}/>
              <Route path='/callmaster/call-details' element={<CallDetailsPage/>}/>
              <Route path='/callmaster/call-details-specific/:callId' element={<CallDetails/>}/>
         <Route path='/stockmanagement' element={<StockManagementPage/>}/>
        <Route path='/parttransaction' element={<PartTransaction/>}/>
        <Route path='/manpower'element={<ManPower/>}/>
      </Routes>
     
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