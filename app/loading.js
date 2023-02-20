import React from 'react'

const Loading = () => {
    return (
        <div className='w-full h-screen p-0 m-0'>
            <div className='wrapper'>
                <div className='circle'></div>
                <div className='circle'></div>
                <div className='circle'></div>
                <div className='shadows'></div>
                <div className='shadows'></div>
                <div className='shadows'></div>
                <span>Loading</span>
            </div>
        </div>
    )
}

export default Loading