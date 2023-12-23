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


  return (
    <div className="bg-black h-[100vh]">
      <Navbar />
      <div>
        <div className="hidden lg:block absolute">
          <Sidebar />
        </div>
        <Outlet />
      </div>
      <BottomNav />
    </div>
  );
}

export default Home;
