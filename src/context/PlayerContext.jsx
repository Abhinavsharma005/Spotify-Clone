import { createContext, useEffect, useRef, useState } from "react";
import { songsData } from "../assets/assets";

export const PlayerContext = createContext();

const PlayerContextProvider = (props) => {

    const audioRef = useRef();
    const seekBg = useRef();
    const seekBar = useRef();
    
    const volumeBg = useRef();
    const volumeBar = useRef();
    const [volume, setVolume] = useState(0.5); 

    const [track, setTrack] = useState(songsData[0]);
    const [playStatus, setPlayStatus] = useState(false)
    const [currentPlaylist, setCurrentPlaylist] = useState(songsData);
    const [likedSongs, setLikedSongs] = useState([]);
    
    const [time, setTime] = useState({
        currentTime: {
            second: 0,
            minute: 0
        },
        totalTime: {
            second: 0,
            minute: 0
        }
    })

    //LocalStorage Logic for Liked Songs 
    useEffect(() => {
        const storedLikedSongs = localStorage.getItem('liked_songs');
        if (storedLikedSongs) {
            try {
                setLikedSongs(JSON.parse(storedLikedSongs));
            } catch (e) {
                console.error("Error parsing liked songs from localStorage:", e);
                setLikedSongs([]);
            }
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('liked_songs', JSON.stringify(likedSongs));
    }, [likedSongs]);

    // Liked Songs Functions
    const isLiked = (songId) => {
        return likedSongs.some(song => song.id === songId); 
    };

    const toggleLike = () => {
        if (!track || typeof track.id === 'undefined') return;

        setLikedSongs(prev => {
            if (isLiked(track.id)) {
                return prev.filter(song => song.id !== track.id);
            } else {
                return [...prev, { ...track, file: track.file || songsData.find(s => s.id === track.id)?.file }];
            }
        });
    };
    // ----------------------------
    
    const play = () => {
        audioRef.current.play();
        setPlayStatus(true);
    }

    const pause = () => {
        audioRef.current.pause();
        setPlayStatus(false);
    }
    
    const getCurrentTrackIndex = () => {
        return currentPlaylist.findIndex(song => song.id === track.id);
    }

    const previous = async () => {
        const currentIndex = getCurrentTrackIndex();
        
        if (currentIndex > 0) {
            const previousTrack = currentPlaylist[currentIndex - 1];
            await setTrack(previousTrack);
            await audioRef.current.play();
            setPlayStatus(true);
        } else if (currentPlaylist.length > 0) {
            const lastTrack = currentPlaylist[currentPlaylist.length - 1];
            await setTrack(lastTrack);
            await audioRef.current.play();
            setPlayStatus(true);
        }
    }

    const next = async () => {
        const currentIndex = getCurrentTrackIndex();
        
        if (currentIndex < currentPlaylist.length - 1) {
            const nextTrack = currentPlaylist[currentIndex + 1];
            await setTrack(nextTrack);
            await audioRef.current.play();
            setPlayStatus(true);
        } else if (currentPlaylist.length > 0) {
            const firstTrack = currentPlaylist[0];
            await setTrack(firstTrack);
            await audioRef.current.play();
            setPlayStatus(true);
        }
    }

    const playWithId = async (id) => {
        setCurrentPlaylist(songsData); 
        const selectedTrack = songsData.find(song => song.id === id);
        
        if (selectedTrack) {
            await setTrack(selectedTrack);
            await audioRef.current.play();
            setPlayStatus(true);
        }
    }

    const playWithFilePath = async (newTrack, sourcePlaylist) => {
        setCurrentPlaylist(sourcePlaylist); 
        await setTrack(newTrack); 
        await audioRef.current.play(); 
        setPlayStatus(true);
    }

    const seekSong = async (e) => {
        audioRef.current.currentTime = ((e.nativeEvent.offsetX / seekBg.current.offsetWidth) * audioRef.current.duration);
    };

    const seekVolume = async (e) => {
        const barWidth = volumeBg.current.offsetWidth;
        const newVolume = e.nativeEvent.offsetX / barWidth;

        audioRef.current.volume = newVolume; 
        
        volumeBar.current.style.width = newVolume * 100 + "%";
        setVolume(newVolume);
    };

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = volume;
        }
    }, [audioRef, volume]);


    useEffect(() => {
        setTimeout(() => {
            audioRef.current.ontimeupdate = (e) => {
                seekBar.current.style.width = (Math.floor(audioRef.current.currentTime * 100 / audioRef.current.duration)) + "%";
                setTime({
                    currentTime: {
                        second: Math.floor(audioRef.current.currentTime % 60),
                        minute: Math.floor(audioRef.current.currentTime / 60)
                    },
                    totalTime: {
                        second: Math.floor(audioRef.current.duration % 60),
                        minute: Math.floor(audioRef.current.duration / 60)
                    }
                })
            }
        }, 1000);
    }, [audioRef])

    const contextValue = {
        audioRef, track, setTrack, playStatus, setPlayStatus, next, previous, play, pause, playWithId, playWithFilePath, 
        currentPlaylist, seekBar, seekBg, seekSong, time,
        likedSongs, isLiked, toggleLike,
        seekVolume, volumeBg, volumeBar, volume
    }

    return (
        <PlayerContext.Provider value={contextValue}>
            {props.children}
        </PlayerContext.Provider>
    )
}

export default PlayerContextProvider;