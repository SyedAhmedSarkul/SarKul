import React, { useEffect, useState } from 'react'
import './sidebar.css';
import { Link, useLocation } from 'react-router-dom'

function SideBar() {

  const location = useLocation();
  const [path, setPath] = useState('')
  useEffect(() => {
    setPath(location.pathname)
  }, [location])

  return (
    <div className='sidebar-right'>
      <div className='sidebar-links'>
        <div className="insider-div"  >
          <Link to='/callmaster/call-logs' className='link-sb-in'>
            <div className="insider" style={{ backgroundColor: path.includes('call-logs') && 'var(--darkblue)', color: path.includes('call-logs') && 'var(--white)' }} >Call Logs</div>
          </Link>

          <Link to='/callmaster/call-assign' className='link-sb-in'>
            <div className="insider" style={{ backgroundColor: path.includes('call-assign') && 'var(--darkblue)', color: path.includes('call-assign') && 'var(--white)' }} >Call Assign</div>
          </Link>

          <Link to='/callmaster/call-update' className='link-sb-in'>
            <div className="insider" style={{ backgroundColor: path.includes('call-update') && 'var(--darkblue)', color: path.includes('call-update') && 'var(--white)' }} >Call Update</div>
          </Link>

          <Link to='/callmaster/call-pending' className='link-sb-in'>
            <div className="insider" style={{ backgroundColor: path.includes('call-pending') && 'var(--darkblue)', color: path.includes('call-pending') && 'var(--white)' }}>Pending Calls</div>
          </Link>

          <Link to='/callmaster/call-closed' className='link-sb-in'>
            <div className="insider" style={{ backgroundColor: path.includes('call-closed') && 'var(--darkblue)', color: path.includes('call-closed') && 'var(--white)' }}>Closed Calls</div>
          </Link>

          <Link to='/callmaster/call-register' className='link-sb-in'>
            <div className="insider" style={{ backgroundColor: path.includes('call-register') && 'var(--darkblue)', color: path.includes('call-register') && 'var(--white)' }}>Call Register</div>
          </Link>
          <Link to='/callmaster/call-details' className='link-sb-in'>
            <div className="insider" style={{ backgroundColor: path.includes('call-details') && 'var(--darkblue)', color: path.includes('call-details') && 'var(--white)' }}>Call Details</div>
          </Link>
        </div>

      </div>
    </div>
  )
}

export default SideBar