import { useDisclosure } from "@chakra-ui/hooks";
import React, { useEffect, useRef, useState } from "react";
import { IoReorderThreeOutline } from "react-icons/io5";

import { useNavigate } from "react-router";
import { mainu } from "./SidebarConfig";
import "./Sidebar.css";
import SearchComponent from "../SearchComponent/SearchComponent";
import { useSelector } from "react-redux";
import CreatePostModal from "../Post/Create/CreatePostModal";
import CreateReelModal from "../Create/CreateReel";
import foodlogo2 from '../../images/foodlogo2.png'


const Sidebar = () => {
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("Home");
  const excludedBoxRef = useRef(null);
  const [isSearchBoxVisible, setIsSearchBoxVisible] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { user } = useSelector((store) => store);
  const [showDropdown, setShowDropdown] = useState(false);
  const [isCreateReelModalOpen, setIsCreateReelModalOpen] = useState(false)

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    if (tab === "Profile") {
      navigate(`/${user.reqUser?.username}`);
    } else if (tab === "Home") {
      navigate("/");
    } else if (tab === "Create") {
      onOpen();
    }  else if(tab==="Reels"){
      navigate("reels")
    }
    else if(tab==="Create Reels"){
      handleOpenCreateReelModal()
    }

    if (tab === "Search") {
      setIsSearchBoxVisible(true);
    } else setIsSearchBoxVisible(false);
  };

  function handleClick() {
    setShowDropdown(!showDropdown);
  }

  const handleLogout=()=>{
    localStorage.clear();
    navigate("/login")
  }

  // useEffect(() => {
  //   window.addEventListener("click", handleClick);
  //   return () => window.removeEventListener("click", handleClick);
  // }, []);

  const handleCloseCreateReelModal=()=>{
    setIsCreateReelModalOpen(false);
  }

  const handleOpenCreateReelModal=()=>{
    setIsCreateReelModalOpen(true);
  }

  return (
    <div className=" sticky top-0 h-[100vh] pb-10 flex">
      <div className={`${activeTab === "Search" ? "px-3" : "px-10"} flex flex-col justify-between h-full`}>
        <div className="pt-10">
          {!isSearchBoxVisible && (
            <img
            className="w-100"
            src={foodlogo2}
            alt=""
          />
          )}
          <div className="mt-10">
            {mainu.map((item) => (
              <div
                onClick={() => handleTabClick(item.title)}
                className="flex items-center mb-5 cursor-pointer text-lg"
              >
                {activeTab === item.title ? item.activeIcon : item.icon}
                <p
                  className={` ${
                    activeTab === item.title ? "font-bold" : "font-semibold"
                  } ${isSearchBoxVisible ? "hidden" : "block"}`}
                >
                  {item.title}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div clasName="relative">
          <div onClick={handleClick} className="flex items-center cursor-pointer ">
            <IoReorderThreeOutline className="text-2xl" />
            {!isSearchBoxVisible && <p className="ml-5">More</p>}
          </div>
          <div className="absolute bottom-20 left-14  w-[70%]">
            {showDropdown && (
              <div className="shadow-md">
                <p onClick={handleLogout} className=" w-full py-2 text-base px-4 border-t border-b cursor-pointer">
                  Log out
                </p>
              
              
              </div>
            )}
          </div>
        </div>
      </div>

      {isSearchBoxVisible && (
        <div >
          
          <SearchComponent setIsSearchVisible={setIsSearchBoxVisible} />
        </div>
      )}

      <CreatePostModal onClose={onClose} isOpen={isOpen} onOpen={onOpen} />

      <CreateReelModal onClose={handleCloseCreateReelModal} isOpen={isCreateReelModalOpen} onOpen={handleOpenCreateReelModal}></CreateReelModal>
    </div>
  );
};

export default Sidebar;
