import React from 'react'
import './navbar.scss'
import Avatar from '../avatar/Avatar'
import {  useNavigate } from 'react-router-dom'
import {useSelector } from 'react-redux';
import { axiosClient } from '../../utils/axiosClient';
import { KEY_ACCESS_TOKEN, removeItem } from '../../localStorageManager';


function Navbar() {
    const myProfile = useSelector(state=>state.appConfigReducer.myProfile);
    


    const navigate = useNavigate()
    



    async function handlelogout(){
        try {
            await axiosClient.post('/auth/logout');

            removeItem(KEY_ACCESS_TOKEN);
            navigate('/login');
            // window.location.reload(false);
        } catch (e) {
            return Promise.reject(e);
            
        }
    }



  return (
   <>
    <div className="navbar">
        <div className="container">
            <h2 className="banner hover-link" onClick={()=>navigate('/')} >Kilogram</h2>
                <div className="right-side">
                    <div className="profile hover-link" onClick={()=>navigate(`/profile/${myProfile._id}`)}>
                        <Avatar src={myProfile?.avatar?.url} />
                        <input onClick={handlelogout} className='btn btn-logout' type="button" value="Logout" />
                    </div>
                </div>
        </div>
    </div>

   </>
  )
}

export default Navbar
