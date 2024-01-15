import React from 'react';
import './styles.css';
import sarkul from '../../assets/SarkulImage.png'

function Login() {
  return (
    <div className='login-page'>
        <div className='img-slot'>
        <img src={sarkul} alt="Sarkul Image" />
        </div>
    <div className='login-slot'>
        <h1>Login</h1>
        
    </div>
    </div>
  )
}

export default Login