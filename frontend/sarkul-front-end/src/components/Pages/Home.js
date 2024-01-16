import React from 'react'
import { Link,Route,Routes } from 'react-router-dom'
import CallMasterPage from './CallMasterPage';
import StockManagementPage from './StockManagementPage';
import PartTransaction from './PartTransaction';
import ManPower from './ManPower';
import NavBar from '../Navbar';


function Home() {
   
  return (
    <div>
       <NavBar/>
         <Routes>
         <Route path='/callmaster' element={<CallMasterPage/>}/>
         <Route path='/stockmanagement' element={<StockManagementPage/>}/>
        <Route path='/parttransaction' element={<PartTransaction/>}/>
        <Route path='/manpower'element={<ManPower/>}/>
      </Routes>
     
      
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