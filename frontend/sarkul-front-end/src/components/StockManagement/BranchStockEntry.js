import React, { useState } from 'react'
import SideBarStock from '../Sidebar/SideBarStock'
import { Stack, TextField } from '@mui/material'
import Loader from '../Loader'
import axios from 'axios'

function BranchStockEntry() {
    const [state, setState] = useState({
        itemName: '',
        serialNumber: '',
        brand: "",
        warrantyStart: '',
        warrantyEnd: "",
        price: '',

    })
    const [isLoading, setIsLoading] = useState(false)
    async function handleSubmit() {

        setIsLoading(true)
        try {
            let token = sessionStorage.getItem("accessToken");
            let url = 'https://sarkultechapi.onrender.com/api/v1/mystocks';
            const config = {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'Application/json'
                },
            };
            const response = await axios.post(url, state, config);
            alert(response.data.message)
            setState({
                itemName: '',
                serialNumber: '',
                brand: "",
                warrantyStart: '',
                warrantyEnd: "",
                price: '',

            })
            setIsLoading(false)

        } catch (error) {
            alert(error.response.data.message)
            setIsLoading(false)
        }

    }

    return (
        <div>
            <SideBarStock />
            <h2>Branch Stock Entry</h2>
            {isLoading ? (<Loader />) :
                <Stack direction={'row'} justifyContent={'space-evenly'} >
                    <Stack gap={5}>

                        <TextField id="outlined-basic"
                            label="Item Name"
                            variant="outlined"
                            value={state.itemName}
                            onChange={(e) => {
                                setState((prev) => ({
                                    ...prev,
                                    itemName: e.target.value
                                }))
                            }}
                        />
                        <TextField id="outlined-basic"
                            label="Serial Number"
                            variant="outlined"
                            value={state.serialNumber}
                            onChange={(e) => {
                                setState((prev) => ({
                                    ...prev,
                                    serialNumber: e.target.value
                                }))
                            }}
                        />
                        <TextField id="outlined-basic"
                            label="Brand"
                            variant="outlined"
                            value={state.brand}
                            onChange={(e) => {
                                setState((prev) => ({
                                    ...prev,
                                    brand: e.target.value
                                }))
                            }}
                        />

                    </Stack>

                    <Stack gap={5}>

                        <Stack gap={1}>
                            <label>Warranty Start Date:</label>

                            <input
                                style={{ height: '2.5rem' }}
                                type='date'
                                value={state.warrantyStart}
                                onChange={(e) => {
                                    setState((prev) => ({
                                        ...prev,
                                        warrantyStart: e.target.value
                                    }))
                                }}

                            />
                        </Stack>
                        <Stack gap={1}>

                            <label>Warranty End Date:</label>
                            <input
                                style={{ height: '2.5rem' }}
                                type='date'
                                value={state.warrantyEnd}
                                onChange={(e) => {
                                    setState((prev) => ({
                                        ...prev,
                                        warrantyEnd: e.target.value
                                    }))
                                }}

                            />
                        </Stack>

                        <TextField
                            id="outlined-basic"
                            label="Price (₹)"
                            variant="outlined"
                            value={state.price}
                            onChange={(e) => {
                                setState((prev) => ({
                                    ...prev,
                                    price: e.target.value
                                }))
                            }}
                        />

                        <TextField sx={{
                            '&:hover': {

                                cursor: 'pointer',
                                boxShadow: '5px 5px 10px var(--blue);'
                            },
                            cursor: 'pointer'
                        }}
                            type="submit"
                            onClick={handleSubmit}

                        >Submit
                        </TextField>
                    </Stack>
                </Stack>
            }

        </div>
    )
}

export default BranchStockEntry