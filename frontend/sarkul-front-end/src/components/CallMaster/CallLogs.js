import React, {useRef, useState} from 'react'
import SideBar from '../Sidebar/SideBar';
import './styles.css';
import axios from 'axios';
import Image from '../../assets/Sarkul.png';
import Loader from '../Loader';

function CallLogs() {
  const [isLoading, setIsLoading] = useState(false);
let serialNumber=""
let customerName=''
let customerCode=''
let contact = 0;
let email=''
let address= ''
let category=''
let problem=''
let modelNumber=''
let item=''
let serialNumberRef = useRef(null);
let customerNameRef = useRef(null);
let customerCodeRef = useRef(null);
let contactRef = useRef(null);
let emailRef = useRef(null);
let addressRef = useRef(null);
let categoryRef = useRef(null);
let problemRef = useRef(null);
let modelNumberRef = useRef(null);
let itemRef = useRef(null);
let callNumber=0;

 
  async function handleSubmit(event)
  {
  setIsLoading(true);
    event.preventDefault();
    serialNumber = serialNumberRef.current.value;
    
    customerName = customerNameRef.current.value;
    customerCode = customerCodeRef.current.value;
    contact = contactRef.current.value;
    email = emailRef.current.value;
    address = addressRef.current.value;
    category= categoryRef.current.value;
    problem = problemRef.current.value;
    modelNumber = modelNumberRef.current.value;
    item = itemRef.current.value;
   
    let obj={
      serialNumber:serialNumber,
      customerName:customerName,
    customerCode:customerCode,
     contactNumber:contact,
     customerEmail:email,
     customerAddress:address,
     problemDescription:problem,
     category:category,
     itemName:item,
     itemModelNumber:modelNumber
    };
    
    await postData(obj);
    setIsLoading(false);
    
  }

  async function postData(data) {
    try {
      let url = 'https://sarkul-v5cz.onrender.com/api/v1/call';
      const config = {
        headers: {
          'Content-Type': 'Application/json'
        },
      };
      const response = await axios.post(url,data,config);
    
      callNumber=response.data.data;
      alert("Call Created with call number: "+callNumber)

    } catch (error) {
      console.error('Error:', error);
      alert(error.response.data.message);
    }

  }
  
  return (
    <div>
     {/* <img className='image' src={Image} alt='Image here'/> */}
      <SideBar/>
     <h2>Call Log</h2>
     {isLoading? (<Loader/>): (
      <form className='form' onSubmit={handleSubmit}>
      <div className='form-left'>
        <div className='form-left-top'>
        <label>Serial number:</label> <input type='text' className='form-input' ref={serialNumberRef}/><br/>
    <label>Customer Name:</label> <input type='text' className='form-input' required ref={customerNameRef}/><br/>
    <label>Customer Code:</label> <input type='text' className='form-input' required ref={customerCodeRef}/><br/>
        </div>
      
    <label>Contact:</label> <input type='number' className='form-input' required ref={contactRef}/><br/>
    <label>Email id:</label> <input type='email' className='form-input' required ref={emailRef}/><br/>
    <label>Address:</label> <input type='text' className='form-input'required ref={addressRef}/><br/>
      </div>
    <div className='form-right'>
    <label>Category:</label> 
     <select id="dropdown" required ref={categoryRef}>
      <option value="">-- Select --</option>
      <option value="desktop">Desktop</option>
      <option value="laptop">Laptop</option>
      <option value="printer">Printer</option>
      <option value="plotter">Plotter</option>
      <option value="scanner">Scanner</option>
      <option value="server">Server</option>
    </select><br/>
    <label>Problem:</label> <input type='text' className='form-input' required ref={problemRef}/><br/>
    <div className='model-number'>
    <label>Model Number:</label> <input type='text' className='form-input' required ref={modelNumberRef}/><br/>
    </div>
    
    <label>Item:</label> <input type='text' className='form-input' required ref={itemRef}/><br/><br/><br/>
    
       <input type='submit' value='Submit' className='submit-btn' onSubmit={handleSubmit}/>
   
    </div>
    </form>
     )}
      
      </div>
      
      
    
  )
}

export default CallLogs;