import React, { useEffect, useState } from 'react'
import './styles.css';
import SideBar from '../../Sidebar/SideBar';
import axios from 'axios';
import Loader from '../../Loader';

function CallDetails({callNumber}) {
  
  
  useEffect(()=>{getData()},[callNumber]);
  const [isLoading, setIsLoading] = useState(false)
  const [problem, setProblem] = useState("")
  const [customerName, setCustomerName] = useState("")
  const [customerCode, setCustomerCode] = useState("")
  const [contact, setContact] = useState("")
  const [email, setEmail] = useState("")
  const [address, setAddress] = useState("")
  const [category, setCategory] = useState("")
  const [modelNumber, setModelNumber] = useState("")
  const [item, setItem] = useState("")
  const [engineer, setEngineer] = useState("")
  const [date, setDate] = useState("")
  const [serialNumber, setSerialNumber] = useState("")
  const [status, setStatus] = useState("")
  
  
  async function getData()
  {
    setIsLoading(true);
    try{

      let url = `https://sarkul-v5cz.onrender.com/api/v1/call/${callNumber}`;
      
      let response = await axios.get(url);
      // console.log("response.data");
      // console.log(response.data.data);
      setSerialNumber(response.data.data.serialNumber);
   setCustomerName(response.data.data.customerName);
   setCustomerCode(response.data.data.customerCode);
  setContact(response.data.data.contactNumber);
   setEmail(response.data.data.customerEmail);
   setAddress(response.data.data.customerAddress);
   setCategory(response.data.data.category)
   setProblem(response.data.data.problemDescription);
   setModelNumber(response.data.data.itemModelNumber);
   setItem(response.data.data.itemName);
   setEngineer(response.data.data.engineersAssigned[0]);
   setDate(response.data.data.createdAt);
   setStatus(response.data.data.status);
  //  console.log("problem")
  //  console.log(problem)
   setIsLoading(false);
  }
    catch(error)
    {
      console.log("error found is: "+error);
      setIsLoading(false);
      alert("some error occured");
    }
  }



  return (
    <div>
       {isLoading? <Loader/>: (
         <div className='details call-details-card'>
         <div className='call-update-left'>
         <label className='update-label call-detail-label'>Call Number: </label> {callNumber} <br/><br/>
         <label className='update-label call-detail-label'>Serial Number: </label> {serialNumber}<br/><br/>
         <label className='update-label call-detail-label'>Customer Name: </label> {customerName}<br/><br/>
         <label className='update-label call-detail-label'>Customer Code: </label> {customerCode}<br/><br/>
         <label className='update-label call-detail-label'>Contact: </label> {contact}<br/><br/>
         <label className='update-label call-detail-label'>Email: </label> {email}<br/><br/>
         <label className='update-label call-detail-label'>Call Status: </label> {status}<br/><br/>
         
           
         </div>
         <div className='call-update-right'>
         <label className='update-label call-detail-label'>Category: </label> {category}<br/><br/>
         <label className='update-label call-detail-label'>Problem: </label> {problem}<br/><br/>
         <label className='update-label call-detail-label'>Model Number: </label> {modelNumber}<br/><br/>
         <label className='update-label call-detail-label'>Item: </label> {item}<br/><br/>
         <label className='update-label call-detail-label'>Address: </label> {address}<br/><br/>
         <label className='update-label call-detail-label'>Engineer Assigned: </label> {engineer}<br/><br/>
         <label className='update-label call-detail-label'>Call-log Date: </label> {date.slice(0,10)}
         </div>

 </div>
       )}
    </div>
  )
}

export default CallDetails;