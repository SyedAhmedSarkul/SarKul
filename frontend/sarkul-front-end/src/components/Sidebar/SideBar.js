import React from 'react'
import './sidebar.css';
import { Link } from 'react-router-dom'

function SideBar() {
  return (
    <div className='sidebar-right'>
       <div className='sidebar-links'>
       <div className="insider-div"  >
        <Link to ='/callmaster/call-logs' className='link-sb-in'>
            <div className="insider">Call Logs</div>
       </Link>

        <Link to ='/callmaster/call-assign' className='link-sb-in'>
        <div className="insider">Call Assign</div>
        </Link>

        <Link to ='/callmaster/call-update' className='link-sb-in'>
        <div className="insider">Call Update</div>
        </Link>

        <Link to ='/callmaster/call-pending' className='link-sb-in'>
        <div className="insider">Pending Calls</div>
        </Link>

        <Link to ='/callmaster/call-closed'className='link-sb-in'>
        <div className="insider">Closed Calls</div>
        </Link>

        <Link to ='/callmaster/call-register' className='link-sb-in'>
        <div className="insider">Call Register</div>
        </Link>
        <Link to ='/callmaster/call-details' className='link-sb-in'>
        <div className="insider">Call Details</div>
        </Link>
        </div>

        </div> 
    </div>
  )
}

export default SideBar