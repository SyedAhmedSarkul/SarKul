import React, { useState, useRef} from 'react'
import SideBar from './SideBar';
import './styles.css';
import Button from '../Button';

function CallLogs() {
const [serialNumber, setSerialNumber] = useState("");
const [customerName, setCustomerName] = useState("");
const [customerCode, setCustomerCode] = useState("");
const [contact, setContact] = useState(0);
const [email, setEmail] = useState("");
const [address, setAddress] = useState("");
const [category, setCategory] = useState("");
const [problem, setProblem] = useState("");
const [modelNumber, setModelNumber] = useState("");
const [item, setItem] = useState("");
const serialNumberRef = useRef(null);
const customerNameRef = useRef(null);
const customerCodeRef = useRef(null);
const contactRef = useRef(null);
const emailRef = useRef(null);
const addressRef = useRef(null);
const categoryRef = useRef(null);
const problemRef = useRef(null);
const modelNumberRef = useRef(null);
const itemRef = useRef(null);

 
  function handleSubmit(event)
  {
    alert("submit")
    event.preventDefault();
    setAddress(addressRef.current.value);
    const obj={
      serialNumber:serialNumber,
      customerName:customerName,
      customerCode:customerCode,
      contact:contact,
      email:email,
      address:address,
      category:category,
      problem:problem,
      modelNumber:modelNumber,
      item:item
    };
  }
  return (
    <div>
      <SideBar/>
     <h3>Call Log</h3>
      <form onSubmit={handleSubmit}>
      <div className='form'>
        <div className='form-left'>
          <div className='form-left-top'>
          <label>Serial number:</label> <input type='text' className='form-input' required ref={serialNumberRef}/><br/>
      <label>Customer Name:</label> <input type='text' className='form-input' required ref={customerNameRef}/><br/>
      <label>Customer Code:</label> <input type='text' className='form-input' required ref={customerCodeRef}/><br/>
          </div>
        
      <label>Contact:</label> <input type='number' className='form-input' required ref={contactRef}/><br/>
      <label>Email id:</label> <input type='email' className='form-input' required ref={emailRef}/><br/>
      <label>Address:</label> <input type='text' className='form-input'required ref={addressRef}/><br/>
        </div>
      <div className='form-right'>
      <label>Category:</label> 
       <select id="dropdown" required>
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
      <div className='form-btn' onClick={handleSubmit}>
         <Button text={"Submit"} outlined={true}/>
         </div>
     
      </div>
      
      </div>
      </form>
      
    </div>
  )
}

export default CallLogs;