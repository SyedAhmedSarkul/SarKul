import React, { useEffect, useState } from 'react'
import SideBarStock from '../Sidebar/SideBarStock'
import { Stack, Typography } from '@mui/material'
import axios from 'axios'
import Loader from '../Loader';
import StockCard from '../Helper/StockCard';
import { Link } from 'react-router-dom';
function CurrentStock() {


  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([])
  useEffect(() => {
    getData();
  }, [])

  async function getData() {
    setIsLoading(true);
    try {
      let token = localStorage.getItem("accessToken");
      let url = 'https://sarkul-v5cz.onrender.com/api/v1/stock';
      const config = {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'Application/json'
        },
      };
      const response = await axios.get(url, config);
      console.log('inside current ')
      console.log(response.data.data[0].data)
      setData(response.data.data[0].data)
    }
    catch (error) {

      alert(error.response.data.message)
    }
    setIsLoading(false);
  }


  return (
    <div>
      <SideBarStock />
      {isLoading ? (<Loader />) : (
        <Stack>
          <Stack>
            {/* <Typography>Item Name: {data.itemName}</Typography> */}
            {data.map((item)=>{
               return   <Stack mt={2}><Link to={`/stockmanagement/current-stock-specific/${item.stockId}`} > <StockCard stockId={item.stockId} partName={item.itemPart} condition={item.condition} serialNumber={item.serialNumber}/> </Link></Stack>  
            })}

          </Stack>
        </Stack>
      )}

    </div>
  )
}

export default CurrentStock