import React from 'react'
import './navbar.scss'
import Avatar from '../avatar/Avatar'
import {  useNavigate } from 'react-router-dom'
import {useSelector } from 'react-redux';


function Navbar() {
    const myProfile = useSelector(state=>state.appConfigReducer.myProfile);
    


    const navigate = useNavigate()
    



    



  return (
   <>
    <div id="navbar">
        <div className="container">
            <h2 className="banner hover-link" onClick={()=>navigate('/')} >Kilogram</h2>
                <div className="right-side">
                    <div className="profile-small hover-link" onClick={()=>navigate(`/profile/${myProfile._id}`)}>
                        <Avatar src={myProfile?.avatar?.url} />
                        
                    </div>
                </div>
        </div>
    </div>

   </>
  )
}

export default Navbar
