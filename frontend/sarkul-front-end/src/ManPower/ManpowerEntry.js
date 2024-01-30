import React, { useRef } from 'react'
import SideBarMp from '../components/Sidebar/SideBarMp';
import './manpower.css';

function ManpowerEntry() {

    let nameRef = useRef(null);
    let addressRef = useRef(null);
    let idRef = useRef(null);
    let designationRef = useRef(null);
    let joiningRef = useRef(null);
    let birthRef = useRef(null);
    let sallaryRef = useRef(null);
    let qualificationRef = useRef(null);
    let certificateRef = useRef(null);
    let referenceRef = useRef(null);
    let emailRef = useRef(null);
    let contactRef = useRef(null);
    
    async function handleSubmit(e)
    {
        e.preventDefault();
        let name = nameRef.current.value;
        let address = addressRef.current.value;
        let id = idRef.current.value;
        let designation = designationRef.current.value;
        let joining = joiningRef.current.value;
        let birth = birthRef.current.value;
        let sallary = sallaryRef.current.value;
        let qualification = qualificationRef.current.value;
        let certificate = certificateRef.current.value;
        let reference = referenceRef.current.value;
        console.log(joining);
        console.log(name);
        alert("done")

    }
  return (
    <div>
        <SideBarMp/>
        <h2>Manpower Entry</h2>

        <form className='form' onSubmit={handleSubmit}>
          <div className='form-left '>
            <div className='form-left-top'>
              <label>Name:</label> <input type='text' className='form-input' required ref={nameRef}/><br />
             
              <label>Address:</label> <input type='text' className='form-input' required ref={addressRef}/><br />
            {/* <label>Id Proof:</label> <input type='text' className='form-input' ref={idRef} /><br /> */}
            </div>

                <div className='form-left-bottom'>
                <label>Designation:</label> <input type='text' className='form-input' required ref={designationRef} /><br />
            <label>Joining Date:</label> <input type='date' className='form-input' required ref={joiningRef}/><br />
            <label>Date of Birth:</label> <input type='date' className='form-input' required ref={birthRef}/><br />
            <label>Sallary:</label> <input type='text' className='form-input' required ref={sallaryRef}/><br />
                </div>
           
          </div>
          <div className='form-right'>
            
            <label>Qualification:</label> <input type='text' className='form-input' required ref={qualificationRef} /><br />
     
              <label>Documents:</label> <input type='text' className='form-input'  ref={certificateRef} /><br />
            

            <label>Email:</label> <input type='email' className='form-input' required ref={emailRef}/><br/>
            <label>Contact:</label> <input type='number' className='form-input' required ref={contactRef}/><br/>
            <label>Reference:</label> <input type='text' className='form-input' required ref={referenceRef}/><br/>

            <input type='submit' value='Submit' className='submit-btn' onSubmit={handleSubmit} />

          </div>

        </form>
    </div>
  )
}

export default ManpowerEntry