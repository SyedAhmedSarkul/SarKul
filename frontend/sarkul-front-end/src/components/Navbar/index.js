import React from 'react'
import './styles.css';
import { Link } from 'react-router-dom';
import Button from '../Button';
import { GrLogout } from "react-icons/gr";

function NavBar() {
  return (
    <div className='navbar'>
          <h1 style={{color:"var(--white)"}} className='title'>Sarkul Technology Private Limited</h1>
       
      <Link to="/logout" className='logout'>
      <GrLogout/>
      </Link>
       
    </div>
  )
}

export default NavBar