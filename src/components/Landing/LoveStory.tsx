import React from 'react';
import imageAsset from '../../assets/imageAsset';

const LoveStories = () => {
    const stories = [
        {
            id: 1,
            name: "Mabel Sonya",
            age: 31,
            profession: "Model",
            image: imageAsset.lady,
            story: "After just a week of chatting, we knew we had something special. Now we're planning our future together.",
            rating: 5
        },
        {
            id: 2,
            name: "Daniel Coleman",
            age: 35,
            profession: "Software Engineer",
            image: imageAsset.man,
            story: "I never believed dating apps could lead to something real, until I met her here. Thank you, LetsMeet!",
            rating: 5
        }
    ];

    const renderStars = (rating) => {
        return Array.from({ length: 5 }, (_, index) => (
            <svg
                key={index}
                className={`w-5 h-5 ${index < rating ? 'text-yellow-400' : 'text-gray-300'}`}
                fill="currentColor"
                viewBox="0 0 20 20"
            >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
        ));
    };

    return (
        <div className="bg-white py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-8xl mx-auto">
                {/* Header */}
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold text-primary mb-6">
                        Our Love Stories
                    </h2>
                    <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
                        Discover real stories from couples who found love on LetsMeet. Your journey could be the next chapter we celebrate.
                    </p>
                </div>

                {/* Stories Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {stories.map((story) => (
                        <div key={story.id} className="flex flex-col md:flex-row gap-2 bg-gray-50 rounded-2xl hover:shadow-lg transition-shadow duration-300">
                            {/* Profile Image */}
                            <div className="flex-shrink-0">
                                <div className="relative">
                                    <img
                                        src={story.image}
                                        alt={`${story.name} profile`}
                                        className="w-full h-full object-cover rounded-xl"
                                    />
                                </div>
                            </div>

                            {/* Story Content */}
                            <div className="flex-1 space-y-4 relative border-b-4 border-r-4 border-pink-200 rounded-xl p-6">
                                <div>
                                    <h3 className="text-xl font-bold text-gray-900">
                                        {story.name}, {story.age}
                                    </h3>
                                    <p className="text-gray-600 font-medium">{story.profession}</p>
                                </div>

                                <blockquote className="text-gray-700 leading-relaxed italic">
                                    "{story.story}"
                                </blockquote>

                                {/* Star Rating */}
                                <div className="flex items-center space-x-1">
                                    {renderStars(story.rating)}
                                </div>

                                {/* Quote Mark */}
                                <div className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center">
                                    <svg width="30" height="20" viewBox="0 0 30 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M1.45767 19.9992C1.45767 19.5367 1.40726 19.1492 1.48059 18.775C1.51153 18.6158 1.76705 18.445 1.97674 18.3492C2.99311 17.88 4.09657 17.505 5.04419 16.9667C8.11048 15.2234 9.9278 12.9284 10.0275 9.94671C10.055 9.10088 9.62644 8.88838 8.65018 9.21921C5.82795 10.1709 2.79259 9.61254 1.1735 7.84422C-0.592254 5.91423 -0.343604 3.34424 1.77278 1.65925C4.4747 -0.492412 8.92289 -0.557411 11.9903 1.49925C13.8271 2.73091 14.7003 4.3209 14.918 6.13006C15.6479 12.1892 11.469 17.1842 3.86167 19.3783C3.10884 19.595 2.33769 19.7733 1.45767 19.9992Z" fill="#D8D8D8" />
                                        <path d="M16.4577 19.9992C16.4577 19.5367 16.4073 19.1492 16.4806 18.775C16.5115 18.6158 16.7671 18.445 16.9767 18.3492C17.9931 17.88 19.0966 17.505 20.0442 16.9667C23.1105 15.2234 24.9278 12.9284 25.0275 9.94671C25.055 9.10088 24.6264 8.88838 23.6502 9.21921C20.8279 10.1709 17.7926 9.61254 16.1735 7.84422C14.4077 5.91423 14.6564 3.34424 16.7728 1.65925C19.4747 -0.492412 23.9229 -0.557411 26.9903 1.49925C28.8271 2.73091 29.7003 4.3209 29.918 6.13006C30.6479 12.1892 26.469 17.1842 18.8617 19.3783C18.1088 19.595 17.3377 19.7733 16.4577 19.9992Z" fill="#D8D8D8" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Call to Action */}
                <div className="text-center mt-12">
                    <p className="text-lg text-gray-600 mb-6">
                        Ready to write your own love story?
                    </p>
                    <button className="bg-primary hover:bg-blue-800 text-white font-semibold py-4 px-8 rounded-full transition-colors duration-200 shadow-lg hover:shadow-xl">
                        Start Your Journey
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LoveStories;