import React from 'react'
import imageAsset from '../../assets/imageAsset'

const Start = () => {
    return (
        <div className='h-40 bg-primary text-white flex items-center justify-center flex-col relative'>
            <h3 className='font-semibold text-3xl lg:text-4xl mb-1'>Start Your Love Story</h3>
            <p>LetsMeet - Find love with our dataing site</p>

            <img src={imageAsset.extra} alt="people" className='absolute left-4 -top-20 md:-top-16 lg:-top-24 w-44 md:w-72 lg:w-84' />
        </div>
    )
}

export default Start