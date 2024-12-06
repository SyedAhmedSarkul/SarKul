import React, { useEffect, useState } from 'react'
import './styles.css';
import { Autocomplete, Button, Stack, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Loader from '../../Loader';

function CallCard({ callNumber, customerName, date, link, isPending, engineers }) {
  const nav = useNavigate();
  const [isLoading, setIsLoading] = useState(false)
  const [state, setState] = useState({
    showEngineer: false,
    engineer: null
  });



  async function handleSubmit() {

    let data = {
      callId: callNumber,
      engineerName: state.engineer
    };
    await postData(data);
  }


  async function postData(data) {
    try {
      setIsLoading(true)
      let token = sessionStorage.getItem("accessToken");
      let url = 'https://sarkultechapi.onrender.com/api/v1/call/assign';
      const config = {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      };
      let response = await axios.post(url, data, config);
      setState((prev) => ({ ...prev, showEngineer: false, engineer: null }))
      alert(response?.data?.message)
      setIsLoading(false)
    }
    catch (error) {
      console.log("error while assigning: ");
      console.log(error);
      alert(error.response.data.message);
      setIsLoading(false)
    }

  }



  return (
    // <div className='call-card'>
    isLoading ?
      <Loader />
      :
      <Stack
        direction={'row'}
        border={'1px solid grey'}
        borderRadius={'10px'}
        m={1}
        width={'75%'}
        p={1}
        height={''}
        justifyContent={'space-between'}

      >
        <h3 >Call number: {callNumber}</h3>
        <h3 >Customer Name: {customerName}</h3>
        <h3 >Date: {date.slice(0, 10)}</h3>
        <Stack alignItems={'center'} direction={'row'} gap={2} >
          {isPending && !state.showEngineer && <Button
            variant='contained'
            sx={{
              height: '35px',
              width: '140px',
            }}
            onClick={() => { setState((prev) => ({ ...prev, showEngineer: true })) }}
          >
            Call Assign
          </Button>
          }
          {isPending && state.showEngineer && <Stack alignItems={'center'} direction={'row'}>
            <Autocomplete
              required
              sx={{
                width: '15rem',
                margin: '1rem'
              }}
              options={engineers || []}
              getOptionLabel={(option) => option?.employeeName}
              onChange={(event, value) => {
                setState((prev) => ({
                  ...prev,
                  engineer: value?.employeeName
                }))
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Engineers"
                  variant="outlined"
                  fullWidth
                  required

                />
              )}

            />
            <Button
              variant='contained'
              disabled={!state.engineer}
              sx={{
                // margin: '8px',
                height: '35px',
                width: '140px'
              }}
              onClick={() => {
                handleSubmit()
              }}
            >Assign </Button>
          </Stack>}
          <Button
            // variant='contained'
            onClick={() => { nav(link) }}
            sx={{
              height: '35px',
              width: '140px'
            }}
          >
            View Detail
          </Button>
        </Stack>

      </Stack>

    // </div>
  )
}

export default CallCard