import React, { useEffect, useState } from 'react'
import SideBar from '../Sidebar/SideBar';
import axios from 'axios';
import CallCard from '../Helper/CallCard/CallCard';
import Loader from '../Loader';

function ClosedCall() {
  const [arr, setArr] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(()=>{
    getData();
  },[])
async function getData()
{
  setIsLoading(true)
  try{
    let url = 'https://sarkul-v5cz.onrender.com/api/v1/call/closed'
    let response = await axios.get(url);
    console.log("response in closed");
    console.log(response.data.data);
    setArr(response.data.data);
    setIsLoading(false)
  }
  catch(error)
  {
    console.log("error in closed call: "+error)
    alert("some error occured");
    setIsLoading(false)
  }
}





  return (
    <div>
      <SideBar/>
      <h2> Closed Calls</h2>
      {isLoading? <Loader/>: 
     
      <ol>
        {arr.map((item)=>{
          return <li><CallCard callNumber={item.callId} customerName={item.customerName} date={item.createdAt}/></li>
        })}
      </ol>
     }
      </div>
  )
}

export default ClosedCall;