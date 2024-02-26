import React from 'react'

function StockCard({stockId,partName,condition,serialNumber}) {
    return (
        <div className='call-card'>
            <h3 className='call-card-h3'>Stock Id: {stockId}</h3>
            <h3 className='call-card-h3'>Part Name: {partName}</h3>
            <h3 className='call-card-h3'>Condition: {condition}</h3>
            <h3 className='call-card-h3'>Serial No.: {serialNumber}</h3>

        </div>
    )
}

export default StockCard