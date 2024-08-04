import { useEffect, useState } from "react";
import { useRef } from "react";
import SubMenu from "./SubMenu";
import { motion } from "framer-motion";

// * React icons
import { IoIosArrowBack } from "react-icons/io";
import { SlSettings } from "react-icons/sl";
import { AiOutlineAppstore } from "react-icons/ai";
import { BsPerson } from "react-icons/bs";
import { HiOutlineDatabase } from "react-icons/hi";
import { TbReportAnalytics } from "react-icons/tb";
import { RiBuilding3Line } from "react-icons/ri";
import { useMediaQuery } from "react-responsive";
import { MdMenu } from "react-icons/md";
import { NavLink, useLocation, useRoutes } from "react-router-dom";
import { MdDataUsage } from "react-icons/md";
import { FaBookReader } from "react-icons/fa"
import { MdCreditScore } from "react-icons/md";
const Sidebar = () => {
  let isTabletMid = useMediaQuery({ query: "(max-width: 768px)" });
  const [open, setOpen] = useState(isTabletMid ? false : true);
  const sidebarRef = useRef();
  const { pathname } = useLocation();

  useEffect(() => {
    if (isTabletMid) {
      setOpen(false);
    } else {
      setOpen(true);
    }
  }, [isTabletMid]);

  useEffect(() => {
    isTabletMid && setOpen(false);
  }, [pathname]);

  const Nav_animation = isTabletMid
    ? {
        open: {
          x: 0,
          width: "16rem",
          transition: {
            damping: 40,
          },
        },
        closed: {
          x: -250,
          width: 0,
          transition: {
            damping: 40,
            delay: 0.15,
          },
        },
      }
    : {
        open: {
          width: "16rem",
          transition: {
            damping: 40,
          },
        },
        closed: {
          width: "4rem",
          transition: {
            damping: 40,
          },
        },
      };

  const subMenusList = [
    {
      name: "Course",
      icon: RiBuilding3Line,
      menus: ["course"],
    },
    {
      name: "analytics",
      icon: TbReportAnalytics,
      menus: ["dashboard", "realtime", "events"],
    },
  ];

  return (
    <div>
      <div
        onClick={() => setOpen(false)}
        className={`md:hidden fixed inset-0 max-h-screen z-[998] bg-black/50 ${
          open ? "block" : "hidden"
        } `}
      ></div>
      <motion.div
        ref={sidebarRef}
        variants={Nav_animation}
        initial={{ x: isTabletMid ? -250 : 0 }}
        animate={open ? "open" : "closed"}
        className=" bg-white text-gray shadow-xl z-[999] max-w-[16rem]  w-[16rem] 
            overflow-hidden md:relative fixed
         h-screen "
      >
        <div className="flex items-center gap-2.5 font-medium border-b py-3 border-slate-300  mx-3">
          <img
            src="https://png.pngtree.com/png-clipart/20211017/original/pngtree-school-logo-png-image_6851480.png"
            width={45}
            alt=""
          />
          <span className="text-xl whitespace-pre">ExamMaster</span>
        </div>

        <div className="flex flex-col  h-full">
          <ul className="whitespace-pre px-2.5 text-[0.9rem] py-5 flex flex-col gap-1  font-medium overflow-x-hidden scrollbar-thin scrollbar-track-white scrollbar-thumb-slate-100   md:h-[68%] h-[70%]">
          <li>
              <NavLink to={"/"} className="link">
                <BsPerson size={23} className="min-w-max" />
                Authentication
              </NavLink>
            </li>
            
            <li>
              <NavLink to={"/create_course"} className="link">
                <HiOutlineDatabase size={23} className="min-w-max" />
                Create Course
              </NavLink>
            </li>
            <li>
              <NavLink to={"/create_member"} className="link">
                <HiOutlineDatabase size={23} className="min-w-max" />
                Create Member 
              </NavLink>
            </li>

            <li>
              <NavLink to={"/courselisting"} className="link">
                <AiOutlineAppstore size={23} className="min-w-max" />
                Course Listing
              </NavLink>
            </li>
            <li>
              <NavLink to={"/data"} className="link">
                <MdDataUsage size={23} className="min-w-max" />
                Analytics Data
              </NavLink>
            </li>
            
            <hr className="border-y  border-gray-300 mt-5 "></hr>
            <li>
              <NavLink to={"/member/course"} className="link mt-10">
                <FaBookReader size={23} className="min-w-max " />
                Member Course
              </NavLink>
            </li>
            <li>
            
              <NavLink to={"/member/score"} className="link mt-3">
                <MdCreditScore size={23} className="min-w-max " />
                Your Score
              </NavLink>
            </li>
          </ul>
          
        </div>
        <motion.div
          onClick={() => {
            setOpen(!open);
          }}
          animate={
            open
              ? {
                  x: 0,
                  y: 0,
                  rotate: 0,
                }
              : {
                  x: -10,
                  y: -200,
                  rotate: 180,
                }
          }
          transition={{ duration: 0 }}
          className="absolute w-fit h-fit md:block z-50 hidden right-2 bottom-3 cursor-pointer"
        >
          <IoIosArrowBack size={25} />
        </motion.div>
      </motion.div>
      <div className="m-3 md:hidden  " onClick={() => setOpen(true)}>
        <MdMenu size={25} />
      </div>
    </div>
  );
};

export default Sidebar;
