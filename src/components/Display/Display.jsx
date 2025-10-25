import React, { useEffect, useRef } from 'react'
import DisplayHome from '../DisplayHome/DisplayHome'
import { Route, Routes, useLocation, useParams } from 'react-router-dom'
import { albumsData } from '../../assets/assets'
import DisplayAlbum from '../DisplayAlbum/DisplayAlbum' 
import DisplayLikedSongs from '../DisplayLikedSongs/DisplayLikedSongs'; 
import SearchResults from '../SearchResults/SearchResults'; 


// IframeDisplay Component
const IframeDisplay = () => {
    const externalLinks = {
        0: "https://open.spotify.com/playlist/0THsm8XvGvgihZ3PqpiQCi", 
    };
    const { id } = useParams();
    const url = externalLinks[Number(id)];
    
    if (!url) return <div className='w-full h-full p-6 text-red-400'>Error: External URL not found for ID {id}.</div>;

    return (
        <div className="w-full h-full p-0 flex flex-col">
            <h3 className="text-xl p-4 bg-black/50 rounded-t-lg">Loading External Content: {url}</h3>
            <iframe
                src={url}
                className="w-full flex-grow"
                style={{ height: '100%', border: 'none' }}
                title="External Spotify Content"
            ></iframe>
        </div>
    );
};


const Display = ({ dynamicBgColor, setDynamicBgColor, searchQuery, searchResults, searchLoading, searchError, searchAccessToken, setSearchAccessToken, setSearchError, setSearchResults, showToast }) => {

    const displayRef = useRef();
    const location = useLocation();
    let isAlbum = location.pathname.includes("album");
    let albumId = isAlbum ? location.pathname.split('/').pop() : "" 
    let bgColor = albumsData[Number(albumId) % albumsData.length]?.bgColor || '#121212';
    
    const defaultBgColor = '#3F3585'; 

    useEffect(() => {
        let finalBg = dynamicBgColor || defaultBgColor;

        if (isAlbum) {
            displayRef.current.style.transition = 'background 2s ease-in-out';
            displayRef.current.style.background = `linear-gradient(${bgColor},#121212)`;
        } else {
            displayRef.current.style.transition = 'background 2s ease-in-out'; 
            displayRef.current.style.background = `linear-gradient(${finalBg} 0%, #121212 45%)`;
        }
    }, [isAlbum, bgColor, dynamicBgColor])

    return (
        <div ref={displayRef} className='w-full h-full px-6 pt-4 text-white'>
            <Routes>
                {/* Home Route */}
                <Route 
                    path='/' 
                    element={
                        <DisplayHome 
                            setDynamicBgColor={setDynamicBgColor} 
                            defaultBgColor={defaultBgColor} 
                        />
                    } 
                />
                {/* Search Results Route */}
                <Route 
                    path='/search' 
                    element={
                        <SearchResults
                            query={searchQuery}
                            results={searchResults}
                            loading={searchLoading}
                            error={searchError}
                            accessToken={searchAccessToken}
                            setAccessToken={setSearchAccessToken}
                            setError={setSearchError}
                            setResults={setSearchResults}
                            showToast={showToast}
                        />
                    } 
                />
                {/* Album Route */}
                <Route path='/album/:id' element={<DisplayAlbum />} />
                {/* Liked Songs Route */}
                <Route path='/likedsongs' element={<DisplayLikedSongs />} />
                {/* Iframe Route */}
                <Route path='/iframe/:id' element={<IframeDisplay />} /> 
            </Routes>
        </div>
    )
}

export default Display