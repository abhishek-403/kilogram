import React, { useEffect, useState } from "react";
import Post from "../posts/Post";
import Avatar from "../avatar/Avatar";
import "./profile.scss";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUserProfile } from "../../redux/slices/postSlice";
import { followController } from "../../redux/slices/feedSlice";

function Profile() {
  const userProfile = useSelector((state) => state.postReducer.userProfile);
  const myProfile = useSelector((state) => state.appConfigReducer.myProfile);
  const feedData = useSelector((s) => s.feedReducer.feedData);

  const dispatch = useDispatch();

  const params = useParams();
  const navigate = useNavigate();

  const [isMe, setIsMe] = useState(false);
  const [isFollowing, setIsFollowing] = useState(true);

  useEffect(() => {
    dispatch(
      getUserProfile({
        userId: params.userId,
      })
    );
    setIsFollowing(
      feedData?.followings?.findIndex((user) => user._id === params.userId) ===
        -1
        ? false
        : true
    );

    setIsMe(myProfile?._id === params.userId);
  }, [dispatch, params.userId]);

  function handleFollow() {
    dispatch(
      followController({
        userIdToFollow: params.userId,
      })
    );
    setIsFollowing(!isFollowing);
  }

  return (
    <div className="profile">
      <div className="container justify-center">
        <div className="top-area">
          <div className="dp">
            <Avatar src={userProfile?.avatar?.url} />
          </div>
          <div className="personal-info">
            <div className="top">
              <div className="flex flex-col gap-1">
                <div id="name" className="textsm sm:text-2xl font-bold font-name">{userProfile?.name}</div>
                <div id="user-name">{userProfile?.username}</div>
              </div>
              <div className="buttons">
                {!isMe && (
                  <div className="btn btn-follow " onClick={handleFollow}>
                    {isFollowing ? "Unfollow" : "Follow"}
                  </div>
                )}

                {isMe && (
                  <div
                    onClick={() => navigate("/profile/update")}
                    className="btn btn-edit"
                  >
                    Edit
                  </div>
                )}
              </div>
            </div>
            <div className="center">
              <div className="count posts">
                {`${userProfile?.posts?.length} posts`}
              </div>
              <div className="count followings">
                {`${userProfile?.followings?.length} followings`}
              </div>
              <div className="count followers">
                {`${userProfile?.followers?.length} followers`}
              </div>
            </div>
            <div className="bottom">
              <div id="bio">{userProfile?.bio}</div>
            </div>
          </div>
        </div>

        <div className="bottom-area">
          <div className="post-div">
            {userProfile?.posts?.map((item, i) => {
              // console.log(item);
              return (
                <div key={i} className="each-post">
                  <Post key={i} post={item} />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
