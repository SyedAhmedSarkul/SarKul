import React from 'react'
import './styles.css';

function CallCard({callNumber,customerName,date}) {
  return (
    <div className='call-card'>
        <h3 className='call-card-h3'>Call number: {callNumber}</h3>
        <h3 className='call-card-h3'>Customer Name: {customerName}</h3>
        <h3 className='call-card-h3'>Date: {date.slice(0,10)}</h3>
    </div>
  )
}

export default CallCard