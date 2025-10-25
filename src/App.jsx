import React, { useState, useContext, useEffect } from "react"; 
import axios from "axios"; 
import Sidebar from "./components/Sidebar/Sidebar";
import Player from "./components/Player/Player";
import Display from "./components/Display/Display";
import { GoHomeFill } from "react-icons/go";
import { IoFolderOpenSharp } from "react-icons/io5";
import { CiSearch } from "react-icons/ci";
import { FaSpotify } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { PlayerContext } from "./context/PlayerContext";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

const CLIENT_ID = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
const CLIENT_SECRET = import.meta.env.VITE_SPOTIFY_CLIENT_SECRET;
const SPOTIFY_TOKEN_URL = import.meta.env.VITE_SPOTIFY_TOKEN_URL;
const SPOTIFY_SEARCH_URL = import.meta.env.VITE_SPOTIFY_SEARCH_URL;

const App = () => {
  
  const [searchQuery, setSearchQuery] = useState("");
  const [searchAccessToken, setSearchAccessToken] = useState("");
  const [searchResults, setSearchResults] = useState({});
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchError, setSearchError] = useState("");
  

  const notify = () =>
    toast("This feature is coming soon!", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

  const { audioRef, track } = useContext(PlayerContext);
  const navigate = useNavigate();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [dynamicBgColor, setDynamicBgColor] = useState(null);

  const toggleCollapse = () => {
    setIsSidebarCollapsed((prev) => !prev);
  };

  // Authorization
  useEffect(() => {
    const getAccessToken = async () => {
      if (searchAccessToken) return;

      try {
        const credentials = btoa(`${CLIENT_ID}:${CLIENT_SECRET}`);
        const response = await axios.post(
          SPOTIFY_TOKEN_URL,
          "grant_type=client_credentials",
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
              Authorization: `Basic ${credentials}`,
            },
          }
        );
        setSearchAccessToken(response.data.access_token);
      } catch (err) {
        setSearchError("Error during Spotify authentication.");
      }
    };
    getAccessToken();
  }, [searchAccessToken]);

  // handles search form submission
  const handleSearch = async (e) => {
    e.preventDefault();

    if (!searchQuery.trim()) return;

    

    navigate("/search");

    if (!searchAccessToken) {
      setSearchError("Access Token is not available.");

      return;
    }

    setSearchLoading(true);

    setSearchError("");

    setSearchResults({});

    try {
      const types = "track,artist,album";

      const response = await axios.get(
        `${SPOTIFY_SEARCH_URL}?q=${encodeURIComponent(
          searchQuery
        )}&type=${types}&limit=8`,

        {
          headers: {
            Authorization: `Bearer ${searchAccessToken}`,
          },
        }
      );

      setSearchResults({
        tracks: response.data.tracks?.items || [],

        artists: response.data.artists?.items || [],

        albums: response.data.albums?.items || [],
      });

      if (
        response.data.tracks?.items?.length === 0 &&
        response.data.artists?.items?.length === 0 &&
        response.data.albums?.items?.length === 0
      ) {
        setSearchError(`No results found for "${searchQuery}".`);
      }
    } catch (err) {
      setSearchError("Failed to fetch data from Spotify.");

      console.error("API Error:", err);
    } finally {
      setSearchLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen w-screen bg-black text-white overflow-x-hidden">
      <ToastContainer />
      {/* HEADER */}
      <header className="shrink-0 p-4 flex flex-wrap gap-2 items-center justify-between">
        <div className="text-2xl font-bold flex justify-start items-start ">
          <h1 className="flex justify-center mt-1 items-center gap-2">
            <span className="text-green-400">Abhinav's</span> Spotify{" "}
            <FaSpotify className="text-white h-7 w-7" />
          </h1>
        </div>

        {/* Left Spacer/Placeholder */}
        <div className="flex items-center gap-4 w-[200px] min-w-[200px] invisible">
          <button className="bg-white text-black text-sm px-4 py-1.5 rounded-full font-semibold"></button>
          <button className="bg-black text-white text-sm px-4 py-1.5 rounded-full font-semibold border border-white"></button>
          <div className="bg-purple-500 w-8 h-8 rounded-full"></div>
        </div>

        {/* CENTER SECTION: Navigation/Search Bar */}
        
        <form
          onSubmit={handleSearch}
          className="flex items-center justify-center gap-4 max-w-lg w-full ml-auto mr-auto"
        >
          <button
            onClick={() => navigate("/")}
            type="button"
            className="bg-[#1f1f1f] rounded-full p-3 hover:bg-gray-700 transition"
          >
            <GoHomeFill className="h-6 w-6 hover:scale-110 transition disabled:opacity-50" />
          </button>

          <div className="flex items-center space-x-2 bg-[#1f1f1f] rounded-full p-2 pr-4 grow max-w-md">
            <div className="relative flex items-center p-1 grow">
              <CiSearch className="absolute left-3 h-6 w-6 text-white" />
              <input
                type="text"
                placeholder="What do you want to play?"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => {
                  if (!searchAccessToken) notify("demo");
                }}
                className="bg-[#1f1f1f] text-white pl-10 focus:outline-none pr-4 w-full placeholder-gray-400"
              />
            </div>

            <div className="h-6 gap-2 flex items-center">
              <div className="h-full border-l border-gray-600 mx-2"></div>

              <button
                type="button"
                className="text-white transition disabled:opacity-50"
              >
                <IoFolderOpenSharp
                  onClick={notify}
                  className="h-6 w-6 hover:scale-110 transition"
                />
              </button>
            </div>
          </div>
        </form>

        {/* Right Section:- Explore/Install/Profile buttons */}
        <div className="hidden md:flex items-center mt-1 gap-4 ml-auto">
          <button
            onClick={() => notify("demo")}
            className="bg-white text-black text-sm px-4 py-1.5 rounded-full font-semibold hover:scale-105 transition"
          >
            Explore Premium
          </button>
          <button
            onClick={() => notify("soon")}
            className="bg-black text-white text-sm px-4 py-1.5 rounded-full font-semibold border border-white hover:scale-105 transition"
          >
            Install App
          </button>
          <div
            onClick={() => notify("demo")}
            className="bg-green-500 w-9 h-9 rounded-full flex items-center justify-center text-white font-semibold cursor-pointer"
          >
            <CgProfile className="w-7 h-7" />
          </div>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <div className="flex grow overflow-hidden p-2 pt-0">
        <Sidebar
          isCollapsed={isSidebarCollapsed}
          toggleCollapse={toggleCollapse}
        />

        <div
          className={`
                        h-full mt-2 rounded bg-[#121212] text-white overflow-auto grow
                        ${
                          isSidebarCollapsed
                            ? "w-[calc(100%-72px)]"
                            : "w-[calc(100%-340px)]"
                        }
                        transition-all duration-300 ml-2
                    `}
        >
          <Display
            isSidebarCollapsed={isSidebarCollapsed}
            dynamicBgColor={dynamicBgColor}
            setDynamicBgColor={setDynamicBgColor}
            // passing search states to search
            searchQuery={searchQuery}
            searchResults={searchResults}
            searchLoading={searchLoading}
            searchError={searchError}
            searchAccessToken={searchAccessToken}
            setSearchAccessToken={setSearchAccessToken}
            setSearchError={setSearchError}
            setSearchResults={setSearchResults}
            showToast={notify} 
          />
        </div>
      </div>

      {/* PLAYER BAR */}
      <div className="shrink-0 h-20 relative z-50">
        <Player showToast={notify} />
      </div>

      <audio ref={audioRef} preload="auto" src={track.file}></audio>
    </div>
  );
};

export default App;
