export const calculateTime = (secs) => {

    const hours = Math.floor(secs / 3600)

    const resultHour = hours < 10 ? `0${hours}` : hours
    
    const minutes = Math.floor((secs % 3600) / 60)

    const resultMinute = minutes < 10 ? `0${minutes}` : minutes

    const seconds = Math.floor((secs % 3600) % 60)

    const resultSecond = seconds < 10 ? `0${seconds}` : seconds
    
    return `${resultHour === "00" ? '' : resultHour+':'}${resultMinute}:${resultSecond}`

}