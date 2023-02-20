
import Player from "./section/player"

const BASE_URL = 'https://api.quran.com/api/v4'

const getListReciter = async () => {

	try {
		
		const response = await fetch(BASE_URL+'/resources/recitations?language=id')
		return await response.json()
		
	} catch (error) {
		console.log(error)
	}

}

const getListSurah = async () => {

	try {

		const response = await fetch(BASE_URL+'/chapters?language=id')
		return await response.json()
		
	} catch (error) {
		console.log(error)
	}
	
}

export default async function Home() {

	const { recitations } = await getListReciter()
	const { chapters } = await getListSurah()

	return <Player 
				recitations={recitations}
				chapters={chapters}
			/>
}
