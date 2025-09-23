import React from 'react';

const About = () => {
    return (
        <div id='about' className='pt-16'>
            <div className="bg-[#F0F1F2] p-4 lg:p-0 " >
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-screen">
                    {/* Image Section */}
                    <div className="relative h-full">
                        <div className="relative overflow-hidden shadow-lg">
                            <img
                                src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2084&q=80"
                                alt="Two people having a genuine conversation outdoors"
                                className="w-full h-screen object-cover"
                            />
                        </div>
                    </div>

                    {/* Content Section */}
                    <div className="space-y-2 px-4">
                        <h2 className="text-4xl font-bold text-gray-900 mb-8">
                            About Us
                        </h2>

                        <div className="space-y-2 text-gray-700 leading-relaxed text-sm">
                            <p>
                                LetsMeet is a modern, location-based social connection platform designed to help people discover, meet, and engage with others nearby for meaningful relationships, conversations, and real-world experiences. Our mission is to bridge the gap between digital interaction and genuine human connection, creating a safe, authentic, and vibrant community where people can connect based on proximity, interests, and mutual intent.
                            </p>

                            <p>
                                Founded with the belief that online platforms should enable real-life human interaction, not replace it, LetsMeet was created to reimagine how people find and connect with others nearby. In a world where social media often leads to virtual isolation, Let's Meet brings people back into the real world, where authentic relationships begin face-to-face.
                            </p>

                            <p>
                                The platform was built by a passionate team of developers, product designers, marketers, and safety experts who understand the challenges and fears people often face with online meetups. Every feature is designed to encourage meaningful engagement while prioritizing user safety, consent, and privacy.
                            </p>

                            <p className="font-semibold text-gray-900">
                                No games. No pressure. Just honest connection, one click at a time.
                            </p>
                        </div>

                        <div className="pt-6">
                            <button className="bg-primary hover:bg-blue-800 text-white font-semibold py-3 px-16 rounded-full transition-colors duration-200 shadow-lg hover:shadow-xl">
                                Get the app now
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;