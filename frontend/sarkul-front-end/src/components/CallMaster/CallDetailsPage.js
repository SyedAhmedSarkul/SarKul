import React, { useRef, useState } from 'react'
import CallDetails from '../Helper/CallDetail'
import SideBar from '../Sidebar/SideBar';
import Image from '../../assets/Sarkul.png';

function CallDetailsPage() {
    let callNumberRef = useRef(null);
    const [flag, setFlag] = useState(false);
    const [callNumber, setCallNumber] = useState("");
    
    function handleSubmit(e)
    {
        e.preventDefault();
        setCallNumber(callNumberRef.current.value);
        setFlag(true);

    }
  return (
    <div>
        <SideBar/>
        <img className='image' src={Image} alt='Image here'/>
        <form onSubmit={handleSubmit} className='call-details-div'>
        <label className='call-details-page-label'>Search: </label> <input type='text' className='form-input' placeholder='search by call number...' ref={callNumberRef} required/>
        <input type='submit' value='Search' className='submit-btn' onSubmit={handleSubmit}/>
        </form>
       {flag?( <div><CallDetails callNumber={callNumber}/></div>):
       (<h3 className='call-details-text'>You can now get here the call details by searching the call number</h3>)
       }
       
    </div>
  )
}

export default CallDetailsPage