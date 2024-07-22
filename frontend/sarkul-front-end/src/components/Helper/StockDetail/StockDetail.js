import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import SideBarStock from '../../Sidebar/SideBarStock';
import { Button, Stack, Tooltip, Typography } from '@mui/material';
import Loader from '../../Loader';
import DeleteIcon from '@mui/icons-material/Delete';


function StockDetail() {
    let { stockId } = useParams();
    const [obj, setObj] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [endDate, setEndDate] = useState('');
    const [startDate, setStartDate] = useState('');
    const nav = useNavigate();
    useEffect(() => {
        getData();
    }, [])

    async function getData() {
        setIsLoading(true);
        try {
            let token = sessionStorage.getItem("accessToken");
            let config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            };

            let url = `https://sarkultechapi.onrender.com/api/v1/stock/${stockId}`;

            let response = await axios.get(url, config);

            setObj(response?.data?.data);
            let edate = response?.data?.data?.amcEndDate?.slice(0, 10)
            let sdate = response?.data?.data?.amcStartDate?.slice(0, 10)
            setStartDate(sdate);
            setEndDate(edate)
            setIsLoading(false);
        } catch (error) {
            console.log(error);
            setIsLoading(false);

            alert(error?.response?.data?.message);
        }
    }


    async function handleDelete() {
        setIsLoading(true);
        try {
            let token = sessionStorage.getItem("accessToken");
            let config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            };

            let url = `https://sarkultechapi.onrender.com/api/v1/stock/${stockId}`;
            let response = await axios.delete(url, config);
            setIsLoading(false);
            nav(-1);

        }
        catch (error) {
            alert(error?.response?.data?.message);
            setIsLoading(false);
        }
    }

    function formatDate(inputDate) {
        const months = [
            "January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];

        const [year, month, day] = inputDate.split('-').map(Number);

        return `${day} ${months[month - 1]} ${year}`;
    }


    return (
        <div>
            <SideBarStock />
            {isLoading ? <Loader /> : (
                <Stack >
                    <Stack direction={'row'} justifyContent={'space-evenly'} pt={'7%'} >

                        <Stack direction={'column'} gap={3}>
                            {obj?.scrap == 'yes' && <Stack direction={'row'} gap={1}>
                                {/* <Typography variant='h5' >Stock Id: </Typography> */}
                                <Typography variant='h4' color={'red'}>{'SCRAP Item'}</Typography>

                            </Stack>
                            }
                            <Stack direction={'row'} gap={1}>
                                <Typography variant='h5' >Stock Id: </Typography>
                                <Typography variant='h5' color={'black'}>{obj?.stockId}</Typography>

                            </Stack>
                            <Stack direction={'row'} gap={1}>
                                <Typography variant='h5' >Group: </Typography>
                                <Typography variant='h5' color={'black'}>{obj?.itemPart}</Typography>

                            </Stack>
                            <Stack direction={'row'} gap={1}>
                                <Typography variant='h5' >Item Name: </Typography>
                                <Typography variant='h5' color={'black'}>{obj?.itemName}</Typography>

                            </Stack>
                            <Stack direction={'row'} gap={1}>
                                <Typography variant='h5' >Serial Number: </Typography>
                                <Typography variant='h5' color={'black'}>{obj?.serialNumber}</Typography>

                            </Stack>
                            <Stack direction={'row'} gap={1}>
                                <Typography variant='h5' >Model Number: </Typography>
                                <Typography variant='h5' color={'black'}>{obj?.modelNumber}</Typography>

                            </Stack>





                        </Stack>
                        <Stack direction={'column'} gap={3}>
                            <Stack direction={'row'} gap={1}>
                                <Typography variant='h5' >Warranty Start Date: </Typography>
                                <Typography variant='h5' color={'black'}>{startDate ? formatDate(startDate) : 'NA'}</Typography>

                            </Stack>
                            <Stack direction={'row'} gap={1}>
                                <Typography variant='h5' >Warranty End Date: </Typography>
                                <Typography variant='h5' color={'black'}>{endDate ? formatDate(endDate) : "NA"}</Typography>
                                {/* <Typography variant='h5' color={'black'}>{formatDate(obj.amcEndD.slice(0,10))}</Typography> */}

                            </Stack>
                            <Stack direction={'row'} gap={1}>
                                <Typography variant='h5' >Configuration: </Typography>
                                <Typography variant='h5' color={'black'}>{obj?.configuration}</Typography>

                            </Stack>
                            <Stack direction={'row'} gap={1}>
                                <Typography variant='h5' >Condition: </Typography>
                                <Typography variant='h5' color={'black'}>{obj?.condition}</Typography>

                            </Stack>
                            <Stack direction={'row'} gap={1}>
                                <Typography variant='h5' >Price: </Typography>
                                <Typography variant='h5' color={'black'}>₹{obj?.price}/-</Typography>

                            </Stack>


                        </Stack>

                    </Stack>
                    <Stack pt={10} pr={50} alignItems={'flex-end'}>
                        {isDeleting ? (<Stack
                            border={'1px solid var(--red)'}
                            borderRadius={'15px'}
                            minWidth={'40%'}
                            boxShadow={'0px 0px 10px 0px var(--red)'} // Specify red box shadow
                            p={3}
                        >
                            <h4>Are you sure you want to delete?</h4>
                            <Stack direction={'row'} justifyContent={'space-around'}>
                                <Button variant="contained" color="primary" onClick={() => { handleDelete() }}>
                                    Yes, Delete
                                </Button>
                                <Button variant="outlined" onClick={() => { setIsDeleting(false) }}>No</Button>
                            </Stack>
                        </Stack>) : (<Stack borderRadius={'50%'} sx={{ cursor: 'pointer' }} onClick={() => { setIsDeleting(true) }}>
                            <Tooltip title="Delete the Item from stock">
                                <DeleteIcon sx={{ color: 'var(--red)', cursor: 'pointer' }} />
                            </Tooltip>
                        </Stack>)}
                    </Stack>

                </Stack>)}
        </div>
    )
}

export default StockDetail