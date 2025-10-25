import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { albumsData, songsData } from '../../assets/assets';
import AlbumItem from '../AlbumItem/AlbumItem';
import SongItem from '../SongItem/SongItem';
import DisplayNav from '../DisplayNav/DisplayNav';
import { FaHeart, FaCompactDisc, FaFire, FaRegLightbulb, FaHeadphones } from "react-icons/fa";
import { GiMusicalNotes } from "react-icons/gi";

const greetingCardsData = [
    { 
        title: "Liked Songs", 
        color: "bg-indigo-900", 
        hoverColor: "hover:bg-indigo-700", 
        accent: "bg-gradient-to-r from-blue-600 to-purple-600", 
        icon: <FaHeart className="w-6 h-6" />,
        hex: '#3F3585',
        isLikedSongsCard: true 
    },
    { 
        title: "Daily Mix", 
        color: "bg-green-900", 
        hoverColor: "hover:bg-green-700", 
        accent: "bg-gradient-to-r from-green-500 to-green-700", 
        icon: <FaCompactDisc className="w-6 h-6" />,
        hex: '#1E9E72' 
    },
    { 
        title: "Discover Weekly", 
        color: "bg-red-900", 
        hoverColor: "hover:bg-red-700", 
        accent: "bg-gradient-to-r from-red-600 to-red-800", 
        icon: <FaRegLightbulb className="w-6 h-6" />,
        hex: '#B83535' 
    },
    { 
        title: "For You", 
        color: "bg-yellow-900", 
        hoverColor: "hover:bg-yellow-700", 
        accent: "bg-gradient-to-r from-yellow-500 to-orange-500", 
        icon: <GiMusicalNotes className="w-6 h-6" />,
        hex: '#CC9818' 
    },
    { 
        title: "Bollywood Trending", 
        color: "bg-pink-900", 
        hoverColor: "hover:bg-pink-700", 
        accent: "bg-gradient-to-r from-pink-500 to-pink-700", 
        icon: <FaFire className="w-6 h-6" />,
        hex: '#B83576'
    },
    { 
        title: "Lofi songs", 
        color: "bg-cyan-900", 
        hoverColor: "hover:bg-cyan-700", 
        accent: "bg-gradient-to-r from-cyan-500 to-teal-700", 
        icon: <FaHeadphones className="w-6 h-6" />,
        hex: '#25A8BA' 
    },
];

const todaysHitsData = [
    {
        id: 0, 
        name: "Faded", 
        image: "/src/assets/img_faded.png", 
        file: "/src/assets/song_faded.mp3", 
        desc: "Alan Walker", 
        duration: "3:32"
    },
    {
        id: 1, 
        name: "Shape of You", 
        image: "/src/assets/img_shapeofyou.png", 
        file: "/src/assets/song_shapeofyou.mp3", 
        desc: "Ed Sheeran", 
        duration: "3:53"
    },
    {
        id: 2, 
        name: "Blinding Lights", 
        image: "/src/assets/img_blindinglights.jpeg", 
        file: "/src/assets/song_blindinglights.mp3", 
        desc: "The Weeknd", 
        duration: "3:20"
    },
    {
        id: 3, 
        name: "Peaches", 
        image: "/src/assets/img_peaches.jpeg", 
        file: "/src/assets/song_peaches.mp3", 
        desc: "Justin Bieber", 
        duration: "3:18"
    },
    {
        id: 4, 
        name: "Alag Aasmaan", 
        image: "/src/assets/img_alagaasmaan.jpeg", 
        file: "/src/assets/song_alagaasmaan.mp3", 
        desc: "Anuv Jain", 
        duration: "2:57"
    },
    {
        id: 5, 
        name: "End of Beginning", 
        image: "/src/assets/img_endofbeginning.png", 
        file: "/src/assets/song_endofbeginning.mp3", 
        desc: "Djo", 
        duration: "3:00"
    },
];

