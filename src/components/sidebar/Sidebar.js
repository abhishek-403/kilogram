import React from "react";
import { AiFillHome } from "react-icons/ai";
import { FiSearch } from "react-icons/fi";
import { IoIosAddCircleOutline } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Avatar from "../avatar/Avatar";
function Sidebar() {
  const myProfile = useSelector((state) => state.appConfigReducer.myProfile);
  const allTab = [
    {
      icon: <AiFillHome />,
      title: "Home",
      route: "/",
    },
    {
      icon: <FiSearch />,
      title: "Search",
      route: "/search",
    },
    {
      icon: <IoIosAddCircleOutline />,
      title: "Create",
      route: "/createpost",
    },
    {
      icon: <Avatar src={myProfile?.avatar?.url} />,
      title: "Profile",
      route: `/profile/${myProfile?._id}`,
    },
  ];

  return (
    <div className="text-white h-[100vh] pt-10 bg-black border-r px-2 border-[#4d4b4b]">
      <div className="pt-10 gap-4 flex flex-col">
        {allTab.map((item, index) => {
          return (
            <Tabs
              icon={item.icon}
              key={index}
              route={item.route}
              title={item.title}
            />
          );
        })}
      </div>
    </div>
  );
}

function Tabs({ icon, title, route }) {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate(`${route}`)}
      className="cursor-pointer  flex-row pl-3 pr-20 py-2 flex gap-5 hover:bg-[#1A1A1A]  rounded-md item-center "
    >
      <div className="text-2xl center">{icon}</div>
      <p className="text-xl flex  center font-allh font-bold ">{title}</p>
    </div>
  );
}

export default Sidebar;
