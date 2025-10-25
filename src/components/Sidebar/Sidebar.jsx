import React, { useState, useContext } from "react";
import { GoSidebarCollapse } from "react-icons/go";
import { FaPlus, FaHeart } from "react-icons/fa";
import { MdQueueMusic, MdPodcasts } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { PlayerContext } from "../../context/PlayerContext";
import { ToastContainer, toast } from "react-toastify";

const sidebarTabBarItems = ["All", "Playlists", "Artists", "Albums"];

const Sidebar = ({ isCollapsed, toggleCollapse }) => {
  const notify = () =>
    toast("This feature is coming soon!", {
      position: "top-left",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

  const { likedSongs } = useContext(PlayerContext);
  const navigate = useNavigate();

  const [libraryItems] = useState([
    {
      type: "playlist",
      title: "My Spotify playlist",
      owner: "Abhinav Sharma",
      cover: "/assets/my_spotify_playlist.png",
    },
    {
      type: "playlist",
      title: "Tony Stark Mode On",
      owner: "Abhinav Sharma",
      cover: "/assets/tony_stark_ply.png",
    },
    {
      type: "playlist",
      title: "Mi Fe",
      owner: "Frank Miami",
      cover: "/assets/mifi.png",
    },
    {
      type: "artist",
      title: "Arjit Singh",
      cover: "/assets/arjit_singh.png",
    },
    {
      type: "album",
      title: "The End Is Where We Begin",
      owner: "Thousand Foot Krutch",
      cover: "/assets/the_end_is_where_we_begin.png",
    },
    {
      type: "artist",
      title: "Alan Walker",
      cover: "/assets/alan_walker.webp",
    },
    {
      type: "artist",
      title: "Imagine Dragons",
      cover: "/assets/imagine_dragon.jpeg",
    },
  ]);

  const [activeFilter, setActiveFilter] = useState("All");

  const likedSongsItem = {
    type: "playlist",
    title: "Liked Songs",
    owner: `${likedSongs.length} songs`, 
    cover: "", 
    isLikedSongs: true, 
  };

  
  const allLibraryItems = [
    ...libraryItems,
  ];

  const finalFilteredItems = () => {
    let itemsToFilter = activeFilter === "All" ? allLibraryItems : libraryItems;

    const filtered = itemsToFilter.filter((item) => {
      if (activeFilter === "All") {
        return true; 
      } else if (activeFilter === "Playlists") {
        
        return item.type === "playlist";
      } else if (activeFilter === "Artists") {
        return item.type === "artist";
      } else if (activeFilter === "Albums") {
        return item.type === "album";
      }
      return false;
    });

    if (activeFilter === "All" || activeFilter === "Playlists") {
      if (!filtered.some((item) => item.isLikedSongs)) {
        return [likedSongsItem, ...filtered];
      }
    }

    return filtered;
  };

  return (
    <div
      className={`bg-[#121212] h-full flex flex-col rounded-lg ${
        isCollapsed ? "w-[72px]" : "w-[340px]"
      } transition-all duration-300 ml-2 mt-2 mb-2`}
    >
      <ToastContainer />
      <div className="p-4 pt-0 flex flex-col space-y-4">
        <div
          className={`flex items-center text-gray-400 hover:text-white transition cursor-pointer ${
            isCollapsed ? "justify-center" : "justify-between"
          }`}
        >
          <div className="flex items-center mt-6 gap-3">
            {!isCollapsed && (
              <h2 className="font-bold text-2xl">Your Library</h2>
            )}
          </div>

          <button
            onClick={toggleCollapse}
            className={`text-white transition duration-200 ${
              isCollapsed ? "" : ""
            }`}
          >
            <GoSidebarCollapse
              className={`h-6 w-6 mt-6 hover:scale-110 ${
                isCollapsed ? "transform rotate-180" : ""
              }`}
            />
          </button>
        </div>

        {/* Tab Bar */}
        {!isCollapsed && (
          <div className="flex gap-2 mt-2 mb-6 overflow-x-auto hide-scrollbar">
            {sidebarTabBarItems.map((item) => (
              <button
                key={item}
                onClick={() => setActiveFilter(item)}
                className={`text-sm font-semibold px-3 py-1 rounded-full whitespace-nowrap transition ${
                  activeFilter === item
                    ? "bg-[#242424] text-white"
                    : "bg-black text-white/70 hover:bg-[#343434] hover:text-white"
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-y-auto p-4 pt-0">
        {!isCollapsed && (
          <>
            {/* Action Buttons */}
            <div className="space-y-4 mb-4">
              <div
                onClick={notify}
                className="flex items-center gap-3 p-1 hover:bg-[#1a1a1a] rounded-md cursor-pointer transition"
              >
                <MdQueueMusic className="h-6 w-6 text-gray-400" />
                <p className="text-sm text-white font-semibold">
                  Your Playlists
                </p>
              </div>
              <div
                onClick={notify}
                className="flex items-center gap-3 p-1 hover:bg-[#1a1a1a] rounded-md cursor-pointer transition"
              >
                <FaPlus className="h-6 w-6 text-gray-400" />
                <p className="text-sm text-white font-semibold">
                  Create Playlist
                </p>
              </div>
              <div
                onClick={notify}
                className="flex items-center gap-3 p-1 hover:bg-[#1a1a1a] rounded-md cursor-pointer transition"
              >
                <MdPodcasts className="h-6 w-6 text-gray-400" />
                <p className="text-sm text-white font-semibold">
                  Your Episodes
                </p>
              </div>

              <hr className="text-gray-600" />
            </div>

            {/* Library Items */}
            <div className="space-y-3">
              {finalFilteredItems().map((item, index) => {
                if (item.isLikedSongs) {
                  return (
                    <div
                      key="liked-songs-link"
                      onClick={() => navigate("/likedsongs")} // Navigate to the new route
                      className="flex items-center gap-3 p-1 hover:bg-[#1a1a1a] rounded-md cursor-pointer"
                    >
                      <div className="w-12 h-12 bg-purple-600 flex items-center justify-center text-xl rounded-md">
                        <FaHeart className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <p className="text-white font-semibold">{item.title}</p>
                        <p className="text-xs text-gray-400">
                          Playlist • {likedSongs.length} songs
                        </p>
                      </div>
                    </div>
                  );
                }

                return (
                  <div
                    key={index}
                    className="flex items-center gap-3 p-1 hover:bg-[#1a1a1a] rounded-md cursor-pointer transition"
                  >
                    <img
                      src={item.cover}
                      alt={item.title}
                      className="w-12 h-12 rounded-md object-cover"
                    />
                    <div>
                      <p className="text-white font-semibold">{item.title}</p>
                      <p className="text-xs text-gray-400">
                        {item.type === "artist"
                          ? "Artist"
                          : item.type === "album"
                          ? `Album • ${item.owner}`
                          : `Playlist • ${item.owner}`}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}

        {/* Collapsable Icons */}
        {isCollapsed && (
          <div className="space-y-3 mt-4">
            <MdQueueMusic className="h-6 w-6 mx-auto text-gray-400 hover:text-white cursor-pointer" />
            <FaPlus className="h-6 w-6 mx-auto text-gray-400 hover:text-white cursor-pointer" />
            <MdPodcasts className="h-6 w-6 mx-auto text-gray-400 hover:text-white cursor-pointer" />
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