const bollywoodHitsData = [
    {
        id: 200, 
        name: "London Thumakda", 
        image: "/src/assets/img_thumakda.png",
        file: "/src/assets/song_thumakda.mp3",
        desc: "Ghar ke log (Queen)", 
        duration: "3:53"
    },
    {
        id: 201, 
        name: "Pal Pal Dil Ke Paas", 
        image: "/src/assets/img_palpal.jpeg", 
        file: "/src/assets/song_palpal.mp3", 
        desc: "Kishore Kumar", 
        duration: "4:00"
    },
    {
        id: 202, 
        name: "Gallan Goodiyaan", 
        image: "/src/assets/img_goodiyaan.jpg", 
        file: "/src/assets/song_goodiyaan.mp3", 
        desc: "Ghar ke log (Dil Dhadakne Do)", 
        duration: "4:56"
    },
    {
        id: 203, 
        name: "Radha Kaise Na Jale", 
        image: "/src/assets/img_radha.jpg", 
        file: "/src/assets/song_radha.mp3", 
        desc: "A. R. Rahman (Lagaan)", 
        duration: "5:34"
    },
    {
        id: 204, 
        name: "Hookah Bar", 
        image: "/src/assets/img_hookah.jpeg", 
        file: "/src/assets/song_hookah.mp3", 
        desc: "Khiladi 786", 
        duration: "4:15"
    },
    {
        id: 205, 
        name: "Tu Jaane Na", 
        image: "/src/assets/img_tujanena.jpeg", 
        file: "/src/assets/song_tujanena.mp3", 
        desc: "Atif Aslam (Ajab Prem Ki Ghazab Kahani)", 
        duration: "5:41"
    },
];

const DisplayHome = ({ setDynamicBgColor, defaultBgColor }) => {
    const navigate = useNavigate(); 
    
    const [greeting, setGreeting] = useState('');

    useEffect(() => {
        const getGreeting = () => {
            const currentHour = new Date().getHours();
            if (currentHour < 12) {
                return 'Good Morning';
            } else if (currentHour < 18) {
                return 'Good Afternoon';
            } else {
                return 'Good Evening';
            }
        };
        setGreeting(getGreeting());
        
        if (setDynamicBgColor && defaultBgColor) {
            setDynamicBgColor(defaultBgColor); 
        }
    }, [setDynamicBgColor, defaultBgColor]);


    const handleMouseEnter = (hexColor) => {
        if (setDynamicBgColor) setDynamicBgColor(hexColor);
    };

    const handleMouseLeave = () => {
        if (setDynamicBgColor) setDynamicBgColor(defaultBgColor); 
    };

    const handleCardClick = (item) => {
        if (item.isLikedSongsCard) {
            navigate('/likedsongs');
        } else {
            console.log(`Clicked on ${item.title}`);
        }
    };


    return (
        <>
            <DisplayNav />

            {/* Greeting Cards */}
            <div className='mt-6 mb-8'>
                <h1 className='font-bold text-3xl mb-4'>{greeting}</h1>
                
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-7'>
                    {greetingCardsData.map((item, index) => (
                        <div 
                            key={index} 
                            onClick={() => handleCardClick(item)} 
                            onMouseEnter={() => handleMouseEnter(item.hex)} 
                            onMouseLeave={handleMouseLeave}
                            className={`
                                flex items-center h-20 rounded-md cursor-pointer 
                                transition duration-300 transform hover:scale-105
                                ${item.color} ${item.hoverColor}
                            `}
                        >
                            <div className={`h-full w-20 flex-shrink-0 ${item.accent}`}>
                                <div className="h-full w-full flex items-center justify-center text-white">
                                    {item.icon}
                                </div>
                            </div>
                            
                            <p className='font-bold text-base p-4 whitespace-nowrap overflow-hidden text-ellipsis'>{item.title}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Existing Featured Charts Section */}
            <div className='mb-4'>
                <h1 className='my-5 font-bold text-2xl'>Featured Charts</h1>
                <div className='flex overflow-auto'>
                    {albumsData.map((item, index) => (<AlbumItem key={index} name={item.name} desc={item.desc} image={item.image} id={item.id} />))}
                </div>
            </div>

            {/* Today's Biggest Hits Section  */}
            <div className='mb-4'>
                <h1 className='my-5 font-bold text-2xl'>Today's biggest hits</h1>
                <div className='flex overflow-auto'>
                    {todaysHitsData.map((item, index) => (
                        <SongItem 
                            key={item.id} 
                            name={item.name} 
                            desc={item.desc} 
                            id={item.id} 
                            image={item.image} 
                            item={item} 
                            sourcePlaylist={todaysHitsData} 
                        />
                    ))}
                </div>
            </div>

            {/*  NEW SECTION: Top Bollywood Songs  */}
            <div className='mb-4'>
                <h1 className='my-5 font-bold text-2xl'>Top Bollywood Songs</h1>
                <div className='flex overflow-auto'>
                    {bollywoodHitsData.map((item, index) => (
                        <SongItem 
                            key={item.id} 
                            name={item.name} 
                            desc={item.desc} 
                            id={item.id} 
                            image={item.image} 
                            item={item} 
                            sourcePlaylist={bollywoodHitsData} 
                        />
                    ))}
                </div>
            </div>
        </>
    )
}

export default DisplayHome