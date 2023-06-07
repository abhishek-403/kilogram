import React from 'react'
import { NavLink } from 'react-router-dom'
import './bottomnav.scss'
import { AiFillHome } from 'react-icons/ai'
import { FiSearch } from 'react-icons/fi'
import { IoIosAddCircleOutline } from 'react-icons/io'
import Avatar from '../avatar/Avatar'
import { useSelector } from 'react-redux'

function BottomNav() {
  const myProfile = useSelector(state => state.appConfigReducer.myProfile);


  return (

    <div id='bottomNav' >
      <div className="content flex">
        <NavLink

          to={'/'}

        >
          <AiFillHome />
        </NavLink>

        <NavLink to={'/search'}>
          <FiSearch />
        </NavLink>

        <NavLink to={`/createpost`}>
          <IoIosAddCircleOutline />
        </NavLink>

        <NavLink id='myProfile' to={`/profile/${myProfile?._id}`}>
          <Avatar src={myProfile?.avatar?.url} />
        </NavLink>



      </div>

    </div>
  )
}

export default BottomNav
