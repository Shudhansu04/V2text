import React from 'react'
import SideBar from '../components/SideBar.jsx'
import MessageArea from '../components/MessageArea.jsx'
import { useSelector } from 'react-redux'
import getMessage from '../customHooks/getMessages.jsx'


function Home() {
  let {selectedUser}=useSelector(state=>state.user)
 getMessage()
  return (
    <div className='w-full h-[100vh] flex  '>
     <SideBar/>
     <MessageArea/>
    </div>
  )
}

export default Home
