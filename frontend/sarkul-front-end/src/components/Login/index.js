import React, { useRef } from 'react';
import './styles.css';
import { useState } from 'react';

function Login() {
    const email = 'cheemstech01@gmail.com';
    const [otp, setOtp] = useState(false);
    const [val, setVal] = useState(true);
    const input = useRef(null);

    async function generateOtp()
    {
        alert(`OTP sent to ${email}`);
        setOtp(true)
    }
    async function validate()
    {
        const val = input.current.value;
        if(val=="")
        {
            alert("OTP must be entered");
        }
        else{
            alert(val);
        }
        
    }

  return (
    
    <div className='login-page'>
    <div className='header'><h2>Welcome to Sarkul Technology Private Limited</h2></div>
    <div className='login-slot'>
        <h1>Login Here</h1>
        <h3>Email: {email}</h3>
        {otp?( <div><input type='number' placeholder='Enter OTP..' ref={input}/> <button className='validate-btn' onClick={validate}>Validate </button> </div>):
        ( <button onClick={generateOtp}>Generate OTP</button>)
        }
       
       
        
    </div>
    <div className='footer'>
        <h3>All rights reserved. Only the person having authentication can login here and access the portal to manage changes...</h3>
    </div>
    </div>
   
  )
}

export default Login