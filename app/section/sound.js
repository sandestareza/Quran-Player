'use client'

import { MdPauseCircleOutline, MdPlayCircleOutline, MdQueueMusic, MdRepeatOneOn, MdSkipNext, MdSkipPrevious, MdVolumeUp, MdRepeat, MdVolumeMute, MdVolumeOff, MdVolumeDown, MdOutlineVolumeOff } from 'react-icons/md'
import { calculateTime } from '@/helpers'
import {SiAudiomack} from 'react-icons/si';
import { useState } from 'react';

const Sound = ({isPlaying, tooglePlayPause, playingNow, duration, currentTime, progressBar, changeBar, isLoop, audioLoop, changeNextAudio, changePrevAudio, progresVolume, changeVolume, volume, setShowPlaylist}) => {
    
    const [showVolume, setShowVolume] = useState(false)

    const handleLoopAudio = () => {
        audioLoop(true)
    }

    const handleShowVolume = () => {
        setShowVolume(!showVolume)
    }

    return (
        <div className="fixed w-full h-24 md:h-16 px-4 md:px-0 bottom-0 bg-slate-700 rounded-tr-2xl rounded-tl-2xl z-20">           
            <div className="grid grid-cols-2 md:grid-cols-4 h-full content-center">
                <div className="hidden pl-4 md:flex flex-row items-center">
                <div className="w-10 h-10 rounded bg-blue-200 flex items-center justify-center text-blue-500"><SiAudiomack size={20}/></div>
                    <div className="ml-2">
                        <p className="text-sm tracking-tighter">{playingNow.surah}</p>
                        <p className="text-lg font-bold tracking-wide leading-3">{playingNow.reciterName}</p>
                    </div>
                </div>
                <div className="col-span-2 md:col-span-1 flex flex-row justify-center items-center gap-4 mb-2 md:mb-0">
                    <button type='button' onClick={()=>changePrevAudio(playingNow.reciterName)}>
                        <MdSkipPrevious size={30}/>
                    </button>
                    <button type='button' onClick={()=>tooglePlayPause(playingNow.reciterName, playingNow.surah, playingNow.surahId, !isPlaying)}>
                        { isPlaying ? <MdPauseCircleOutline size={45} /> : <MdPlayCircleOutline size={45} /> }
                    </button>
                    <button type='button' onClick={()=>changeNextAudio(playingNow.reciterName)}>
                        <MdSkipNext size={30}/>
                    </button>
                </div>
                <div className="col-span-2 flex flex-row justify-between items-center gap-4">
                    <div className="w-full flex flex-col">
                        <input 
                            type="range" 
                            defaultValue={0}
                            className="range-audio hover:border-none hover:outline-none" 
                            ref={progressBar} 
                            onChange={()=>changeBar()}    
                        />
                        <div className="flex flex-row justify-between">
                            <span className="text-sm">{calculateTime(currentTime)}</span>
                            <span className="text-sm">{isNaN(duration) ? "00:00" : calculateTime(duration)}</span>
                        </div>
                    </div>
                    <div className="md:pr-4 flex flex-row justify-end items-center gap-2 md:gap-4">
                        {
                            isLoop ?
                            <button type='button' onClick={()=>audioLoop(false)}>
                                <MdRepeatOneOn size={25} className="text-zink-100"/>
                            </button>
                            :
                            <button type='button' onClick={handleLoopAudio}>
                                <MdRepeat size={25}/>
                            </button>
                        }
                        <div className='relative'>
                            <button onClick={handleShowVolume}>
                                {
                                    Number(volume) === 0 ?
                                    <MdOutlineVolumeOff size={25} />
                                    :
                                    Number(volume) >= 1 && Number(volume) <= 50  ?
                                    <MdVolumeDown size={25}/>
                                    :
                                    <MdVolumeUp size={25}/>
                                }
                            </button>
                            {
                                showVolume &&
                                <div className='absolute -top-14 -right-7 bg-slate-100 -rotate-90 h-8 w-20 flex p-2 rounded-full'>
                                    <input 
                                        type="range" 
                                        className='range-volume hover:border-none hover:outline-none' 
                                        value={volume}
                                        ref={progresVolume}
                                        onChange={changeVolume}
                                        onBlur={()=>setShowVolume(false)}
                                    />
                                </div>
                            }
                        </div>                                                
                        <button className="md:hidden" onClick={()=>setShowPlaylist(true)}>
                            <MdQueueMusic size={30} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Sound