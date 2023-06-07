import React, {  useState } from 'react'
import './createpost.scss'
import {  useSelector } from 'react-redux';
import { axiosClient } from '../../utils/axiosClient';
import { BsFillImageFill } from 'react-icons/bs'
import Avatar from '../avatar/Avatar';



function CreatePost() {

  const user = useSelector(state => state.postReducer.userProfile)

  const [img, setImg] = useState('');
  const [caption, setCaption] = useState('');






  async function handleSubmit() {

    try {
       await axiosClient.post('/post/create', {
        caption, img
      })



    } catch (e) {
   
      return Promise.reject(e);

    } finally {
      
      // dispatch(getUserProfile({
      //   userId: params.userId
      // }));
      setCaption('');
      setImg('')


    }
  }



  function handleImgChange(e) {
    const file = e.target.files[0];
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      if (fileReader.readyState === fileReader.DONE) {
        setImg(fileReader.result);
      }
    }

  }
  return (
    <div className="create-post">
      <div className="container">

        <div className='top-side hover-link'>
          <Avatar src={user?.avatar?.url} />


          <input autoComplete='off' placeholder='Caption' onChange={(e) => setCaption(e.target.value)} value={caption} type="text" id='caption-input' />




        </div>


        <div className="img-div">
          {img && <img src={img} alt="" />}
          <input style={{ display: "none" }} type="file" onChange={handleImgChange} accept='image/*' id="post-img" />

        </div>



        <div className="bottom-side">
          <label className='hover-link' htmlFor="post-img"><BsFillImageFill  /></label>


          <input className='btn btn-post' type="button" value="Create Post" onClick={handleSubmit} />
        </div>


      </div>

    </div>
  )
}

export default CreatePost;
