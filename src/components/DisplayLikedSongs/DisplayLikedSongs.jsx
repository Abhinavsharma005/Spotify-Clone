import React, { useContext } from 'react';
import { PlayerContext } from '../../context/PlayerContext';
import { assets } from '../../assets/assets';
import DisplayNav from '../DisplayNav/DisplayNav';
import { FaHeart } from "react-icons/fa"; 

const DisplayLikedSongs = () => {
    const { likedSongs, playWithFilePath } = useContext(PlayerContext);

    const playlist = likedSongs;

    const handlePlaySong = (song) => {
        playWithFilePath(song, playlist);
    };

    return (
        <>
            <DisplayNav />
            
            {/* Header Section */}
            <div className='mt-10 flex gap-8 flex-col md:flex-row md:items-end'>
                <div className='w-48 h-48 bg-purple-600 flex items-center justify-center rounded'>
                    <FaHeart className='w-16 h-16 text-white' />
                </div>
                <div className='flex flex-col'>
                    <p>Playlist</p>
                    <h2 className='text-5xl font-bold mb-4 md:text-7xl'>Liked Songs</h2>
                    <h4>All your favorite tracks in one place.</h4>
                    <p className='mt-1'>
                        <img className='inline-block w-5' src={assets.spotify_logo} alt="" /> 
                        <b>Spotify</b> • {likedSongs.length} songs
                    </p>
                </div>
            </div>
            
            <div className='grid grid-cols-3 sm:grid-cols-4 mt-10 mb-4 pl-2 text-[#a7a7a7]'>
                <p><b className='mr-4'>#</b> Title</p>
                <p>Artist/Description</p>
                <p className='hidden sm:block'>Duration</p>
                <img className='m-auto w-4' src={assets.clock_icon} alt='' />
            </div>
            <hr />

            {/* Song List */}
            {likedSongs.map((item, index) => (
                <div 
                    onClick={() => handlePlaySong(item)} 
                    className='grid grid-cols-3 sm:grid-cols-4 gap-2 p-2 items-center text-[#a7a7a7] hover:bg-[#ffffff2b] cursor-pointer' 
                    key={item.id}
                >
                    <p className='text-white'>
                        <b className='mr-4 text-[#a7a7a7]'>{index + 1}</b>
                        <img className='inline w-10 mr-5' src={item.image} alt="" />
                        {item.name}
                    </p>
                    <p className='text-[15px]'>{item.desc}</p>
                    <p className='text-[15px] hidden sm:block'>Just added</p>
                    <p className='text-[15px] text-center'>{item.duration || 'N/A'}</p>
                </div>
            ))}
        </>
    );
};

export default DisplayLikedSongs;