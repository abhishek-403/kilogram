import React, { useEffect } from "react";
import Navbar from "../../components/navbar/Navbar";
import { Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getMyInfo } from "../../redux/slices/appConfigSlice";
import BottomNav from "../../components/BottomNav/BottomNav";
import Sidebar from "../../components/sidebar/Sidebar";

function Home() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMyInfo());
  }, [dispatch]);

  const screenWidth = window.innerWidth;
  console.log(screenWidth);

  return (
    <div className="bg-black h-[100vh]">
      <Navbar />
      <div>
        {screenWidth>768&&<div className=" absolute">
          <Sidebar />
        </div>}
        <Outlet />
      </div>
      <BottomNav />
    </div>
  );
}

export default Home;
