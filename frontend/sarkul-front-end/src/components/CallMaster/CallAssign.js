import React from 'react'
import SideBar from '../Sidebar/SideBar';
import Image from '../../assets/Sarkul.png';
import './styles.css';

function CallAssign() {
  async function handleSubmit(event)
  {
    event.preventDefault();
    alert("done")
  }
  return (
    <div className='call-assign-parent'>
      <SideBar/>
      <h2>Call Assign</h2>
      <img className='image' src={Image} alt='Image here'/>
      <form className='call-assign-form' onSubmit={handleSubmit}>
      <h3>Assign the call to the Engineer</h3>
      <div className='call-assign-main'>
      <div className='call-assign-input'>
      <label>Call Number: </label>
      <input type='text' className='form-input' required />
      </div>
      <div className='call-assign-input'>
      <label>Engineer Name: </label>
      <input type='text' className='form-input' required />
      </div>
      </div>
      
      <input type='submit' value='Submit' className='submit-btn call-assign-btn' onSubmit={handleSubmit}/>

      </form>
      </div>
  )
}

export default CallAssign