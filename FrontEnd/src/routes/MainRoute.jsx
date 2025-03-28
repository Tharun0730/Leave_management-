import { Box } from '@mui/system'
import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import LoginPage from '../pages/LoginPage/LoginPage'
import Employee from '../pages/EmployeePage/Employee'

export default function MainRoute() {
  return (


    <BrowserRouter> 

    <Routes>
        <Route path='/' element={<LoginPage/>}/>
        <Route path='/Employee' element={<Employee/>}/>
    </Routes>
    </BrowserRouter>




  )
}
