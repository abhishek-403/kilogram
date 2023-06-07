import React from 'react'
import userPic from '../../assets/profile.png'
import './avatar.scss'


function Avatar({src}) {
  return (
    <span className='Avatar'>
        <img src={src? src: userPic} alt="" />
      
    </span>
  )
}

export default Avatar
