import React, { useEffect } from 'react'
import Navbar from '../../components/navbar/Navbar'
import { Outlet } from 'react-router-dom'
import { useDispatch} from 'react-redux'
import { getMyInfo } from '../../redux/slices/appConfigSlice'
import BottomNav from '../../components/BottomNav/BottomNav'

function Home() {
  const dispatch = useDispatch()

  useEffect(() => {
  
    dispatch(getMyInfo())

    


  }, [dispatch])

  
  

  return (
    <div>
      <Navbar />
      <Outlet />
      <BottomNav />

    </div>
  )
}

export default Home
