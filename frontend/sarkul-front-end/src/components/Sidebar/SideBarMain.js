import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Button from "../Button";
// sidebar for call
function SideBarMain() {
  const location = useLocation();
  const [path, setPath] = useState('')
  useEffect(() => {
    setPath(location.pathname)
  }, [location])

  return <div className="sidebar">

    <div className='links-sidebar'>
      <Link to="/expense" className='link'>
        <buton className='sb-btn' style={{ backgroundColor:path.includes('/expense') && 'var(--white)',color:path.includes('/expense') && 'var(--black)'}}>Expense</buton>
      </Link>
      <Link to="/callmaster" className='link'>
        <buton className='sb-btn'style={{ backgroundColor:path.includes('/callmaster') && 'var(--white)',color:path.includes('/callmaster') && 'var(--black)'}} >Call Master</buton>
      </Link>

      <Link to="/manpower" className='link'>
        <buton className='sb-btn'style={{ backgroundColor:path.includes('/manpower') && 'var(--white)',color:path.includes('/manpower') && 'var(--black)'}} >Man Power</buton>
      </Link>

      <Link to="/parttransaction" className='link'>
        <buton className='sb-btn' style={{ backgroundColor:path.includes('/parttransaction') && 'var(--white)',color:path.includes('/parttransaction') && 'var(--black)'}}>Part Transaction</buton>
      </Link>
      <Link to="/stockmanagement" className='link'>
        <buton className='sb-btn' style={{ backgroundColor:path.includes('/stockmanagement') && 'var(--white)',color:path.includes('/stockmanagement') && 'var(--black)'}}>Stock Management</buton>
      </Link>


    </div>
  </div>
}

export default SideBarMain;
