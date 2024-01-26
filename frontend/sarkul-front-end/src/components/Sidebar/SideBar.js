import React from 'react'
import './sidebar.css';
import { Link } from 'react-router-dom'
import Button from '../Button';

function SideBar() {
  return (
    <div className='sidebar'>
       <div className='sidebar-links'>
        <Link to ='/callmaster/call-logs' className='link-sb'>
            <Button text={"Call Logs"}  outlined={true}/>
       </Link>

        <Link to ='/callmaster/call-assign' className='link-sb'>
            <Button text={"Call Assign"}  outlined={true}/>
        </Link>

        <Link to ='/callmaster/call-update' className='link-sb'>
            <Button text={"Call Update"}  outlined={true}/>
        </Link>

        <Link to ='/callmaster/call-pending' className='link-sb'>
            <Button text={"Pending Calls"}  outlined={true}/>
        </Link>

        <Link to ='/callmaster/call-closed'className='link-sb'>
            <Button text={"Closed Calls"}  outlined={true}/>
        </Link>

        <Link to ='/callmaster/call-register' className='link-sb'>
            <Button text={"Call Register"}  outlined={true}/>
        </Link>
        <Link to ='/callmaster/call-details' className='link-sb'>
            <Button text={"Call Details"}  outlined={true}/>
        </Link>

        </div> 
    </div>
  )
}

export default SideBar