import React from 'react'
import Image from '../../assets/Sarkul.png';
import './styles.css';

function WelcomePage({heading,subHeading,disc}) {
  return (
    <div>
         <h1 style={{color:"var(--darkgrey)"}}>{heading}</h1>
       <div className='content'>
       <img className='image' src={Image} alt='Image here'/>

       <div className='text'>
        
          <h3>{subHeading}</h3>
          <p>{disc}</p>
       </div>
    </div>
    </div>
  )
}

export default WelcomePage