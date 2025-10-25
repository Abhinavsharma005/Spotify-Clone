import React, { useContext } from 'react'
import { PlayerContext } from '../../context/PlayerContext'
import { FaPlay } from "react-icons/fa";

const SongItem = ({ name, image, desc, id, item, sourcePlaylist }) => { // <-- Receive new prop

    const { playWithId, playWithFilePath } = useContext(PlayerContext);
    
    const handlePlay = (e) => {
        e.stopPropagation();
        
        if (item && item.file) {
            playWithFilePath(item, sourcePlaylist); 
        } else {
            playWithId(id);
        }
    }


    return (
        <div 
            // onClick={() => { /* Retaining the original card click logic if needed, but primary interaction is the button */}} 
            className='min-w-[180px] p-2 px-3 rounded cursor-pointer transition-all duration-300 relative group hover:bg-[#ffffff26]'
        >
            <img className='rounded w-full object-cover' src={image} alt={name} />
            
            <button 
                onClick={handlePlay} 
                className="
                    absolute 
                    right-5 
                    bottom-[68px] 
                    bg-green-500 
                    text-black 
                    p-3 
                    rounded-full 
                    shadow-xl 
                    opacity-0 
                    transition-all 
                    duration-300 
                    group-hover:opacity-100 
                    group-hover:bottom-[72px] 
                    hover:scale-105
                "
            >
                <FaPlay className="w-5 h-5" />
            </button>

            <p className='font-bold mt-2 mb-1'>{name}</p>
            <p className='text-slate-200 text-sm truncate'>{desc}</p>
        </div>
    )
}

export default SongItem;