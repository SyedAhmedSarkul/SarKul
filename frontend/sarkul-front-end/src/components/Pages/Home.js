import React, { useState,useEffect} from 'react'
import NavBar from '../Navbar';
import Image from '../../assets/Corporate.jpeg';
import SideBarMain from '../Sidebar/SideBarMain';
import './pages.css';
import { useLocation, useNavigate } from 'react-router-dom';


function Home() {
   let nav = useNavigate();
   const location = useLocation();
const currentRoute = location.pathname;
const [flag, setFlag] = useState(false);


useEffect(() => {
  if (currentRoute === '/') {
    setFlag(true);
  } else {
    setFlag(false);
  }
  console.log(currentRoute)
}, [currentRoute]);


  return (
    <div >
       <NavBar/>
       <div className={flag?'home-page':'non'}>

       <SideBarMain/>
       </div>
       {/* <h1> Welcome to Sarkul Technology Private Limited</h1> */}
      {/* <img className='image-home' style={{display:flag?'block':'none'}} src={Image} alt='Image here'/> */}
      
         
     
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