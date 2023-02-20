'use client'

import useDebounce from '@/hooks/useDebounce';
import { forwardRef, useEffect, useImperativeHandle, useState } from 'react'
import { MdClose, MdPauseCircleOutline, MdPlayCircleOutline, MdReorder } from 'react-icons/md'
import {SiAudiomack} from 'react-icons/si';
import RecitationMobile from './recitationMobile';

const Recitation = forwardRef(({recitations, chapters, audioPlayer, tooglePlayPause, isPlaying, showPlaylist, setShowPlaylist}, ref) => {
    
    const [listAudio, setListAudio] = useState([])
    const [recitationId, setRecitationId] = useState(null)
    const [chapterId, setChapterId] = useState(null)
    const [search, setSearch] = useState("")
    const [resultSearch, setResultSearch] = useState([])

    useEffect(() => {
        getAudioSurah(recitations[0].id)        
    }, [])
    

    useImperativeHandle(
        ref,
        () => {
            return {
                nextAudio(url, reciterName){
                    const index = listAudio.findIndex(val=> val?.audio_url === url)
                    
                    if (index === listAudio?.length - 1) {  
                        handleChooseAudio(listAudio[0]?.audio_url, listAudio[0]?.chapter_id, reciterName, listAudio[0]?.name_simple)        
                    } else {
                        handleChooseAudio(listAudio[index + 1]?.audio_url, listAudio[index + 1]?.chapter_id, reciterName, listAudio[index + 1]?.name_simple) 
                    }
                },
                prevAudio(url, reciterName){
                    const index = listAudio.findIndex(val=> val?.audio_url === url)
                    
                    if (index === 0) {  
                        handleChooseAudio(listAudio[listAudio.length - 1]?.audio_url, listAudio[listAudio.length - 1]?.chapter_id, reciterName, listAudio[listAudio.length - 1]?.name_simple)        
                    } else {
                        handleChooseAudio(listAudio[index - 1]?.audio_url, listAudio[index - 1]?.chapter_id, reciterName, listAudio[index - 1]?.name_simple) 
                    }
                }
            }
        },
        [listAudio],
    )

    const getAudioSurah = async (id) => {

        const BASE_URL = 'https://api.quran.com/api/v4'
        
        try {

            const response = await fetch(BASE_URL+'/chapter_recitations/'+id+'?language=id')
            const { audio_files } =  await response.json()

            const result = audio_files.map((audiofile, index) => {
                let gabungArray = {
                        ...audiofile,
                        name_simple : chapters[index]?.name_simple,
                        verses_count : chapters[index]?.verses_count,
                    }
                
                return gabungArray
                
            })

            setListAudio(result)
            setRecitationId(id)
            
        } catch (error) {
            console.log(error.message)
        }

        
    }

    const handleChooseAudio = (audio, chapterid, reciterName, surah) => {

        audioPlayer.current.src = audio
        setChapterId(chapterid)
        tooglePlayPause(reciterName, surah, chapterid, true)
    }

    const deb = useDebounce(search, 500)

    const handleSerach = event => {

        setSearch(event.target.value)
    }

    useEffect(() => {
      
        const query = listAudio.filter((val)=>val.name_simple.toLowerCase().indexOf(deb) > -1)
        
        setResultSearch(query)
      
    }, [deb])
    
    
    const Header = () => (
        <div className="flex flex-row items-center justify-between px-3 h-10 border-b-2 my-2">
            <div className="flex flex-row items-center gap-2">
                {/* {
                    showPlaylist &&
                    <button>
                        <MdReorder size={30} />
                    </button>
                } */}
                <h6 className="font-bold text-2xl">Quran Player</h6>
            </div>
            <div>
                {
                    showPlaylist ? 
                    <button onClick={()=>setShowPlaylist(false)} >
                        <MdClose size={30} /> 
                    </button>
                    : 
                    // <button>
                    //     <MdReorder size={30} />
                    // </button>      
                    null          
                }
            </div>
        </div>
    )
    
    

    if (showPlaylist) {
        return (
            <div className='absolute top-0 left-0 h-full w-full z-10 bg-slate-900'>
                <Header />
                <RecitationMobile
                    recitations={recitations}
                    recitationId={recitationId}
                    handleSerach={(event)=> handleSerach(event)}
                    search={search}
                    resultSearch={resultSearch}
                    listAudio={listAudio}
                    isPlaying={isPlaying}
                    chapterId={chapterId}
                    handleChooseAudio={(audio, chapterid, reciterName, surah)=>handleChooseAudio(audio, chapterid, reciterName, surah)}
                    getAudioSurah={(recitationId)=>getAudioSurah(recitationId)}
                />
            </div>
        )
    }


    return (
        <div className="hidden md:flex flex-col gap-y-3 bg-slate-900">
            <Header />
            {/* <Playlist /> */}
            <div className="pl-3 font-bold tracking-wider">
                Recitations
            </div>
            <div className="flex flex-col justify-between items-center max-h-[500px] overflow-auto">
                {
                    recitations.map((recitation, i) => {
                        
                        if (i <= 10 && (recitation.style === "Murattal" || recitation.style === null)) {                    
    
                            return (
                                <div key={recitation.id} className="p-3 w-full">
                                    <div 
                                        className={`flex flex-row items-center hover:bg-blue-500 hover:rounded hover:cursor-pointer ${(recitationId === recitation.id) ? 'selected' : ''}`} 
                                        onClick={()=>getAudioSurah(recitation.id)}
                                    >
                                        <div className="w-10 h-10 rounded bg-blue-200 flex items-center justify-center text-blue-500"><SiAudiomack size={20}/></div>
                                        <div className="ml-2">
                                            <p className="text-lg font-bold tracking-wide leading-3">{recitation.reciter_name}</p>
                                        </div>
                                    </div>
                                    
                                    {
                                        (recitationId === recitation.id) ?
                                            <>
                                                
                                                <input 
                                                    type="search" 
                                                    className='mt-4 w-full rounded text-blue-500 text-sm focus:outline-blue-500 p-2 border-none placeholder:text-blue-200' 
                                                    placeholder='Search surah' 
                                                    onChange={handleSerach}
                                                    value={search}
                                                />
                                    
                                                <ul className="w-full flex flex-col max-h-96 overflow-auto mt-2 h">
                                                    {
                                                        resultSearch.length ?
                                                            resultSearch.map((value, idx) => {
                                                                if (idx <= 113) {
                                                                    return (
                                                                        <li key={value.id} 
                                                                            className={`inline-flex items-center py-2 px-8 text-sm font-medium hover:border hover:border-blue-500 hover:rounded hover:cursor-pointer text-zink-100 -mt-px ${ isPlaying && (chapterId === value.chapter_id) ? 'selected' : '' }`}
                                                                            onClick={()=>handleChooseAudio(value.audio_url, value.chapter_id, recitation.reciter_name, value.name_simple)}
                                                                        >
                                                                            <div className="flex items-center justify-between w-full">
                                                                                {value.name_simple} - {value.verses_count} ayat
                                                                                {  isPlaying && (chapterId === value.chapter_id) ? <MdPauseCircleOutline size={25} /> : <MdPlayCircleOutline size={25} /> }
                                                                            </div>
                                                                        </li>
                                                                    )
                                                                }
                                                            })
                                                            :
                                                            listAudio.map((value, idx) => {
                                                                if (idx <= 113) {
                                                                    return (
                                                                        <li key={value.id} 
                                                                            className={`inline-flex items-center py-2 px-8 text-sm font-medium hover:border hover:border-blue-500 hover:rounded hover:cursor-pointer text-zink-100 -mt-px ${ isPlaying && (chapterId === value.chapter_id) ? 'selected' : '' }`}
                                                                            onClick={()=>handleChooseAudio(value.audio_url, value.chapter_id, recitation.reciter_name, value.name_simple)}
                                                                        >
                                                                            <div className="flex items-center justify-between w-full">
                                                                                {value.name_simple} - {value.verses_count} ayat
                                                                                {  isPlaying && (chapterId === value.chapter_id) ? <MdPauseCircleOutline size={25} /> : <MdPlayCircleOutline size={25} /> }
                                                                            </div>
                                                                        </li>
                                                                    )
                                                                }
                                                            })
                                                    }
                                                </ul>
                                            </>
                                        :
                                        ""
                                    }
                                </div>
                            
                            )                            
                        }
                    })
                }
            </div>
        </div>	
    )
})

export default Recitation