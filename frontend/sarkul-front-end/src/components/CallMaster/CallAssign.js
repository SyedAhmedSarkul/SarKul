import React, { useRef, useState } from 'react'
import SideBar from '../Sidebar/SideBar';
import Image from '../../assets/Sarkul.png';
import './styles.css';
import axios from 'axios';
import Loader from '../Loader';


function CallAssign() {
  const [isLoading, setIsLoading] = useState(false);
  const callRef = useRef(null);
  const nameRef = useRef(null);
  async function handleSubmit(event)
  {
    setIsLoading(true);
    event.preventDefault();
   
        let data={
          callId:callRef.current.value,
          engineerName:nameRef.current.value
        }
        await postData(data);
    setIsLoading(false);
  }


  async function postData(data)
  {
    try{
    let url = 'https://sarkul-v5cz.onrender.com/api/v1/call/assign';
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }
    let response = await axios.post(url,data,config);
    console.log("response");
    console.log(response.data);
    
    }
    catch(error)
    {
      console.log("error while assigning: "+error);
      alert("some error occured");
    }
       
  }




  return (
    <div className='call-assign-parent'>
      <SideBar/>
      <h2>Call Assign</h2>
      <img className='image' src={Image} alt='Image here'/>
      {isLoading?(<Loader/>):
      (
        <form className='call-assign-form' onSubmit={handleSubmit}>
        <h3>Assign the call to the Engineer</h3>
        <div className='call-assign-main'>
        <div className='call-assign-input'>
        <label>Call Number: </label>
        <input type='text' className='form-input' ref={callRef} required />
        </div>
        <div className='call-assign-input'>
        <label>Engineer Name: </label>
        <input type='text' className='form-input' ref={nameRef} required />
        </div>
        </div>
        
        <input type='submit' value='Submit' className='submit-btn call-assign-btn' onSubmit={handleSubmit}/>
  
        </form>
      )}
     
      </div>
  )
}

export default CallAssign