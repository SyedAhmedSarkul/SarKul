import React, { useState } from "react";
import { Link } from "react-router-dom";
import Button from "../Button";
function SideBarMain() {
    // const [cflag, setcFlag] = useState(true);
    // const [mflag, setmFlag] = useState(true);



  return <div className="sidebar"> 

     <div className='links-sidebar'>
      <Link to="/invoice" className='link'>
      <buton className='sb-btn'>Invoice</buton>
      </Link>
        <Link to="/callmaster" className='link'>
        <buton className='sb-btn'>Call Master</buton>
        </Link> 
       
      <Link to="/manpower" className='link'>
      <buton className='sb-btn' >Man Power</buton>
      </Link>
      
      <Link to="/parttransaction" className='link'>
      <buton className='sb-btn'>Part Transaction</buton>
      </Link>
      <Link to="/stockmanagement" className='link'>
      <buton className='sb-btn'>Stock Management</buton>
      </Link>
      
      
      </div>
  </div>
}

export default SideBarMain;
