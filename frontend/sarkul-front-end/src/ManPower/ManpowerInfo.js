import React, { useRef } from 'react'
import SideBarMp from '../components/Sidebar/SideBarMp'
import Image from '../assets/Sarkul.png'
import EmployeeDetail from '../components/Helper/EmployeeDetail';

function ManpowerInfo() {
  let empRef = useRef(null); 
  async function handleSubmit(e)
  {
      e.preventDefault();
      let id = empRef.current.value;   
      alert(id); 
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


        <EmployeeDetail/>


    </div>
  )
}

export default ManpowerInfo