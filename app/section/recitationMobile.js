import { MdPauseCircleOutline, MdPlayCircleOutline } from "react-icons/md"
import { SiAudiomack } from "react-icons/si"

const RecitationMobile = ({recitations, recitationId, handleSerach, search, resultSearch, listAudio, isPlaying, chapterId, handleChooseAudio, getAudioSurah  }) => {

    return (
            <>
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
            </>
    )
}


export default RecitationMobile