import React from 'react'
import './styles.css';

function EmployeeCard({id,name,contact}) {
  return (
    <div className='call-card'>
        <h3 className='call-card-h3'>Employee Id: {id}</h3>
        <h3 className='call-card-h3'>Name: {name}</h3>
        <h3 className='call-card-h3'>Status: {contact}</h3>
    </div>
  )
}

export default EmployeeCard;