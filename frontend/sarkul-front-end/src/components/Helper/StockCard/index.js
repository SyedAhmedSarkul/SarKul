import { Stack, Typography } from '@mui/material'
import React from 'react'

function StockCard({ stockId, partName, condition, serialNumber, scrap }) {
    return (
        <Stack border={'1px solid'} borderColor={scrap == 'yes' ? "red" : "var(--grey)"} direction={'row'} p={4} pl={6} pr={6} gap={4} 
        borderRadius={'12px'} justifyContent={'space-between'}
        width={'100%'}
        >
            <Typography>Stock Id: {stockId}</Typography>
            {/* {scrap == 'yes' && <Typography>Scrap Item</Typography>} */}
            <Typography>Part Name: {partName}</Typography>
            <Typography>Condition: {condition}</Typography>
            <Typography>Serial No: {serialNumber}</Typography>

        </Stack>
    )
}

export default StockCard