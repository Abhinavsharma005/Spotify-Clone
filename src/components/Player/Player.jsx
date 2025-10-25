import React, { useContext, useRef } from 'react'
import { assets } from '../../assets/assets'
import { PlayerContext } from '../../context/PlayerContext'
import { FaHeart } from "react-icons/fa"; 
import { LuMonitorPlay, LuShuffle, LuRepeat } from 'react-icons/lu';
import { PiMicrophoneDuotone, PiQueueFill } from 'react-icons/pi';
import { MdOutlineVolumeUp, MdFullscreen } from 'react-icons/md';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { BsPlayCircleFill, BsPauseCircleFill } from 'react-icons/bs';
import { ToastContainer, toast } from "react-toastify";


const Player = () => {

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

    const { 
        track, playStatus, play, pause, previous, next, seekBar, seekBg, seekSong, 
        time, toggleLike, isLiked, 
        seekVolume, volumeBg, volumeBar, volume
    } = useContext(PlayerContext);
    
    const isCurrentTrackLiked = track && typeof track.id !== 'undefined' ? isLiked(track.id) : false;

    const iconHoverClass = 'transition duration-200 cursor-pointer hover:scale-110 hover:opacity-100 text-gray-400 hover:text-white';

    const formatTime = (time) => (time < 10 ? '0' : '') + time;

    return (
        <div className='h-20 bg-black flex justify-between items-center text-white px-4 shrink-0'>
            <ToastContainer />

            {/* Left Section: Album Art & Like Button */}
            <div className='flex items-center gap-4 w-1/4'>
                <img className='w-12 h-12 rounded object-cover' src={track.image} alt="" />
                <div className='text-sm'>
                    <p className='font-semibold'>{track.name}</p>
                    <p className='text-xs text-gray-400'>{track.desc && track.desc.slice(0, 15)}...</p>
                </div>
                
                <button 
                    onClick={toggleLike} 
                    className="cursor-pointer transition"
                    title={isCurrentTrackLiked ? "Unlike" : "Like"}
                >
                    <FaHeart 
                        className={`w-4 h-4 ${isCurrentTrackLiked ? 'text-red-500' : 'text-gray-400 hover:text-white'}`} 
                    />
                </button>
            </div>
            
            {/* Center Section: Playback Controls & Seek Bar */}
            <div className='flex flex-col items-center gap-1 w-2/4'>
                <div className='flex gap-4 items-center'>
                    <img onClick={notify} className={`w-4 ${iconHoverClass}`} src={assets.shuffle_icon} title="Shuffle" alt="Shuffle" />
                    <img className={`w-4 ${iconHoverClass}`} onClick={previous} src={assets.prev_icon} title="Previous" alt="Previous" />
                    {playStatus
                        ? <BsPauseCircleFill className={`w-8 h-8 cursor-pointer text-white hover:scale-105`} onClick={pause} />
                        : <BsPlayCircleFill className={`w-8 h-8 cursor-pointer text-white hover:scale-105`} onClick={play} />
                    }
                    <img className={`w-4 ${iconHoverClass}`} onClick={next} src={assets.next_icon} title="Next" alt="Next" />
                    <img onClick={notify} className={`w-4 ${iconHoverClass}`} src={assets.loop_icon} title="Loop" alt="Loop" />
                </div>
                <div className='flex items-center gap-2 w-full'>
                    <p className='text-xs text-gray-400'>{time.currentTime.minute}:{formatTime(time.currentTime.second)}</p>
                    <div onClick={seekSong} ref={seekBg} className='w-full bg-gray-600 rounded-full cursor-pointer h-1'>
                        <hr ref={seekBar} className='h-1 border-none w-0 bg-green-500 rounded-full' />
                    </div>
                    <p className='text-xs text-gray-400'>{time.totalTime.minute}:{formatTime(time.totalTime.second)}</p>
                </div>
            </div>

            {/* Right Section */}
            <div className='hidden items-center gap-3 w-1/4 justify-end lg:flex'>
                
                <LuMonitorPlay onClick={notify} className={`w-5 h-5 ${iconHoverClass}`} title="Mini Player" />
                <PiMicrophoneDuotone onClick={notify} className={`w-5 h-5 ${iconHoverClass}`} title="Lyrics/Mic" />
                <PiQueueFill onClick={notify} className={`w-5 h-5 ${iconHoverClass}`} title="Queue" />
                
                <MdOutlineVolumeUp className={`w-5 h-5 ${iconHoverClass}`} title="Volume" />
                
                <div 
                    ref={volumeBg} 
                    onClick={seekVolume} 
                    className='w-24 bg-gray-600 rounded-full cursor-pointer h-1 transition'
                >
                    <hr 
                        ref={volumeBar} 
                        className='h-1 border-none bg-white rounded-full' 
                        style={{ width: `${volume * 100}%` }} 
                    />
                </div>

                <MdFullscreen onClick={notify} className={`w-6 h-6 ${iconHoverClass}`} title="Fullscreen" />
            </div>
        </div>
    )
}

export default Player