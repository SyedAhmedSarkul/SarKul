import React, { useState } from 'react'
import SideBarStock from '../Sidebar/SideBarStock'
import { Formik, useFormik } from 'formik';
import TextField from '@mui/material/TextField';
import { Button, FormControl, InputLabel, MenuItem, Select, Stack } from '@mui/material';
import axios from 'axios'
import Loader from '../Loader';


function StockEntry() {
  const [isLoading, setIsLoading] = useState(false)

  async function handleSubmit(data) {


    setIsLoading(true)
    try {
      let token = sessionStorage.getItem("accessToken");
      let url = 'https://sarkultechapi.onrender.com/api/v1/stock';
      const config = {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'Application/json'
        },
      };
      const response = await axios.post(url, data, config);
      console.log(response.data.data)
      alert("Stock created with stock id" + response.data.data.stockId)

      formik.resetForm();
      setIsLoading(false)

    } catch (error) {
      console.log(error.response.data.message)
      alert(error.response.data.message)
      setIsLoading(false)
    }


  }


  const formik = useFormik({
    initialValues: {
      itemName: '',
      itemPart: '',
      serialNumber: '',
      configuration: '',
      modelNumber: '',
      amcStartDate: '',
      amcEndDate: '',
      price: '',
      condition: '',

    },

    onSubmit: (values) => {
      console.log('submit func')
      console.log(values);
      handleSubmit(values);
    }
  })
  return (
    <div>
      <SideBarStock />
      <h2>Stock Entry</h2>
      {isLoading ? (<Loader />) :

        (<Stack >
          <form onSubmit={formik.handleSubmit}>

            <Stack direction={'row'} justifyContent={'space-evenly'} >
              <Stack gap={5}>
                <FormControl required >
                  <InputLabel id="demo-simple-select-label">Item Name</InputLabel>
                  <Select
                    sx={{ width: '130px' }}
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Item Name"
                    name="itemName"
                    value={formik.values.itemName}
                    onChange={formik.handleChange}
                  >

                    <MenuItem value={"printer"}>Printer</MenuItem>
                    <MenuItem value={"scanner"}>Scanner</MenuItem>
                    <MenuItem value={"plotter"}>Plotter</MenuItem>
                    <MenuItem value={"desktop"}>Desktop</MenuItem>
                    <MenuItem value={"laptop"}>Laptop</MenuItem>
                    <MenuItem value={"server"}>Server</MenuItem>
                    <MenuItem value={"UPS"}>UPS</MenuItem>
                    <MenuItem value={"Keyboard"}>Keyboard</MenuItem>
                    <MenuItem value={"Mouse"}>Mouse</MenuItem>
                    <MenuItem value={"PowerSupply"}>Power Supply</MenuItem>
                    <MenuItem value={"Motherboard"}>Motherboard</MenuItem>
                    <MenuItem value={"HardDisk"}>Hard Disk</MenuItem>
                    <MenuItem value={"Display"}>Display</MenuItem>
                    <MenuItem value={"RAM"}>RAM</MenuItem>
                    <MenuItem value={"CPUFan"}>CPU Fan</MenuItem>
                    <MenuItem value={"Processor"}>Processor</MenuItem>

                  </Select>

                </FormControl>

                <TextField id="outlined-basic" name="itemPart" onChange={formik.handleChange} label="Group" variant="outlined" />
                <TextField id="outlined-basic" name="serialNumber" onChange={formik.handleChange} label="Serial Number" variant="outlined" />
                <TextField id="outlined-basic" name="configuration" onChange={formik.handleChange} label="Configuration" variant="outlined" />

                <TextField id="outlined-basic" name="modelNumber" onChange={formik.handleChange} label="Model" variant="outlined" />
              </Stack>

              <Stack gap={5}>

                <Stack gap={1}>
                  <label>Warranty Start Date:</label>

                  <input
                    style={{ height: '2.5rem' }}
                    type='date'
                    name="amcStartDate"
                    value={formik.values.amcStartDate}
                    onChange={formik.handleChange}

                  />
                </Stack>
                <Stack gap={1}>

                  <label>Warranty End Date:</label>
                  <input
                    style={{ height: '2.5rem' }}
                    type='date'
                    name="amcEndDate"
                    value={formik.values.amcEndDate}
                    onChange={formik.handleChange}

                  />
                </Stack>

                <TextField id="outlined-basic" required name="price" onChange={formik.handleChange} label="Price (₹)" variant="outlined" />
                <FormControl required>
                  <InputLabel id="demo-simple-select-label">Condition</InputLabel>
                  <Select
                    sx={{ width: '230px' }}

                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Condition"
                    name="condition"
                    value={formik.values.condition}
                    onChange={formik.handleChange}
                  >

                    <MenuItem value={"working"}>Working</MenuItem>
                    <MenuItem value={"faulty"}>Faulty</MenuItem>
                    <MenuItem value={"new"}>New</MenuItem>


                  </Select>

                </FormControl>
                <TextField sx={{
                  '&:hover': {


                    boxShadow: '5px 5px 10px var(--blue);'
                  },
                }} type="submit" onSubmit={formik.handleSubmit}>Submit</TextField>
              </Stack>
            </Stack>

          </form>
        </Stack >)}



    </div >
  )
}

export default StockEntry
