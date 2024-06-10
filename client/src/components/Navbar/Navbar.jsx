import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { SiWindows } from "react-icons/si";
import { RiFilmFill } from "react-icons/ri";
import { PiTelevisionFill } from "react-icons/pi";
import { RiBookmarkFill } from "react-icons/ri";
import { MdMovie } from "react-icons/md";
import { FaPowerOff } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { API_END_POINT } from "../../utils/constant.js";
import { setAuthStatus, setAuthUser } from "../../store/userSlice.js";
import toast from "react-hot-toast";

function Navbar() {
  /* take the auth user from redux store */
  const { authUser } = useSelector((store) => store.user);

  const [userMenu, setUserMenu] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  /* Defined the navigation items like name, slug,icon */
  const navItems = [
    {
      name: "Home",
      slug: "/",
      icon: <SiWindows className="" />,
    },
    {
      name: "Movies",
      slug: "/movies",
      icon: <RiFilmFill className="w-5 h-5" />,
    },
    {
      name: "TVSeries",
      slug: "/tvseries",
      icon: <PiTelevisionFill className="w-5 h-5" />,
    },
    {
      name: "Bookmarked",
      slug: "/bookmarked",
      icon: <RiBookmarkFill className="w-5 h-5" />,
    },
  ];

  /* when click on Profile Image it show logout menu option   */
  function userMenuHandler() {
    setUserMenu(!userMenu);
  }

  /* Logout User functionality */
  async function logoutUser() {
    try {
      const res = await axios.get(`${API_END_POINT}/user/logout`);
      if (res.data.success) {
        toast.success(res.data.message);
      }
      dispatch(setAuthUser(null));
      dispatch(setAuthStatus(false));
      navigate("/signup");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    authUser && (
      <div className="p-6 flex flex-col w-full  lg:w-[80px] justify-between h-auto lg:h-[640px] rounded-xl bg-[#161d2f]">
        <nav className="flex flex-row lg:flex-col justify-between items-center">
          <div className="text-[#fc4747] text-[32px]">
            <Link to="/">
              <MdMovie />
            </Link>
          </div>
          <ul className="flex flex-row lg:flex-col items-center my-0 lg:my-10">
            {navItems.map((menu) => (
              <li className={`mx-[10px] md:mx-[20px] lg:my-4`} key={menu.name}>
                <NavLink
                  to={menu.slug}
                  className={({ isActive }) =>
                    `${
                      isActive ? "text-white" : "text-[#5a698f]"
                    } hover:text-[#fc4747]`
                  }
                >
                  {menu.icon}
                </NavLink>
              </li>
            ))}
          </ul>
          <div
            onClick={userMenuHandler}
            className="w-8 h-8 border-[1px] border-white rounded-full relative"
          >
            <img
              className="p-1 w-full h-full rounded-full"
              src={authUser.profilePhoto}
              alt={authUser.email}
            />
            {userMenu && (
              <ul className="absolute top-6 right-2 md:top-0 md:left-10 px-2 min-w-40 bg-[#161d2f] rounded-md text-white  z-10">
                <li className="p-2 text-[#ddd]">{authUser.email}</li>
                <li
                  className="p-2 flex items-center gap-2 cursor-pointer"
                  onClick={logoutUser}
                >
                  <span className="text-[#fc4747]">
                    <FaPowerOff />
                  </span>
                  Logout User
                </li>
              </ul>
            )}
          </div>
        </nav>
      </div>
    )
  );
}

export default Navbar;
