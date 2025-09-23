import React from 'react'
import imageAsset from '../../assets/imageAsset'

const Hero = () => {
    return (
        <div className='h-screen flex flex-col items-center justify-center text-center relative'
            style={{background: `url(${imageAsset.hero_bg})`, backgroundSize: 'cover'}}
            id='home'
        >
            <div className='bg-[#00000099] inset-0 h-full w-full absolute z-0'></div>
            <div className='space-y-4 text-white z-10'>
                <h3 className='font-semibold text-5xl'>Your someone special is just a click away <br /> Let the right connection find you</h3>
                <p>Dating made simple, genuine, and drama-free. Meet people who are here for the right reasons</p>
                <button className='bg-primary hover:bg-blue-800 transition-colors delay-150 rounded-full px-20 py-2 text-white mt-4'>Get Started</button>
            </div>
        </div>
    )
}

export default Hero