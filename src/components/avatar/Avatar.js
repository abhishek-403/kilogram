import React from 'react'
import userPic from '../../assets/profile.png'
import './avatar.scss'


function Avatar({src}) {
  return (
    <div className='Avatar'>
        <img src={src? src: userPic} alt="" />
      
    </div>
  )
}

export default Avatar
