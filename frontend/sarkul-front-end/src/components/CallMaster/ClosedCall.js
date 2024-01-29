import React, {useEffect, useState} from 'react';
import SideBar from '../Sidebar/SideBar';
import axios from 'axios';
import CallCard from '../Helper/CallCard/CallCard';
import Loader from '../Loader';
import {Link} from 'react-router-dom';
import {toast, ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function ClosedCall() {
  const [arr, setArr] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  useEffect(() => {
    getData();
  }, []);
  async function getData() {
    setIsLoading(true);
    try {
      let url = 'https://sarkul-v5cz.onrender.com/api/v1/call/closed';
      let response = await axios.get(url);
      // console.log("response in closed");
      // console.log(response.data.data);
      setArr(response.data.data);
      setSuccessMsg(response.data.message);
      setIsLoading(false);
    }
    catch (error) {
      // console.log("error in closed call: "+error)
      // alert("some error occured");
      setErrorMsg(error.response.data.message);
      setIsLoading(false);
    }
  }





  return (
    <div>
      <SideBar />
      <h2> Closed Calls</h2>
      {isLoading ? <Loader /> :

        <ol>
          {arr.map((item) => {
            return <Link to={`/callmaster/call-details-specific/${item.callId}`} key={item.callId}> <CallCard callNumber={item.callId} customerName={item.customerName} date={item.createdAt} /> </Link>;
          })}
        </ol>
      }

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

export default ClosedCall;