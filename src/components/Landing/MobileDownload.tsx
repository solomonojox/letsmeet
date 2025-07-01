import React from 'react';
import imageAsset from '../../assets/imageAsset';

const MobileDownload = () => {
  return (
    <div className="bg-gray-50 py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Content Section - Now comes first on mobile */}
          <div className="space-y-6 md:space-y-8">
            <div className="text-center lg:text-left">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-blue-900 mb-4 md:mb-6 relative inline-block">
                Over 10,000 Downloads
                <img 
                  src={imageAsset.underline} 
                  alt="underline decoration" 
                  className='absolute left-16 lg:left-30 -bottom-1 w-1/3'
                />
              </h2>
              <p className="text-base sm:text-lg text-gray-700 leading-relaxed mt-4">
                Join our mobile community and meet thousands of people.
                <br className="hidden sm:block" />
                Download the <span className="text-blue-600 font-semibold">LetsMeet</span> Mobile App today!
              </p>
            </div>

            {/* Download Buttons */}
            <div className="flex md:gap-4 justify-center lg:justify-start">
              <a
                href="#"
                className="inline-flex items-center transition-transform duration-200 hover:scale-105"
              >
                <img 
                  src={imageAsset.play} 
                  alt="Get on Google Play" 
                  className="w-40 sm:w-44 md:w-48 h-auto"
                />
              </a>

              <a
                href="#"
                className="inline-flex items-center transition-transform duration-200 hover:scale-105"
              >
                <img 
                  src={imageAsset.ios} 
                  alt="Download on the App Store" 
                  className="w-40 sm:w-44 md:w-48 h-auto"
                />
              </a>
            </div>
          </div>

          {/* Mobile Phone Mockup - Comes after content on mobile */}
          <div className="relative flex justify-center mt-8 lg:mt-0">
            <img 
              src={imageAsset.mobile} 
              alt="LetsMeet mobile app" 
              className="w-3/4 sm:w-2/3 md:w-1/2 lg:w-full max-w-md mx-auto"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileDownload;