import React from 'react'
import './styles.css';
import { Link } from 'react-router-dom';
import Button from '../Button';

function NavBar() {
  return (
    <div className='navbar'>
          <h1 style={{color:"var(--white)"}}>Sarkul Tech<span style={{color:"var(--white)"}}>.</span></h1>
        <div className='links'>
        <Link to="/callmaster" className='link'>
        <Button text={"Call Master"}  outlined={true}/>
        </Link>
      <Link to="/stockmanagement" className='link'>
      <Button text={"Stock Management"}  outlined={true}/>
      </Link>
      <Link to="/parttransaction" className='link'>
      <Button text={"Part Transaction"}  outlined={true}/>
      </Link>
      <Link to="/manpower" className='link'>
      <Button text={"Man Power"}  outlined={true}/>
      </Link>
        </div>
       
    </div>
  )
}

export default NavBar