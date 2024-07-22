
import { useState } from 'react';
import './App.css';
import Login from './components/Login';
import Home from './components/Pages/Home';
import { Route, Routes } from 'react-router-dom';
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
import ManpowerEntry from './components/ManPower/ManpowerEntry';
import ManpowerInfo from './components/ManPower/ManpowerInfo';
import AllEmployee from './components/ManPower/AllEmployee';
import EmployeeDetail from './components/Helper/EmployeeDetail';
import InvoicePage from './components/Pages/InvoicePage';
import Logout from './components/Logout';
import StockEntry from './components/StockManagement/StockEntry';
import CurrentStock from './components/StockManagement/CurrentStock';
import StockDetail from './components/Helper/StockDetail/StockDetail';
import BranchToEngineer from './components/PartTransaction/BranchToEngineer';
import EngineerToBranch from './components/PartTransaction/EngineerToBranch';
import PartTransactionDetail from './components/PartTransaction/PartTransactionDetail';
import AllStock from './components/StockManagement/AllStock';
import BranchStockEntry from './components/StockManagement/BranchStockEntry';
import BranchStockList from './components/StockManagement/BranchStockList';
import OfficeRepair from './components/StockManagement/OfficeRepair';


function App() {
  const [isUser, setIsUser] = useState(false);
  // localStorage.removeItem("accessToken");
  let token = sessionStorage.getItem("accessToken");

  return (
    <div className="App">

      {/* {!isUser? ( <Login setIsUser={setIsUser}/>):( */}
      {!token ? (<Login />) : (

        <div>
          <Home />
          <Routes>
            <Route path='/callmaster' element={<CallMasterPage />} />
            <Route path='/callmaster/call-logs' element={<CallLogs />} />
            <Route path='/callmaster/call-assign' element={<CallAssign />} />
            <Route path='/callmaster/call-register' element={<CallRegister />} />
            <Route path='/callmaster/call-update' element={<CallUpdate />} />
            <Route path='/callmaster/call-closed' element={<ClosedCall />} />
            <Route path='/callmaster/call-pending' element={<PendingCallReports />} />
            <Route path='/callmaster/call-details' element={<CallDetailsPage />} />
            <Route path='/callmaster/call-details-specific/:callId' element={<CallDetails />} />
            <Route path='/stockmanagement' element={<StockManagementPage />} />
            <Route path='/stockmanagement/stock-entry' element={<StockEntry />} />
            <Route path='/stockmanagement/branch-stock-form' element={<BranchStockEntry/>} />
            <Route path='/stockmanagement/current-stock' element={<CurrentStock />} />
            <Route path='/stockmanagement/all-stock' element={<AllStock />} />
            <Route path='/stockmanagement/branch-stock-list' element={<BranchStockList/>} />
            <Route path='/stockmanagement/office-repair' element={<OfficeRepair/>} />
            <Route path='/stockmanagement/current-stock-specific/:stockId' element={<StockDetail />} />
            <Route path='/parttransaction' element={<PartTransaction />} />
            <Route path='/parttransaction/branch-to-engineer' element={<BranchToEngineer />} />
            <Route path='/parttransaction/engineer-to-branch' element={<EngineerToBranch />} />
            <Route path='/parttransaction/part-transaction-detail' element={<PartTransactionDetail />} />
            <Route path='/invoice' element={<InvoicePage />} />
            <Route path='/manpower' element={<ManPower />} />
            <Route path='/manpower/manpower-entry' element={<ManpowerEntry />} />
            <Route path='/manpower/manpower-info' element={<ManpowerInfo />} />
            <Route path='/manpower/manpower-all' element={<AllEmployee />} />
            <Route path='/manpower/manpower-specific/:empId' element={<EmployeeDetail />} />
            <Route path='/logout' element={<Logout />} />
          </Routes>
        </div>


      )}



    </div>
  );
}

export default App;
