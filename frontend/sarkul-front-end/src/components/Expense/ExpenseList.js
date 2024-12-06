import React, { useEffect, useState } from 'react'
import SideBarExpense from '../Sidebar/SideBarExpense'
import axios from 'axios';
import Loader from '../Loader';
import { Stack } from '@mui/material';
import ExpenseCard from './ExpenseCard';

function ExpenseList() {

  const [isLoading, setIsLoading] = useState(false);
  const [expense, setExpense] = useState([]);


  async function getExpenseList() {
    setIsLoading(true);
    try {
      let token = sessionStorage.getItem("accessToken");
      let url = 'https://sarkultechapi.onrender.com/api/v1/expense';
      const config = {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'Application/json'
        },
      };
      const response = await axios.get(url, config);
      setExpense(response?.data?.data[0]?.data)
      setIsLoading(false);

    }
    catch (error) {

      console.log(error?.response?.data?.message)
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getExpenseList();
  }, [])
  return (
    <div>
      <SideBarExpense />
      {isLoading ?
        <Loader />
        :
        <Stack alignItems={'center'} pt={4} >
          {expense?.map((item) => {
            return !item?.remarks.includes('test') && !item?.remarks.includes('check') && <ExpenseCard
              name={item?.engineerName}
              category={item?.category}
              month={item?.month}
              period={item?.period}
              amount={item?.amount}
              remarks={item?.remarks}
            />
          })}
        </Stack>
      }
    </div>
  )
}

export default ExpenseList