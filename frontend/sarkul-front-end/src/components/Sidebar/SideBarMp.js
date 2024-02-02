import React from 'react'
import { Link } from 'react-router-dom'
import Button from '../Button'

function SideBarMp() {
  return (
    <div className='sidebar'>
       <div className='sidebar-links'>
        <div className='link-sb link-sb-mp'>
                <Link to ='/manpower/manpower-entry'>
                    <Button text={"Entry Detail"}  outlined={true}/>
                </Link>
        </div>
       
        <div className='link-sb link-sb-mp'>
            <Link to ='/manpower/manpower-all' className='link-sb link-sb-mp'>
                <Button text={"All Employee"}  outlined={true}/>
             </Link>
        </div>
        <div className='link-sb link-sb-mp'>
            <Link to ='/manpower/manpower-info' className='link-sb link-sb-mp'>
                <Button text={"Check Info"}  outlined={true}/>
             </Link>
        </div>
       

        </div> 
    </div>
  )
}

export default SideBarMp