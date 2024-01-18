import React, { useRef } from 'react';
import './styles.css';
import { useState } from 'react';
import axios from 'axios';

function Login({setIsUser}) {
    const email = 'cheemstech01@gmail.com';
    const [otp, setOtp] = useState(false);
    const [val, setVal] = useState(true);
    const [isSent, setIsSent] = useState(true);
    const [isVerifying, setIsVerifying] = useState(false);
    const input = useRef(null);

    async function generateOtp()
    {
        setIsSent(false)
        const url = "https://sarkul-v5cz.onrender.com/api/v1/user/send-otp";
        const data = {
            email:`${email}`
        }
        await axios.post(url,data);
        setIsSent(true);
        setOtp(true);
    }
    async function validate()
    {
        const otp = input.current.value;
        
        if(otp=="")
        {
            alert("OTP must be entered");
        }
        else{
            setIsVerifying(true);
            try
            {
                
                const url ="https://sarkul-v5cz.onrender.com/api/v1/user/verify-otp";
                const data = {
                    email:email,
                    otp:parseInt(otp)
                }
                const config = {
                    headers: {
                      'Content-Type': 'application/json',
                    },
                  };
                let response = await axios.post(url,data,config);
                
                setIsUser(true);
                setIsVerifying(false);
                
            }
            catch(error)
                {
                    console.log("************")
                    console.log(error.response.data.message);
                    alert("Wrong OTP: OTP Mismatch");
                    setIsVerifying(false);
                }
              
        }
        
    }

  return (
    
    <div className='login-page'>
    <div className='header'><h2>Welcome to Sarkul Technology Private Limited</h2></div>
    <div className='login-slot'>
        <h1>Login Here</h1>
        <h3>Email: {email}</h3>
        {otp?( isVerifying?(<button className='validate-btn verify'>Verifying... </button>):(<div><input type='number' placeholder='Enter OTP..' ref={input}/> <button className='validate-btn' onClick={validate}>Validate </button> </div>)):
        ( isSent?(<button onClick={generateOtp}>Generate OTP</button>)
        :(<button>Sending...</button>))
        }
       
       
        
    </div>
    <div className='footer'>
        <h3>All rights reserved. Only the person having authentication can login here and access the portal to manage changes...</h3>
    </div>
    </div>
   
  )
}

export default Login