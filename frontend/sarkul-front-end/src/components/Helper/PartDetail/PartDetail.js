import { Stack, Typography } from '@mui/material'
import React from 'react'

function PartDetail({ item }) {
    return (
        <div>
            {item.category == 'b2e' ? (<Stack border={'2px solid var(--red)'} mt={'15px'} textAlign={'start'} padding={'9px'} direction={'row'} gap={'90px'} borderRadius={'10px'}>
                
                    <Stack gap={'10px'}>
                        <Typography variant='h5' color={'var(--black)'}> {(item.category == 'b2e') ? "Branch To Engineer" : "Engineer To Branch"}</Typography>
                        <Typography variant='h5'>Call Number: {item.callId} </Typography>
                        <Typography variant='h5'>Date: {item.createdAt.slice(0, 10)} </Typography>
                        <Typography variant='h5'>Stock Id: {item.stockId} </Typography>
                        <Typography variant='h5'>Model Number: {item.modelNumber} </Typography>
                    </Stack>
                    <Stack gap={'10px'}>
                        <Typography variant='h5'>Serial Number: {item.serialNumber} </Typography>
                        <Typography variant='h5'>Item Name: {item.itemName} </Typography>
                        <Typography variant='h5'>Part Name: {item.partName} </Typography>
                        <Typography variant='h5'>Engineer Name: {item.engineerName} </Typography>
                    </Stack>
                
            </Stack>) : (<Stack border={'2px solid var(--green)'} mt={'15px'} textAlign={'start'} padding={'9px'} direction={'row'} gap={'90px'} borderRadius={'10px'}>Work in progress</Stack>)}

        </div>
    )
}

export default PartDetail