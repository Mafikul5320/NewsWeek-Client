import { useEffect, useState } from "react";
import { FaUser, FaBars, FaSearch } from "react-icons/fa";
import { Link, NavLink } from "react-router";
import useAuth from "../Hooks/useAuth";
import useAdminFind from "../Hooks/useAdminFind";
import usePremiumFind from "../Hooks/usePremiumFind";

const Navber = () => {
  const { User, setUser, SignOut } = useAuth();
  const { user } = useAdminFind();
  const { PremiumUser } = usePremiumFind();
  const [menuOpen, setMenuOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);

  const handelLogout = () => {
    SignOut()
      .then(() => setUser(null))
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 250);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="w-full sticky top-0 left-0 z-50 pb-[160px]  transition-all duration-500">
      
      {/* ===== Big Navbar ===== */}
      <div
        className={`absolute left-0 w-full transition-all  bg-white backdrop-blur-sm shadow duration-500 ${
          isSticky
            ? "opacity-0 -translate-y-5 pointer-events-none"
            : "opacity-100 translate-y-0"
        }`}
      >
        <div className="py-6">
          <div className="flex justify-between items-center w-11/12 mx-auto pb-2 ">
            {/* Left Section */}
            <div className="flex items-center gap-4">
              <button
                className="text-red-600 font-bold flex items-center gap-1 md:hidden"
                onClick={() => setMenuOpen(!menuOpen)}
              >
                MENU <FaBars />
              </button>
              <button className="hidden md:flex items-center gap-1">
                <span className="font-medium">Search</span>
                <FaSearch />
              </button>
            </div>

            {/* Center Logo */}
            <div className="font-serif italic text-amber-500 text-center text-5xl sm:text-6xl md:text-7xl">
              NewsWeek<span className="text-xs align-top ml-1">PRO</span>
            </div>

            {/* Right Section */}
            <div className="flex items-center gap-3 md:gap-6">
              {User ? (
                <>
                  <button
                    onClick={handelLogout}
                    className="btn btn-sm btn-active"
                  >
                    Logout
                  </button>
                  <img
                    className="h-10 w-10 md:h-14 md:w-14 object-cover border-amber-300 border-2 rounded-full"
                    src={User?.photoURL}
                    alt="Profile"
                  />
                </>
              ) : (
                <Link to="/login">
                  <button className="flex items-center gap-1">
                    <FaUser />
                    <span className="text-sm">My account</span>
                  </button>
                </Link>
              )}
              <button className="bg-red-600 text-white px-3 py-1 md:px-4 rounded text-sm font-semibold">
                SUBSCRIBE
              </button>
            </div>
          </div>

          {/* Navigation */}
          <nav
            className={`flex flex-col md:flex-row justify-center gap-4 md:gap-6 pt-3 text-sm font-semibold transition-all duration-300 ${
              menuOpen ? "block" : "hidden"
            } md:flex border-t border-gray-200`}
          >
            <NavLink to="/">Home</NavLink>
            <NavLink to="/add-articles">Add Articles</NavLink>
            <NavLink to="/all-articles">All Articles</NavLink>
            <NavLink to="/subscription">Subscription</NavLink>
            <NavLink to="/user-articles">My Articles</NavLink>
            {PremiumUser?.user_status === "premium" && (
              <NavLink to="/premium-articles">Premium Articles</NavLink>
            )}
            <NavLink to="/about">About</NavLink>
            {user?.role === "admin" && (
              <NavLink to="/dashboard">Dashboard</NavLink>
            )}
            <NavLink to="/my-profile">My Profile</NavLink>
          </nav>
        </div>
      </div>

      {/* ===== Small Navbar ===== */}
      <div
        className={`absolute left-0 w-full bg-white shadow-lg transition-all duration-500 ${
          isSticky
            ? "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-5 pointer-events-none"
        }`}
      >
        <div className="py-5">
          <div className="flex justify-between items-center w-11/12 mx-auto">
            {/* Logo Small */}
            <div className="font-serif italic text-amber-500 text-3xl font-bold">
              NewsWeek<span className="text-xs align-top ml-1">PRO</span>
            </div>
          <nav
            className={`flex flex-col md:flex-row justify-center gap-4 md:gap-6 pt-3 text-sm font-semibold transition-all duration-300 ${
              menuOpen ? "block" : "hidden"
            } md:flex`}
          >
            <NavLink to="/">Home</NavLink>
            <NavLink to="/add-articles">Add Articles</NavLink>
            <NavLink to="/all-articles">All Articles</NavLink>
            <NavLink to="/subscription">Subscription</NavLink>
            <NavLink to="/user-articles">My Articles</NavLink>
            {PremiumUser?.user_status === "premium" && (
              <NavLink to="/premium-articles">Premium Articles</NavLink>
            )}
            <NavLink to="/about">About</NavLink>
            {user?.role === "admin" && (
              <NavLink to="/dashboard">Dashboard</NavLink>
            )}
            <NavLink to="/my-profile">My Profile</NavLink>
          </nav>
            {/* Right Section */}
            <div className="flex items-center gap-3 md:gap-6">
              {User ? (
                <>
                  <button
                    onClick={handelLogout}
                    className="btn btn-xs btn-active"
                  >
                    Logout
                  </button>
                  <img
                    className="h-8 w-8 object-cover border-amber-300 border-2 rounded-full"
                    src={User?.photoURL}
                    alt="Profile"
                  />
                </>
              ) : (
                <Link to="/login">
                  <button className="flex items-center gap-1 text-sm">
                    <FaUser />
                    <span>Account</span>
                  </button>
                </Link>
              )}
              <button className="bg-red-600 text-white px-2 py-1 rounded text-xs font-semibold">
                SUBSCRIBE
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navber;
