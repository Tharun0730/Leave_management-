import { Box } from '@mui/system'
import React, { useState } from 'react'
import SideBar from '../../components/commonComponents/sidebar'

export default function Employee() {
  const[isOpen,setIsopen]=useState(false)
  return (
    <SideBar 
    isOpen={isOpen}
  logoText="My Application"
  onLogout={() => console.log('Logging out...')}
>
<Box onClick={()=>setIsopen(!isOpen)} >
hii
</Box>

</SideBar>

  )
}
