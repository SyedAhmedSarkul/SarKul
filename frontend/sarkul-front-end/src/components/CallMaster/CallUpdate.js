import {useState,React, useRef} from 'react'
import SideBar from '../Sidebar/SideBar';
import Image from '../../assets/Sarkul.png';
import './styles.css'
import Loader from '../Loader';


function CallUpdate() {
  const [callNumber,setCallNumber] = useState("28342")
  const [flag,setFlag] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  let customerRemarks = "";
  let engineerRemarks = "";
  let partStatus = "";
  let engineerRef = useRef(null);
  let customerRef = useRef(null);
  let partRef = useRef(null);
  let serialNumber="serial hai"
let customerName='customer h'
let customerCode='code h'
let contact = 0;
let email='email to hai'
let address= 'bardaha'
let category='hmmcategory'
let problem='no problem'
let modelNumber='what is model'
let item='itemji';
let engineer ="Minhaj"

async function getCall(e)
{
  e.preventDefault();
  setIsLoading(true);
   setTimeout(()=>{setIsLoading(false)},300);
   setFlag(true)
  
}



function handleSubmit(e)
{
  e.preventDefault();
  setIsLoading(true);
  setTimeout(()=>{setIsLoading(false)},3000);
  customerRemarks=customerRef.current.value;
  engineerRemarks=engineerRef.current.value;
  partStatus=partRef.current.value;
  console.log(customerRemarks);
  console.log(engineerRemarks);
  console.log(partStatus);
  

}
function handleClose(){
  setIsLoading(true);
  setTimeout(()=>{setIsLoading(false)},3000);
    // alert("call closed")
}





  return (
    <div>
      
      <SideBar/>
     <h2>Call Update</h2>
     <img className='image' src={Image} alt='Image here'/>
      
      {isLoading? (<Loader/>) :  (!flag?(
          <form className='call-assign-form' onSubmit={getCall}> {/*call assign classname working here...*/}
          <h3>Update the Call here..</h3>
            <label>Call Number: </label><input type='text' className='form-input'required/>
            <input type='submit' className='submit-btn' onSubmit={getCall}/>
          </form>
      ):(
          <div className='call-update-detail'>
            <div className='details'>
            <div className='call-update-left'>
            <label className='update-label'>Call Number: </label> {callNumber} <br/><br/>
            <label className='update-label'>Serial Number: </label> {serialNumber}<br/><br/>
            <label className='update-label'>Customer Name: </label> {customerName}<br/><br/>
            <label className='update-label'>Customer Code: </label> {customerCode}<br/><br/>
            <label className='update-label'>Contact: </label> {contact}<br/><br/>
            <label className='update-label'>Email: </label> {email}<br/><br/>
            
              
            </div>
            <div className='call-update-right'>
            <label className='update-label'>Category: </label> {category}<br/><br/>
            <label className='update-label'>Problem: </label> {problem}<br/><br/>
            <label className='update-label'>Model Number: </label> {modelNumber}<br/><br/>
            <label className='update-label'>Item: </label> {item}<br/><br/>
            <label className='update-label'>Address: </label> {address}<br/><br/>
            <label className='update-label'>Engineer Assigned: </label> {engineer}

            </div>
            </div>
           
            <form className='update-form' onSubmit={handleSubmit}>
              <div className='update-form-input'>
              <label>Customer's remarks: </label>
      <input type='text' className='form-input' required ref={customerRef}/><br/>
            <label>Engineer's remarks: </label>
      <input type='text' className='form-input' required ref={engineerRef}/>
      
              </div>
              <div className='update-form-right'>

              <label id='part-label'>Part Status:</label>
           <select id="dropdown"  ref={partRef} required >
        <option value="">-- Select --</option>
        <option value="partRequired">Part Required</option>
        <option value="partPending">Part Pending</option>
      </select>
      
          <div className='form-buttons'>
          <input type='submit' value='Update' className='submit-btn update-btn' onSubmit={handleSubmit}/>
            <button id='close-call' onClick={handleClose}>Call Close</button>
            </div>
      
           
          
         
              </div>
             
           
      

            </form>
           
           
          </div>
      ))}
      </div>
  )
}

export default CallUpdate