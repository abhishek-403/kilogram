import React from 'react'
import { useNavigate } from 'react-router-dom'
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
  const isSearching = useSelector(state => state.appConfigReducer.isSearching);
  const dispatch = useDispatch()

  const navigate = useNavigate()


  return (
    <div id='bottomNav' >
      <div className="content flex">
        <div id="home" onClick={() => { dispatch(setSearching(false), navigate('/')) }}>
          <AiFillHome />
        </div>

        <div id="search" onClick={() => { dispatch(setSearching(!isSearching), navigate('/')) }}>
          <FiSearch />
        </div>
        <div id="add" onClick={() => { dispatch(setCreatingPost(!creatingPost), navigate(`/profile/${myProfile._id}`)) }}>
          <IoIosAddCircleOutline />
        </div>

        <div id="myProfile" onClick={() => { dispatch(setCreatingPost(false), navigate(`/profile/${myProfile._id}`)) }}>
          <Avatar src={myProfile?.avatar?.url} />
        </div>


      </div>

    </div>
  )
}

export default BottomNav
