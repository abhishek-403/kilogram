import React, { useEffect, useState } from "react";
import Avatar from "../avatar/Avatar";
import "./updateprofile.scss";
import { useDispatch, useSelector } from "react-redux";
import { updateProfile } from "../../redux/slices/appConfigSlice";

import { axiosClient } from "../../utils/axiosClient";
import { useNavigate } from "react-router-dom";
import { KEY_ACCESS_TOKEN, removeItem } from "../../localStorageManager";

function Updateprofile() {
  const myProfile = useSelector((state) => state.appConfigReducer.myProfile);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [userName, setUserName] = useState("");
  const [bio, setBio] = useState("");
  const [dp, setDp] = useState("");

  useEffect(() => {
    setName(myProfile?.name || "");
    setUserName(myProfile?.username || "");
    setBio(myProfile?.bio || "");
    setDp(myProfile?.avatar?.url);
  }, [myProfile]);

  function handleDpChange(e) {
    const file = e.target.files[0];
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      if (fileReader.readyState === fileReader.DONE) {
        setDp(fileReader.result);
      }
    };
  }

  function handleSubmit(e) {
    e.preventDefault();

    dispatch(
      updateProfile({
        name,
        bio,
        dp,
        userName,
      })
    );

    navigate("/");
  }

  async function handleDelete() {
    try {
      const confirm = prompt("Enter your name");
      if (confirm === myProfile?.name) {
        await axiosClient.delete("/user/deleteprofile");
        removeItem(KEY_ACCESS_TOKEN);

        // console.log(response);
        navigate("/login");
      }
    } catch (e) {
      return Promise.reject(e);
    }
  }
  async function handlelogout() {
    try {
      await axiosClient.post("/auth/logout");

      removeItem(KEY_ACCESS_TOKEN);
      navigate("/login");
    } catch (e) {
      return Promise.reject(e);
    }
  }

  return (
    <div className="update-profile">
      <div className="container">
        <div className="left-side">
          <Avatar src={dp} />

          <label htmlFor="user-img">
            <p className="btn update-dp">Update Profile picture</p>
          </label>
          <input
            type="file"
            onChange={handleDpChange}
            accept="image/*"
            id="user-img"
          />
        </div>
        <div className="right-side">
          <form className="flex flex-col gap-[15px]" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="name">Name :</label>

              <input
                autoComplete="off"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
                type="text"
                name=""
                id="name"
              />
            </div>
            <div>
              <label htmlFor="user-name">User name :</label>

              <input
                autoComplete="off"
                pattern="[a-z 0-9]"
                value={userName}
                onChange={(e) => {
                  setUserName(e.target.value);
                }}
                type="text"
                name=""
                id="user-name"
              />
            </div>
            <div>
              <label htmlFor="bio">Bio :</label>

              <input
                autoComplete="off"
                value={bio}
                onChange={(e) => {
                  setBio(e.target.value);
                }}
                type="text"
                name=""
                id="bio"
              />
            </div>
            <div className="buttons-grp flex w-100 justify-between">
              <input
                className="btn btn-submit"
                onClick={handleSubmit}
                type="button"
                value="Submit"
              />
              <input
                onClick={handlelogout}
                className="btn btn-logout"
                type="button"
                value="Logout"
              />
            </div>
          </form>

          <input
            type="button"
            className="btn btn-delete"
            value="Delete account"
            onClick={handleDelete}
          />
        </div>
      </div>
    </div>
  );
}

export default Updateprofile;
