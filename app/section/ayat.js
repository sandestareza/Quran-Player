import { useEffect } from "react";

const Ayat = ({listAyat}) => {

    const scrollToPlaylist = () => {
        let element = document.querySelector('#endplaylist');
        element.scrollIntoView({behavior: 'smooth'})
        console.log('msuk');
    }

    //   useEffect(() => {
    //     scrollToPlaylist()
      
    //   }, [])
      
    return (
        <div className="col-span-3 md:col-span-2 md:mr-2">
            <div className="w-full h-full">
                <div className="max-h-[630px] overflow-auto p-10 bg-player">
               
                    {
                        listAyat.map(value => (
                            <div key={value.number.inSurah} className="flex flex-col justify-center text-center my-5">
                                <h1 className="font-extrabold text-3xl text-blue-200">{value.arab}</h1>
                                <h2 className="font-light text-md">{value.number.inSurah}. {value.translation}</h2>
                            </div>                    
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default Ayat