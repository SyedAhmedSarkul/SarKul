import React, { useRef, useState } from 'react'
import SideBarMp from '../components/Sidebar/SideBarMp'
import Image from '../assets/Sarkul.png'
import EmployeeDetail from '../components/Helper/EmployeeDetail';

function ManpowerInfo() {
  const [flag, setFlagg] = useState(false);
  const [id, setId] = useState("");
  let empRef = useRef(null); 
  async function handleSubmit(e)
  {
      e.preventDefault();
      setId(empRef.current.value); 
      setFlagg(true);
  }
  return (
    <div>
        <SideBarMp/>
       <h2>Manpower Info</h2>
       <img className='image' src={Image} alt='Image here'/>
        <form onSubmit={handleSubmit} className='call-details-div'>
        <label className='call-details-page-label'>Search: </label> <input type='text' className='form-input' placeholder='search by employee id...' ref={empRef} required/>
        <input type='submit' value='Search' className='submit-btn' onSubmit={handleSubmit}/> 
        </form>

        {flag?( <div className='emp-detail-container'><EmployeeDetail id={id} setFlag={setFlagg}/></div>):
       (<h3 className='emp-details-text'>You can now get here the call details by searching the call number</h3>)
       }
       

       


    </div>
  )
}

export default ManpowerInfo