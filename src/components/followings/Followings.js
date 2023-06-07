import React, { useEffect, useState } from 'react'
import './followings.scss'
import Avatar from '../avatar/Avatar'
import { useDispatch, useSelector } from 'react-redux'
import { followController } from '../../redux/slices/feedSlice';
import { useNavigate } from 'react-router-dom';

function Followings({ item }) {

    const feedData = useSelector(s => s.feedReducer.feedData);
    const myProfile = useSelector(s => s.appConfigReducer.myProfile);
    const [isFollowing, setIsFollowing] = useState(false);
    const [isMe, setIsMe] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate()
    

    useEffect(() => {
        setIsFollowing(feedData?.followings?.find(user => user._id === item._id))
        setIsMe(myProfile._id === item._id)


    }, [feedData,item._id,myProfile._id])


    function handleFollow() {
        dispatch(followController({
            userIdToFollow: item._id
        }))

    }



    return (
        <div className="profile-card ">
            <div className="name-dp hover-link" onClick={() => navigate(`/profile/${item?._id}`)}>
                <Avatar src={item?.avatar?.url} />
                <div className='data-block flexcol' >
                    <span id="name">

                    {item?.name}
                    </span>
                    <span id="username" >
                        {item?.username}
                    </span>
                </div>
            </div>
            <div onClick={handleFollow} className="btn btn-follow">
                {
                    isMe === false? (isFollowing ? 'Unfollow' : 'Follow'):'Me'
                    
                }
            </div>
        </div>
    )
}

export default Followings
