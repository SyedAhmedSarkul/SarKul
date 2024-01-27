import React, { useEffect, useState } from 'react'
import SideBar from '../Sidebar/SideBar';
import Image from '../../assets/Sarkul.png';
import CallCard from '../Helper/CallCard/CallCard';
import axios from 'axios';
import Loader from '../Loader';
import { Link } from 'react-router-dom';

function PendingCallReports() {
  const [arr, setArr] = useState([]);
  const [isLoading, setIsLoading] = useState(false)
  useEffect(()=>{
    
    getData();
  },[])

  async function getData(){
    setIsLoading(true);
      try{
        const createdAt = new Date("2024-01-29"); 
        // let url = `https://sarkul-v5cz.onrender.com/api/v1/call/pending?createdAt=${createdAt}`;
        let url = 'https://sarkul-v5cz.onrender.com/api/v1/call/pending';
        let response = await axios.get(url);
        console.log("response in pending");
        console.log(response.data.data);
        setArr(response.data.data);
        setIsLoading(false)
      }
      catch(error)
      {
        console.log("Error of pending call: "+error)
        alert("some error occured");
        setIsLoading(false);
      }
  }



  return (
    <div>
      <SideBar/>
     <h2>Pending Call</h2> 
     {isLoading? <Loader/>: 
     
      <ol>
        {arr.map((item)=>{
          return <Link to={`/callmaster/call-details-specific/${item.callId}`}> <CallCard callNumber={item.callId} customerName={item.customerName} date={item.createdAt}/> </Link> 
        })}
      </ol>
     }
      {/* <CallCard callNumber={674612} customerName={"Cinthol Bank"} date={'26/01/2024'} />
      <CallCard callNumber={674612} customerName={"Cinthol Bank"} date={'26/01/2024'} />
      <CallCard callNumber={674612} customerName={"Cinthol Bank"} date={'26/01/2024'} />
      <CallCard callNumber={674612} customerName={"Cinthol Bank"} date={'26/01/2024'} />
      <CallCard callNumber={674612} customerName={"Cinthol Bank"} date={'26/01/2024'} /> */}


    </div>
  )
}

export default PendingCallReports