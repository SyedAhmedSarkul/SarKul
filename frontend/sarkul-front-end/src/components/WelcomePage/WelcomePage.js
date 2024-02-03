import React from 'react'

import './styles.css';

function WelcomePage({heading, Image}) {
  return (
    <div>
         <h1 style={{color:"black", zIndex:"1000"}}>{heading}</h1>
       <div className='content'>
       <img className='image-call'  src={Image} alt='Image here'/>

    </div>
    </div>
  )
}

export default WelcomePage