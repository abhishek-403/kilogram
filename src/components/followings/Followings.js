import React, { useEffect, useState } from "react";
import "./followings.scss";
import Avatar from "../avatar/Avatar";
import { useDispatch, useSelector } from "react-redux";
import { followController } from "../../redux/slices/feedSlice";
import { useNavigate } from "react-router-dom";

function Followings({ item }) {
  const feedData = useSelector((s) => s.feedReducer.feedData);
  const myProfile = useSelector((s) => s.appConfigReducer.myProfile);
  const [isFollowing, setIsFollowing] = useState(false);
  const [isMe, setIsMe] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    setIsFollowing(feedData?.followings?.find((user) => user._id === item._id));
    setIsMe(myProfile._id === item._id);
  }, [feedData, item._id, myProfile._id]);

  function handleFollow() {
    dispatch(
      followController({
        userIdToFollow: item._id,
      })
    );
  }

  return (
    <div className="profile-card flex gap-10">
      <div
        className="name-dp hover-link"
        onClick={() => navigate(`/profile/${item?._id}`)}
      >
        <Avatar src={item?.avatar?.url} />
        <div className="data-block flexcol">
          <span id="name">{item?.name}</span>
          <span id="username">{item?.username}</span>
        </div>
      </div>
      <div onClick={handleFollow} className="">
        {isMe === false ? (
          isFollowing ? (
            <p className="text-white px-3 py-1 bg-blue-500 text-xs rounded-full cursor-pointer">Unfollow</p>
          ) : (
            <p className="text-white px-3 py-1 bg-blue-500 text-sm rounded-full cursor-pointer">Follow</p>
          )
        ) : (
            <p className="text-white px-3 py-1 bg-blue-500 text-7 rounded-full cursor-pointer">Me</p>
        )}
      </div>
    </div>
  );
}

export default Followings;
