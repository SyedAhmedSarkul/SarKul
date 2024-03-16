import React, { useRef, useState } from 'react'
import SideBarMp from '../Sidebar/SideBarMp';
import './manpower.css';
import axios from 'axios';
import Loader from '../Loader';
import 'react-toastify/dist/ReactToastify.css';
import SideBarMain from '../Sidebar/SideBarMain';


function ManpowerEntry() {
  const [isLoading, setIsLoading] = useState(false)

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
  let expRef = useRef(null);
  let skillsRef = useRef(null);



  async function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);
    const formData = new FormData();
    formData.append('employeeName', nameRef.current.value);
    formData.append('employeeAddress', addressRef.current.value);
    formData.append('employeeDesignation', designationRef.current.value);
    formData.append('joinDate', joiningRef.current.value);
    formData.append('employeeDOB', birthRef.current.value);
    formData.append('salary', sallaryRef.current.value);
    formData.append('qualification', qualificationRef.current.value);
    formData.append('idProof', idRef.current.files[0]);
    formData.append('certificate', certificateRef.current.files[0]);
    formData.append('employeeContact', contactRef.current.value);
    formData.append('reference', referenceRef.current.value);
    formData.append('employeeEmail', emailRef.current.value);
    formData.append('experience', expRef.current.value);
    let arr = skillsRef.current.value.split(',');
    formData.append('skills', arr);


    // console.log(formData)
    await setData(formData);
    setIsLoading(false);
  }

  async function setData(data) {
    console.log("loading...")
    try {
      let token = localStorage.getItem("accessToken");
      let url = 'https://sarkultechapi.onrender.com/api/v1/engineer'
      const config = {
        headers: {
          'Authorization': `Bearer ${token}`,
          // 'Content-Type': 'Application/json'
        },
      };

      let response = await axios.post(url, data, config);
      let eCode = response.data.data.employeeCode;
      alert("Employee added successfully with Employee Id: " + eCode);
    }
    catch (error) {
      alert(error.response.data.message);
    }
  }





  return (
    <div>
      <SideBarMain />
      <SideBarMp />
      <h2>Manpower Entry</h2>

      {isLoading ? (<Loader />) :
        (
          <div>
            <form className='form' onSubmit={handleSubmit}>
              <div className='form-left '>
                <div className='form-left-top'>
                  <label>Name:</label> <input type='text' className='form-input' required ref={nameRef} /><br />

                  <label>Address:</label> <input type='text' className='form-input' required ref={addressRef} /><br />

                </div>

                <div className='form-left-bottom'>
                  <label>Designation:</label> <input type='text' className='form-input' required ref={designationRef} /><br />
                  <label>Joining Date:</label> <input type='date' className='form-input' required ref={joiningRef} /><br />
                  <label>Date of Birth:</label> <input type='date' className='form-input' required ref={birthRef} /><br />
                  <label>Sallary:</label> <input type='text' className='form-input' required ref={sallaryRef} /><br />
                  <label>Experience:</label> <input type='number' className='form-input' style={{ width: '16%' }} required ref={expRef} />Yrs<br />
                </div>

              </div>
              <div className='form-right'>

                <label>Qualification:</label> <input type='text' className='form-input' required ref={qualificationRef} /><br />

                <label>Id :</label> <input type='file' className='form-input' ref={idRef} /><br />
                <label>Certificate:</label> <input type='file' className='form-input' ref={certificateRef} /><br />


                <label>Email:</label> <input type='email' className='form-input' required ref={emailRef} /><br />
                <label>Contact:</label> <input type='number' className='form-input' required ref={contactRef} /><br />
                <label>Skill Set:</label> <input type='text' placeholder='Skills separated by commas...' className='form-input' required ref={skillsRef} /><br />
                <label>Reference:</label> <input type='text' className='form-input' required ref={referenceRef} /><br />


              </div>

            </form>
            <button className='submit-btn emp-submit-btn' onClick={handleSubmit}>Submit</button>
          </div>
        )
      }




    </div>
  )
}

export default ManpowerEntry