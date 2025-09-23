import React from 'react'
import About from '../components/Landing/About'
import Trusted from '../components/Landing/Trusted'
import MobileDownload from '../components/Landing/MobileDownload'
import GetInTouch from '../components/Landing/GetInTouch'
import LoveStories from '../components/Landing/LoveStory'
import Footer from '../components/Footer'
import Start from '../components/Landing/Start'
import Hero from '../components/Landing/Hero'
import Navbar from '../components/Navbar'

const Landing = () => {
    return (
        <div>
            <div className='fixed w-full top-0 z-50'>
                <Navbar />
            </div>
            <Hero />
            <Start />
            <Trusted />
            <About />
            <MobileDownload />
            <GetInTouch />
            <LoveStories />
            <Footer />
        </div>
    )
}

export default Landing