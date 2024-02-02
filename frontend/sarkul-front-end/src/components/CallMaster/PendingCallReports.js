import React, {useEffect, useState} from 'react';
import SideBar from '../Sidebar/SideBar';
import Image from '../../assets/Sarkul.png';
import CallCard from '../Helper/CallCard/CallCard';
import axios from 'axios';
import Loader from '../Loader';
import {Link} from 'react-router-dom';
import {toast, ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import SideBarMain from '../Sidebar/SideBarMain';

function PendingCallReports() {
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
      const createdAt = new Date("2024-01-29");
      // let url = `https://sarkul-v5cz.onrender.com/api/v1/call/pending?createdAt=${createdAt}`;
      let token= localStorage.getItem("accessToken");
      let config={
          headers:{
            'Authorization': `Bearer ${token}`,
            
            'Content-Type': 'application/json'
          }
      }
      let url = 'https://sarkul-v5cz.onrender.com/api/v1/call/pending';
      let response = await axios.get(url,config);
      setArr(response?.data.data);
      setSuccessMsg(response?.data.message);
      setIsLoading(false);
    }
    catch (error) {
      setErrorMsg(error.response?.data.message);
      setIsLoading(false);
    }
  }



  return (
    <div>
      <SideBarMain/>
      <SideBar/>
      <h2>Pending Call</h2>
      {isLoading ? <Loader /> :

        <ol>
          {arr.map((item) => {
            return <Link to={`/callmaster/call-details-specific/${item.callId}`} key={item.callId}> <CallCard callNumber={item.callId} customerName={item.customerName} date={item.createdAt} /> </Link>;
          })}
        </ol>
      }
      {/* <CallCard callNumber={674612} customerName={"Cinthol Bank"} date={'26/01/2024'} />
      <CallCard callNumber={674612} customerName={"Cinthol Bank"} date={'26/01/2024'} />
      <CallCard callNumber={674612} customerName={"Cinthol Bank"} date={'26/01/2024'} />
      <CallCard callNumber={674612} customerName={"Cinthol Bank"} date={'26/01/2024'} />
      <CallCard callNumber={674612} customerName={"Cinthol Bank"} date={'26/01/2024'} /> */}

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

export default PendingCallReports;