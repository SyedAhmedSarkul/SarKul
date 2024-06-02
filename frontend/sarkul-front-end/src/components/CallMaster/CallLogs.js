import React, { useRef, useState } from 'react';
import './styles.css';
import axios from 'axios';
import Loader from '../Loader';
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import SideBarMain from '../Sidebar/SideBarMain'
import SideBar from '../Sidebar/SideBar'

function CallLogs() {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  let serialNumber = "";
  let customerName = '';
  let customerCode = '';
  let contact = 0;
  let email = '';
  let address = '';
  let category = '';
  let problem = '';
  let modelNumber = '';
  let item = '';
  let userName = '';
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
  let userNameRef = useRef(null);
  let callNumber = 0;


  async function handleSubmit(event) {
    setIsLoading(true);
    event.preventDefault();
    serialNumber = serialNumberRef.current.value;
    userName = userNameRef.current.value;
    customerName = customerNameRef.current.value;
    customerCode = customerCodeRef.current.value;
    contact = contactRef.current.value;
    email = emailRef.current.value;
    address = addressRef.current.value;
    category = categoryRef.current.value;
    problem = problemRef.current.value;
    modelNumber = modelNumberRef.current.value;
    item = itemRef.current.value;

    let obj = {
      serialNumber: serialNumber,
      customerName: customerName,
      customerCode: customerCode,
      contactNumber: contact,
      customerEmail: email,
      userName:userName,
      customerAddress: address,
      problemDescription: problem,
      category: category,
      itemName: item,
      itemModelNumber: modelNumber
    };
    console.log(obj,'obj');
    await postData(obj);
    setIsLoading(false);

  }

  async function postData(data) {
    try {
      let token = sessionStorage.getItem("accessToken");
      let url = 'https://sarkultechapi.onrender.com/api/v1/call';
      const config = {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'Application/json'
        },
      };
      const response = await axios.post(url, data, config);

      const callNumber = response.data.data;
      alert("Call Created with call number: " + callNumber);
      // setSuccessMsg(`${response.data.message} with id ${callNumber}`);

    } catch (error) {
      // console.error('Error:', error);
      // alert(error.response.data.message);
      setErrorMsg(error.response.data.message);
    }

  }

  return (
    <div>
      {/* <img className='image' src={Image} alt='Image here'/> */}
      <SideBarMain />
      <SideBar />
      <h2>Call Log</h2>
      {isLoading ? (<Loader />) : (
        <form className='form' onSubmit={handleSubmit}>
          <div className='form-left'>
            <div className='form-left-top'>
              <label>Serial number:</label> <input type='text' className='form-input' ref={serialNumberRef} /><br />
              <label>Customer Name:</label> <input type='text' className='form-input' required ref={customerNameRef} /><br />
              <label>Customer Code:</label> <input type='text' className='form-input' required ref={customerCodeRef} /><br />
              <label>User Name:</label> <input type='text' className='form-input' required ref={userNameRef} /><br />
            </div>

            <label>Contact:</label> <input type='number' className='form-input' required ref={contactRef} /><br />
            <label>Email id:</label> <input type='email' className='form-input' ref={emailRef} /><br />
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
              <option value="UPS">UPS</option>
              <option value="cctv">CCTV</option>
              <option value="activity">Activity</option>
            </select><br />
            <label>Address:</label> <input type='text' className='form-input' required ref={addressRef} /><br />
            <label>Problem:</label> <input type='text' className='form-input' required ref={problemRef} /><br />
            <div className='model-number'>
              <label>Model Number:</label> <input type='text' className='form-input' required ref={modelNumberRef} /><br />
            </div>

            <label>Group:</label> <input type='text' className='form-input' required ref={itemRef} /><br /><br /><br />

            <input type='submit' value='Submit' className='submit-btn' onSubmit={handleSubmit} />

          </div>

        </form>
      )}

      {
        errorMsg && <ToastContainer
          position="top-center"
          closeOnClick
          pauseOnFocusLoss
          pauseOnHover
        >
          {toast.error(errorMsg)}
        </ToastContainer>
      }
      {
        successMsg && <ToastContainer
          position="top-center"
          closeOnClick
          pauseOnFocusLoss
          pauseOnHover
        >
          {toast.success(successMsg)}
        </ToastContainer>
      }
    </div>



  );
}

export default CallLogs;