
import { useState } from 'react';
import './App.css';
import Login from './components/Login';
import Home from './components/Pages/Home';
import { Route,Routes } from 'react-router-dom';
import CallAssign from './components/CallMaster/CallAssign';
import CallMasterPage from './components/Pages/CallMasterPage';
import CallLogs from './components/CallMaster/CallLogs';
import CallRegister from './components/CallMaster/CallRegister';
import CallUpdate from './components/CallMaster/CallUpdate';
import ClosedCall from './components/CallMaster/ClosedCall';
import PendingCallReports from './components/CallMaster/PendingCallReports';
import CallDetailsPage from './components/CallMaster/CallDetailsPage';
import CallDetails from './components/Helper/CallDetail';
import StockManagementPage from './components/Pages/StockManagementPage';
import PartTransaction from './components/Pages/PartTransaction';
import ManPower from './components/Pages/ManPower';
import ManpowerEntry from './ManPower/ManpowerEntry';
import ManpowerInfo from './ManPower/ManpowerInfo';
import AllEmployee from './ManPower/AllEmployee';
import EmployeeDetail from './components/Helper/EmployeeDetail';


function App() {
  const [isUser,setIsUser] = useState(false);
  // localStorage.removeItem("accessToken");
  let token= localStorage.getItem("accessToken");
 
  return (
    <div className="App">
     
    {/* {!isUser? ( <Login setIsUser={setIsUser}/>):( */}
    {!token? ( <Login setIsUser={setIsUser}/>):(
    
    <div>
      <Home/>
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
              <Route path='/manpower/manpower-entry'element={<ManpowerEntry/>}/>
              <Route path='/manpower/manpower-info'element={<ManpowerInfo/>}/>
              <Route path='/manpower/manpower-all'element={<AllEmployee/>}/>
              <Route path='/manpower/manpower-specific/:empId' element={<EmployeeDetail/>}/>
      </Routes>
    </div>
    
    
     )} 
     
     
   
    </div>
  );
}

export default App;
