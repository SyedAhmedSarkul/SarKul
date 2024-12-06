import React from 'react';
import { Card, CardContent, Typography, Stack } from '@mui/material';

const ExpenseCard = ({ name, category, month, period, amount, remarks }) => {
    return (
        <Card
            sx={{
                width: '70%',
                borderRadius: 2,
                boxShadow: 3,
                padding: 2,
                marginBottom: 2,
            }}
        >
            <Stack direction={'row'} justifyContent={'space-evenly'}>
                <Stack spacing={1}>
                    <Typography variant="h6" gutterBottom>
                        {name}
                    </Typography>

                    <Typography variant="body1">
                        <strong>Category:</strong> {category}
                    </Typography>
                    <Typography variant="body1">
                        <strong>Month:</strong> {month}
                    </Typography>
                </Stack>
                <Stack spacing={1}>
                    <Typography variant="body1">
                        <strong>Period:</strong> {period}
                    </Typography>
                    <Typography variant="body1">
                        <strong>Amount:</strong> ₹{amount}
                    </Typography>
                    <Typography variant="body1">
                        <strong>Remarks:</strong> {remarks}
                    </Typography>
                </Stack>
            </Stack>
        </Card >
    );
};

export default ExpenseCard;
