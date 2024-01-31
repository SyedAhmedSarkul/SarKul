import React from 'react'

function EmployeeDetail() {
  return (
    <div>
        <div>
          <h3 id='call-details-h3'>Call Details</h3>
         <div className='details call-details-card'>
         <div className='call-update-left2 call-update-left'>
         <label className='update-label call-detail-label'>Name: </label> {} <br/><br/>
         <label className='update-label call-detail-label'>Address: </label> {}<br/><br/>
         {/* <label className='update-label call-detail-label'>Id Proof: </label> {}<br/><br/> */}
         <label className='update-label call-detail-label'>Designation: </label> {}<br/><br/>
         <label className='update-label call-detail-label'>Joining Date: </label> {}<br/><br/>
         <label className='update-label call-detail-label'>DOB: </label> {}<br/><br/>
         
           
                <label className='update-label call-detail-label'>Sallary: </label> {}<br/><br/>
         </div>
         <div className='call-update-right2 call-update-right'>
                <label className='update-label call-detail-label'>Qualification: </label> {}<br/><br/>
                <label className='update-label call-detail-label'>Documents: </label> {}<br/><br/>
                <label className='update-label call-detail-label'>Email: </label> {}<br/><br/>
                <label className='update-label call-detail-label'>Contact: </label> {}<br/><br/>

                <label className='update-label call-detail-label'>Reference: </label> {}<br/>
         </div>
         </div>

 </div>
    </div>
  )
}

export default EmployeeDetail