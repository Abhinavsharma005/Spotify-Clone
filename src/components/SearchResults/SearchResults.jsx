import React, { useState, useEffect } from "react";
import axios from "axios";

const CLIENT_ID = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
const CLIENT_SECRET = import.meta.env.VITE_SPOTIFY_CLIENT_SECRET;

const SearchResults = ({
  query,
  results,
  loading,
  error,
  accessToken,
  setAccessToken,
  setError,
  setResults,
  showToast,
}) => {
  // Authorization
  useEffect(() => {
    const getAccessToken = async () => {
      if (accessToken) return; 

      try {
        const tokenUrl = "https://accounts.spotify.com/api/token";

        const credentials = btoa(`${CLIENT_ID}:${CLIENT_SECRET}`);

        const response = await axios.post(
          tokenUrl,
          "grant_type=client_credentials",
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
              Authorization: `Basic ${credentials}`,
            },
          }
        );

        if (response.data.access_token) {
          setAccessToken(response.data.access_token);
          setError("");
        } else {
          setError("Failed to retrieve Spotify access token.");
        }
      } catch (err) {
        setError("Error during Spotify authentication.");
        console.error("Auth Error:", err);
      }
    };

    getAccessToken();
    const interval = setInterval(getAccessToken, 55 * 60 * 1000);

    return () => clearInterval(interval);
  }, [accessToken, setAccessToken, setError]); 

  const SpotifyCard = ({ item, category }) => {
    let title, subtitle, date, imageUrl;

    if (category === "Tracks") {
      title = item.name;
      subtitle = item.artists?.map((a) => a.name).join(", ") || "";
      date = item.album?.release_date?.split("-")[0] || "";
      imageUrl = item.album?.images?.[0]?.url;
    } else if (category === "Artists") {
      title = item.name;
      subtitle = "Artist";
      date = item.followers?.total
        ? `${item.followers.total.toLocaleString()} followers`
        : "";
      imageUrl = item.images?.[0]?.url;
    } else if (category === "Albums") {
      title = item.name;
      subtitle = item.artists?.map((a) => a.name).join(", ") || "";
      date = item.release_date?.split("-")[0] || "";
      imageUrl = item.images?.[0]?.url;
    }

    const fallbackImage =
      "https://via.placeholder.com/150/000000/FFFFFF?text=No+Image";

    return (
      <div
        className="p-3 rounded w-44 bg-gray-800 text-white shadow-lg transform transition duration-200 hover:scale-105 cursor-pointer"
        onClick={() => showToast("search_limit")}
      >
        <img
          src={imageUrl || fallbackImage}
          alt={title}
          className="rounded-lg mb-2 w-full h-40 object-cover"
        />
        <h3 className="font-bold text-sm truncate">{title}</h3>
        <p className="text-xs text-gray-400 truncate">{subtitle}</p>
        <p className="text-xs text-gray-500 mt-1">{date}</p>
      </div>
    );
  };

  return (
    <div className="p-0 min-h-full bg-transparent text-white">
      {loading && query && (
        <p className="text-center text-green-500 mt-8">
          Searching for "{query}"...
        </p>
      )}
     

      {error && <p className="text-center text-red-500 mt-8">{error}</p>}

      {query && Object.keys(results).length > 0 && (
        <div className="space-y-10 mt-8">
          <h1 className="text-3xl font-bold mb-6">
            Search Results for "{query}"
          </h1>
          <h3>(note- Playback of searched songs is currently unavailable, try songs from home🙂)</h3>

          {Object.entries(results).map(([key, items]) => {
            if (items.length === 0) return null;

            const categoryTitle = key.charAt(0).toUpperCase() + key.slice(1);

            return (
              <div key={key}>
                <h2 className="text-2xl font-bold mb-4 text-white/90">
                  {categoryTitle}
                </h2>
                <div className="flex flex-wrap gap-5 justify-start">
                  {items.map((item) => (
                    <SpotifyCard
                      key={item.id}
                      item={item}
                      category={categoryTitle}
                      showToast={showToast}
                    />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {!query && !loading && !error && (
        <p className="text-center text-gray-500 mt-20 text-xl">
          Enter a song, artist, or album to start searching!
        </p>
      )}
    </div>
  );
};

export default SearchResults;
