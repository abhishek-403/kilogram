import React from 'react'
import { NavLink } from 'react-router-dom'
import './bottomnav.scss'
import { AiFillHome } from 'react-icons/ai'
import { FiSearch } from 'react-icons/fi'
import { IoIosAddCircleOutline } from 'react-icons/io'
import Avatar from '../avatar/Avatar'
import { useDispatch, useSelector } from 'react-redux'
import { setCreatingPost, setSearching } from '../../redux/slices/appConfigSlice'

function BottomNav() {
  const myProfile = useSelector(state => state.appConfigReducer.myProfile);
  const creatingPost = useSelector(state => state.appConfigReducer.creatingPost);
  // const isSearching = useSelector(state => state.appConfigReducer.isSearching);
  const dispatch = useDispatch()



  return (

    <div id='bottomNav' >
      <div className="content flex">
        <NavLink
       
          onClick={() => { dispatch(setSearching(false)) }} to={'/'}        
          
          >
          <AiFillHome />
        </NavLink>

        <NavLink onClick={() => { dispatch(setSearching(true)) }} to={'/'}>
          <FiSearch />
        </NavLink>

        <NavLink onClick={() => { dispatch(setCreatingPost(!creatingPost)) }} to={`/profile/${myProfile?._id}`}>
          <IoIosAddCircleOutline />
        </NavLink>

        <NavLink id='myProfile' onClick={() => { dispatch(setCreatingPost(false)) }} to={`/profile/${myProfile?._id}`}>
          <Avatar src={myProfile?.avatar?.url} />
        </NavLink>



      </div>

    </div>
  )
}

export default BottomNav
