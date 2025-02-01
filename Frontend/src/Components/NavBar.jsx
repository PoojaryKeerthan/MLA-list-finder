import { useEffect, useRef } from "react";
import Logo from "../assets/logo.png";

const Navbar = () => {
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        console.log("clicked outside");
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);
  return (
    <nav className="bg-gray-200 p-6 z-5 mx-auto max-h-[12vh] rounded-br-xl rounded-tl-xl" >
      <div className="flex justify-between items-center max-w-7xl mx-auto text-white">
        <a href="/" className="text-xl font-semibold text-gray-800 flex text-center gap-2 bold items-center">
          <div className="text-2xl font-semibold text-gray-800 flex text-center gap-2 bold items-center">
            <img src={Logo || "/placeholder.svg"} alt="image" className="max-h-[7vh]"></img>
            MLA Finder
          </div>
        </a>
        <div className="relative" ref={dropdownRef}>
          <a
            id="google_translate_element"
            href="https://github.com/PoojaryKeerthan/MLA-list-finder"
            target="_blank"
            className="bg-gray-500 px-4 py-2 rounded-md focus:outline-none hover:cursor-pointer"
          >
            Github
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;