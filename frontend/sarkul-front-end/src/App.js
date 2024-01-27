
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


function App() {
  const [isUser,setIsUser] = useState(false);
 
  return (
    <div className="App">
     
    {isUser? ( <Login setIsUser={setIsUser}/>):(
    
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
      </Routes>
    </div>
    
    
    )}
     
     
   
    </div>
  );
}

export default App;
