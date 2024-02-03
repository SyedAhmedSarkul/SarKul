import React, { useEffect, useState } from 'react'
import SideBarMp from '../components/Sidebar/SideBarMp';
import axios from 'axios';
import Loader from '../components/Loader';
import { Link } from 'react-router-dom';
import EmployeeCard from '../components/Helper/EmployeeCard';
import SideBarMain from '../components/Sidebar/SideBarMain'
import {toast, ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
function AllEmployee() {
    const [arr, setArr] = useState([]);
    const [isLoading, setIsLoading] = useState(false)
    const [errorMsg, setErrorMsg] = useState("");
    useEffect(()=>{
        getData();
    },arr);

    async function getData(){
        setIsLoading(true);
            try
            {
                let token= localStorage.getItem("accessToken");
                 let url= 'https://sarkul-v5cz.onrender.com/api/v1/engineer'
                let config={
                     headers:{
                      'Authorization': `Bearer ${token}`,
                      'Content-Type': 'application/json'
                     }
                }
            
            let response = await axios.get(url,config);
            setArr(response.data.data);
            console.log(response.data.data)
            setIsLoading(false);
            }
            catch(error)
            { 
                setErrorMsg(error.response.data.message);
                setIsLoading(false);
            }
    }


  return (
    <div>
      <SideBarMain/>
        <SideBarMp/>
        <h2>All Employee</h2>

        {isLoading? ( <Loader/> ): 
        (
            <ol>
            {arr.map((item)=>{
            //   return <Link to={`/callmaster/call-details-specific/${item.callId}`}> 
            //   <EmployeeCard id={item.id} name={} contact={}    />
            //   </Link>
              return  <Link to={`/manpower/manpower-specific/${item.employeeCode}`}> <EmployeeCard id={item.employeeCode} name={item.employeeName} contact={item.status}    /> </Link>
             
              
            })}
          </ol>

        )
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
        
    </div>
  )
}

export default AllEmployee