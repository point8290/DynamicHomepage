import React from "react";
import { Link } from "react-router-dom";
const Header: React.FC = () => {
  return (
    <header className="h-[70px] md:h-[50px] bg-[#ffffff1a] z-50 fixed top-0 w-[100%] m-0">
      <div className="navbar flex-col py-2 md:py-0 md:flex-row transform-none items-center bg-[#ffffff1a] flex flex-shrink-0 h-[70px] md:h-[50px] justify-between p-0 w-[100%]">
        <div className="text-white md:ml-[15px] md:pr-[40px]">
          <div className="text-white md:ml-[15px] md:pr-[40px] ">
            <Link to="/" className="italic text-2xl font-bold">
              WoodLand
            </Link>
          </div>
        </div>
        <div className="Navbar-r w-[70%]  flex items-center text-white h-[100%]">
          <div className="text-nowrap flex-grow h-[100%] flex text-[15px]">
            <Link
              className="h-[100%] w-full flex items-center justify-center text-white no-underline opacity-[40%] hover:opacity-[100%] "
              to="/about"
            >
              About
            </Link>
          </div>
          <div className="text-nowrap flex-grow h-[100%] flex text-[15px]">
            <Link
              className="h-[100%] w-full flex items-center justify-center text-white no-underline opacity-[40%] hover:opacity-[100%] "
              to="/products"
            >
              Products
            </Link>
          </div>
          <div className="text-nowrap flex-grow h-[100%] flex text-[15px]">
            <Link
              className="h-[100%] w-full   flex items-center justify-center text-white no-underline opacity-[40%] hover:opacity-[100%] "
              to="/blog"
            >
              Blogs
            </Link>
          </div>
          <div className="text-nowrap flex-grow h-[100%] flex text-[15px]">
            <Link
              to={"/admin"}
              className="h-[100%] w-full flex items-center justify-center text-white no-underline opacity-[40%] hover:opacity-[100%] "
            >
              Admin
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
