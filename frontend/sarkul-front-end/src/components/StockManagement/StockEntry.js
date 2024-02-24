import React from 'react'
import SideBarStock from '../Sidebar/SideBarStock'
import { Formik, useFormik } from 'formik';
import TextField from '@mui/material/TextField';
import { Button, FormControl, InputLabel, MenuItem, Select, Stack } from '@mui/material';


function StockEntry() {
    const formik = useFormik({
        initialValues:{
            item_name:'',
            item_part:'',
            serial_number:'',
            configuration:'',
            model:'',
            amc_start_date:''

        },
        onSubmit:(values)=>
        {
            console.log('submit')
            console.log(values);
        }
    })
  return (
    <div>
        <SideBarStock/>
        <h2>Stock Entry</h2>
        <Stack paddingLeft={'20%'}>
        <form onSubmit={formik.handleSubmit}>

        <Stack direction={'column'} maxWidth={'20%'}  gap={3} justifyContent={'space-around'}>
        <FormControl>

<InputLabel id="demo-simple-select-label">Item Name</InputLabel>
<Select
  sx={{ width: '130px' }}
  labelId="demo-simple-select-label"
  id="demo-simple-select"
  label="Item Name"
  name="item_name"
  value={formik.values.item_name}
  onChange={formik.handleChange}
 >
  
    <MenuItem value={"printer"}>Printer</MenuItem>
    <MenuItem value={"scanner"}>Scanner</MenuItem>
    <MenuItem value={"plotter"}>Plotter</MenuItem>
    <MenuItem value={"desktop"}>Desktop</MenuItem>
    <MenuItem value={"laptop"}>Laptop</MenuItem>
    <MenuItem value={"server"}>Server</MenuItem>

</Select>

</FormControl>

        <TextField id="outlined-basic" name="item_part" onChange={formik.handleChange} label="Item Part" variant="outlined" />
        <TextField id="outlined-basic" name="serial_number" onChange={formik.handleChange} label="Serial Number" variant="outlined" />
        <TextField id="outlined-basic" name="configuration" onChange={formik.handleChange} label="Configuration" variant="outlined" />
        <TextField id="outlined-basic"  name="model" onChange={formik.handleChange} label="Model" variant="outlined" />
        <input 
       type = 'date'
        name="amc_start_date"
        value={formik.values.amc_start_date}
        onChange={formik.handleChange}
      
      />
      
        <TextField type="submit" onSubmit={formik.handleSubmit}>Submit</TextField>
        </Stack>
            
        </form>
        </Stack>


    </div>
  )
}

export default StockEntry