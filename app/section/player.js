
'use client'

import Ayat from './ayat'
import Recitation from './recitation'
import Sound from './sound'

import { createRef, useEffect, useRef, useState } from 'react'

function Player({recitations, chapters}) {

    const audioPlayer = useRef()
    const progressBar = useRef()
    const progresVolume = useRef()
    const animationRef = useRef()

    const listAudio = createRef()

    const [isPlaying, setIsPlaying] = useState(false)
    const [playingNow, setPlayingNow] = useState({
        reciterName : recitations[0].reciter_name, 
        surah : chapters[0].name_simple,
        surahId: chapters[0].id,
        toogle: false
    })

    const [ayahs, setAyahs] = useState([])

    const [isDuration, setIsDuration] = useState(0)
    const [isCurrenttime, setIsCurrenttime] = useState(0)
    const [isLoop, setIsLoop] = useState(false)
    const [volume, setVolume] = useState(100)
    const [showPlaylist, setShowPlaylist] = useState(false)

    const tooglePlayPause = (reciterName, surah, surahId, toogle) => {
       
        setIsPlaying(toogle)
        setPlayingNow({
            reciterName, surah, surahId, toogle
        })  
    }

    const getAyahs = async(surahId) => {

        const BASE_URL = 'https://quran-api-id.vercel.app'
        
        try {

            const response = await fetch(`${BASE_URL}/surahs/${surahId}/ayahs`)
            const result =  await response.json()
            
            setAyahs(result)
            
        } catch (error) {
            console.log(error.message)
        }
    }
    
    useEffect(() => {
        
        if (playingNow.toogle) {

            audioPlayer.current.play()
            animationRef.current = requestAnimationFrame(whilePlaying)
            getAyahs(playingNow.surahId)

        } else {

            audioPlayer.current.pause()
            cancelAnimationFrame(animationRef.current);
            setAyahs([])

        }
        
        
    }, [playingNow])

    useEffect(() => {
      
        const seconds = Math.floor(audioPlayer.current.duration)        
        setIsDuration(seconds)  
        progressBar.current.max = !isNaN(seconds) && seconds 

        audioPlayer.current.addEventListener("ended", changeEndAudio)
        
    }, [audioPlayer?.current?.onloadedmetadata, audioPlayer?.current?.readyState])
    

    const changeBar = () => {

        audioPlayer.current.currentTime = progressBar.current.value
        changePlayerCurrentTime()
    }

    const whilePlaying = () => {

        progressBar.current.value = audioPlayer.current.currentTime;
        changePlayerCurrentTime();
        animationRef.current = requestAnimationFrame(whilePlaying);
        
    }
    
    const changePlayerCurrentTime = () => {
        const duration = Math.floor(audioPlayer.current.duration)  
        progressBar.current.style.setProperty('--selection-width', `${(progressBar.current.value / duration) * 100}%`)
        setIsCurrenttime(progressBar.current.value)
    }


    const audioLoop = (isLoop) => {
        audioPlayer.current.loop = isLoop
        setIsLoop(isLoop)
    }

    const changeNextAudio = (reciterName) => {
        listAudio.current.nextAudio(audioPlayer.current.src, reciterName)
    }

    const changePrevAudio = (reciterName) => {
        listAudio.current.prevAudio(audioPlayer.current.src, reciterName)
    }

    const changeVolume = () => {
        setVolume(progresVolume.current.value)
        audioPlayer.current.volume = progresVolume.current.value / 100
    }

    const changeEndAudio = () => {
        setIsPlaying(false)
        progressBar.current.style.setProperty('--selection-width', '0%')
        cancelAnimationFrame(animationRef.current);
        progressBar.current.max = isDuration
        setIsCurrenttime(progressBar.current.value)
    }
    
    

    return (
        <div>
             <audio src="https://download.quranicaudio.com/qdc/abdul_baset/murattal/1.mp3" preload="metadata" ref={audioPlayer}/>
            <Sound 
                isPlaying={isPlaying}
                playingNow={playingNow}
                tooglePlayPause={(reciterName, surah, surahId, toogle)=>tooglePlayPause(reciterName, surah, surahId, toogle)}
                duration={isDuration}
                currentTime={isCurrenttime}
                progressBar={progressBar}
                changeBar={()=>changeBar()}
                audioLoop={(loop)=>audioLoop(loop)}   
                isLoop={isLoop}    
                changeNextAudio={(reciterName)=>changeNextAudio(reciterName)}
                changePrevAudio={(reciterName)=>changePrevAudio(reciterName)}
                progresVolume={progresVolume}
                changeVolume={()=>changeVolume()}
                volume={volume}
                setShowPlaylist={setShowPlaylist}
            />
			<div className="h-screen">
				<div className="grid grid-cols-3 h-full">
					<Ayat 
                        listAyat={ayahs}
                    />				
					<Recitation 
                        ref={listAudio}
                        playingNow={playingNow}
						recitations={recitations}
						chapters={chapters}
                        audioPlayer={audioPlayer}
                        tooglePlayPause={(reciterName, surah, surahId, toogle)=>tooglePlayPause(reciterName, surah, surahId, toogle)}
                        isPlaying={isPlaying}
                        showPlaylist={showPlaylist}
                        setShowPlaylist={setShowPlaylist}
					/>			
				</div>
            </div>
		</div>
    )
}

export default Player