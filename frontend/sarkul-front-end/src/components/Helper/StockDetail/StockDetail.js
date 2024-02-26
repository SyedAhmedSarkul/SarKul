import React, { useEffect,useState } from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import SideBarStock from '../../Sidebar/SideBarStock';
import { Stack } from '@mui/material';

function StockDetail() {
    let { stockId } = useParams();
    const [obj, setObj] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    useEffect(() => {
        getData();
    }, [])

    async function getData() {
        setIsLoading(true);
        try {
            let token = localStorage.getItem("accessToken");
            let config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            };

            let url = `https://sarkul-v5cz.onrender.com/api/v1/stock/${stockId}`;

            let response = await axios.get(url, config);
            console.log("response in stock detail");
            console.log(response.data.data);
            setObj(response.data.data);


            setIsLoading(false);
        } catch (error) {
            console.log("error found is: " + error);
            setIsLoading(false);
            
            alert(error.response.data.message);
        }
    }




    return (
        <div>
            <SideBarStock/>
            <Stack>
                <Stack>
                        working on it.....
                </Stack>
            </Stack>
        </div>
    )
}

export default StockDetail