import React, { useEffect, useState } from 'react'
import Avatar from '../avatar/Avatar'
import './updateprofile.scss'
import { useDispatch, useSelector } from 'react-redux';
import { updateProfile } from '../../redux/slices/appConfigSlice'

import { axiosClient } from '../../utils/axiosClient';
import { useNavigate } from 'react-router-dom';

function Updateprofile() {


  const myProfile = useSelector(state=>state.appConfigReducer.myProfile);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [name, setName] = useState('')
  const [userName, setUserName] = useState('')
  const [bio, setBio] = useState("")
  const [dp, setDp] = useState("")

  useEffect(() => {
    setName(myProfile?.name || '');
    setUserName(myProfile?.username || '');
    setBio(myProfile?.bio || '');
    setDp(myProfile?.avatar?.url)
  
    
  }, [myProfile])
  
  
  function handleDpChange(e){
    const file = e.target.files[0];
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload =()=>{
      if(fileReader.readyState === fileReader.DONE){
        setDp(fileReader.result);
      }
    }
    
  }
  
  function handleSubmit(e){
    e.preventDefault();

    dispatch(updateProfile({
      name,bio,dp,userName
    }))
    
    

  }

  async function handleDelete(){
    
    
    try {
      const confirm =(prompt("Enter your user id") === myProfile.username);
      if(confirm === myProfile?.username){
        
      await axiosClient.delete('/user/deleteprofile')
  
        // console.log(response);
        navigate('/login');

      }
      
      
      
    } catch (e) {
        return Promise.reject(e);
        
    }
    
  }

  
  


  return (
    <div className='update-profile'>
        <div className="container">
            <div className="left-side">
              <Avatar src={dp}/>

              <label htmlFor="user-img"><p className="btn update-dp">Update Profile picture</p></label>
              <input type="file" onChange={handleDpChange} accept='image/*' id="user-img" />
                
                 


            </div>
            <div className="right-side">

              <form onSubmit={handleSubmit}>

                <label htmlFor="user-name">User name :</label>

                <input pattern="[a-z0-9]" value={userName} onChange={(e)=>{setUserName(e.target.value)}} type="text" name="" id="user-name" />


                <label htmlFor="name">Name :</label>

                <input value={name} onChange={(e)=>{setName(e.target.value)}} type="text" name="" id="name" />

                <label htmlFor="bio">Bio :</label>

                <input value={bio} onChange={(e)=> {setBio(e.target.value)}} type="text" name="" id="bio" />


                <input className="btn btn-submit" onClick={handleSubmit} type='button' value="Submit" />
               
              </form>
                
              <input type="button" className="btn btn-delete" value="Delete account" onClick={handleDelete} />

            </div>

        </div>
      
    </div>
  )
}

export default Updateprofile
