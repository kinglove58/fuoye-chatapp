import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { LogOut, MessageSquare, Search, Settings, User } from "lucide-react";
import { useState } from "react";
import { useChatStore } from "../store/useChatStore";

const Navbar = () => {
  const { logout, authUser } = useAuthStore();
  const [showInput, setShowInput] = useState(false);
  const [userInput, setUserInput] = useState("");

  const { searchValue, setSearchValue } = useChatStore();

  const navigate = useNavigate()

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchValue(userInput);
    setUserInput("");
    navigate("/")
    console.log("Search Working");
  };

  return (
    <header
      className="bg-base-100 border-b border-base-300 fixed w-full top-0 z-40 
    backdrop-blur-lg bg-base-100/80"
    >
      <div className="container mx-auto px-4 h-16">
        <div className="flex items-center justify-between gap-4 h-full">
          <div className="flex items-center gap-8">
            <Link
              to="/"
              className="flex items-center gap-2.5 hover:opacity-80 transition-all"
            >
              <div className="size-9 rounded-lg bg-primary/10 flex items-center justify-center">
                <MessageSquare className="w-5 h-5 text-primary" />
              </div>
              <h1 className="text-lg font-bold">Chatty</h1>
            </Link>
          </div>

          <form
            className="hidden md:flex items-center max-w-2xl min-w-[400px] rounded-md p-2 h-[40px] bg-transparent border focus:border-none active:border-none border-primary"
            onSubmit={handleSearch}
          >
            <input
              type="text"
              className="flex-1 rounded-md bg-transparent border-none outline-none"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
            />
            <button type="submit">
              <Search className="cursor-pointer" />
            </button>
          </form>

          <div className="relative flex md:hidden">
            <button
              type="submit"
              onClick={() => setShowInput(!showInput)}
              className=""
            >
              <Search className="cursor-pointer" />
            </button>
            {showInput && (
              <div className="absolute top-10 -left-40">
                <form
                  className="flex items-center max-w-xl min-w-[300px] rounded-md p-2 h-[40px] bg-transparent border focus:border-none active:border-none border-primary"
                  onSubmit={handleSearch}
                >
                  <input
                    type="text"
                    className="flex-1 rounded-md bg-transparent border-none outline-none"
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                  />
                  <button type="submit">
                    <Search className="cursor-pointer" />
                  </button>
                </form>
              </div>
            )}
          </div>

          <div className="flex items-center gap-2">
            <Link
              to={"/settings"}
              className={`
              btn btn-sm gap-2 transition-colors
              
              `}
            >
              <Settings className="w-4 h-4" />
              <span className="hidden sm:inline">Settings</span>
            </Link>

            {authUser && (
              <>
                <Link to={"/profile"} className={`btn btn-sm gap-2`}>
                  <User className="size-5" />
                  <span className="hidden sm:inline">Profile</span>
                </Link>

                <button className="flex gap-2 items-center" onClick={logout}>
                  <LogOut className="size-5" />
                  <span className="hidden sm:inline">Logout</span>
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
export default Navbar;
