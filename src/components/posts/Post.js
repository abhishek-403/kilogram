import React from 'react'
import Avatar from '../avatar/Avatar'
import './post.scss'
import { AiOutlineHeart,AiFillHeart, AiOutlineComment } from 'react-icons/ai'
import { BsFillBookmarkFill } from 'react-icons/bs'
import { useDispatch } from 'react-redux'
import { likePost } from '../../redux/slices/postSlice'
import { useNavigate } from 'react-router-dom'
import { showToast } from '../../redux/slices/appConfigSlice'
import { TOAST_SUCCESS } from '../../App'


function Post({ post }) {
  
  const dispatch = useDispatch();
  const navigate= useNavigate()


  function handleLike() {
    dispatch(showToast({
      type: TOAST_SUCCESS,
      message:"Liked or unliked"
    }))




    dispatch(likePost({
      postId:post._id
    }))
    


  }




  return (
    <div className='post'>
      <div className="heading hover-link" onClick={()=>navigate(`/profile/${post.owner._id}`)}>
        <Avatar src={post.owner?.avatar?.url} />
        <h2>{post?.owner?.username}</h2>



      </div>
      <div className="content">
        <img src={post?.image?.url} alt="" />


      </div>
      <div className="footer">
        <div className="likes">
          <div onClick={handleLike} className="like-btn">

            {!post.isLiked? <AiOutlineHeart  className='hover-link' />:<AiFillHeart className='hover-link' style={{color:"red"}}/>
            
            }
          </div>
          <AiOutlineComment className='hover-link' />
          <BsFillBookmarkFill className='hover-link' />

        </div>

        <div className="like-count">
          <p>{post?.likesCount} likes</p>
        </div>
        <div className="caption">
          <span>{post?.owner?.username}</span>

          
          <p>{post?.caption}</p>
        </div>
        <h4>{post?.timeAgo}</h4>


      </div>
      <div className="add-comment">
        <input placeholder='Add comment..' className='comment-input' type="text" />
        <input type="button" value="Post" className='btn btn-post' />

      </div>

    </div>
  )
}

export default Post
