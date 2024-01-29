import React, {useRef, useState} from 'react';
import SideBar from '../Sidebar/SideBar';
import Image from '../../assets/Sarkul.png';
import './styles.css';
import axios from 'axios';
import Loader from '../Loader';
import {toast, ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function CallAssign() {
  const [isLoading, setIsLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const callRef = useRef(null);
  const nameRef = useRef(null);
  async function handleSubmit(event) {
    setIsLoading(true);
    event.preventDefault();

    let data = {
      callId: callRef.current.value,
      // engineerName:nameRef.current.value
      engineerName: 'Max Nepali'
    };
    await postData(data);
    setIsLoading(false);
  }


  async function postData(data) {
    try {
      let token= localStorage.getItem("accessToken");
      let url = 'https://sarkul-v5cz.onrender.com/api/v1/call/assign';
      const config = {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      };
      let response = await axios.post(url, data, config);
      console.log("response in assign");
      console.log(response.data);
      setSuccessMsg(response?.data?.message);
      // alert("call assigned successfully");

    }
    catch (error) {
      console.log("error while assigning: ");
      console.log(error);
      // alert(error.response.data.message);
      setErrorMsg(error.response.data.message);
    }

  }




  return (
    <div className='call-assign-parent'>
      <SideBar />
      <h2>Call Assign</h2>
      <img className='image' src={Image} alt='Image here' />
      {isLoading ? (<Loader />) :
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

            <input type='submit' value='Submit' className='submit-btn call-assign-btn' onSubmit={handleSubmit} />

            {successMsg && (
              <ToastContainer
                position="top-center"
                closeOnClick
                pauseOnFocusLoss
                theme='light'
              >
                {toast.success(successMsg)}
              </ToastContainer>
            )}

            {errorMsg && (
              <ToastContainer
                position="top-center"
                closeOnClick
                pauseOnFocusLoss
                theme='light'>
                {toast.error(errorMsg)}
              </ToastContainer>
            )}

          </form>
        )}

    </div>
  );
}

export default CallAssign;