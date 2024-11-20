import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";
import BottomNav from "../../components/BottomNav/BottomNav";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import { getMyInfo } from "../../redux/slices/appConfigSlice";

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
