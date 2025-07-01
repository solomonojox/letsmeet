import React from 'react';

const Trusted = () => {
    return (
        <div className="bg-white py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-3xl font-bold text-blue-900 mb-4">
                        The No.1 Trusted Dating Site
                    </h2>
                </div>

                {/* Features Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Smart Matchmaking Algorithm */}
                    <div className="bg-white rounded-2xl p-8 shadow-lg border-2 border-pink-200 hover:shadow-xl transition-shadow duration-300">
                        <div className="text-center mb-6">
                            <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg width="44" height="45" viewBox="0 0 44 45" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M22.0344 0C17.3365 0 13.5437 3.09106 13.5437 6.92606C13.5437 9.09831 14.4604 10.1192 15.4688 11.4426C16.1448 12.3217 16.8438 13.3426 17.2448 14.8078H26.7552C27.1562 13.3048 27.8552 12.2744 28.5312 11.3859C29.551 10.053 30.4562 9.05105 30.4562 6.92606C30.4562 3.09106 26.6979 0 22.0344 0ZM5.75208 0.727865L1.94792 1.46046L11.2521 5.2652L5.75208 0.727865ZM38.2479 0.727865L32.7479 5.2652L42.0521 1.46046L38.2479 0.727865ZM16.7865 5.60078L22 7.74656L27.2135 5.60078L24.8302 13.4466L22.8365 13.0307L24.1198 8.77691L22 9.65602L19.8802 8.77691L21.1635 13.0307L19.1698 13.4466L16.7865 5.60078ZM0 7.19168V10.2232L11 8.70129L0 7.19168ZM44 7.19168L33 8.70129L44 10.2137V7.19168ZM30.9604 11.7545L35.5323 17.7382L38.2938 16.2919L30.9604 11.7545ZM13.0396 11.764L5.70625 16.3013L8.46771 17.7476L13.0396 11.764ZM17.4167 16.169V17.6814H26.5833V16.169H17.4167ZM21.3583 18.8441C19.7885 18.8441 18.276 18.8914 17.2677 18.9387C9.45312 19.9501 7.76875 28.9019 9.625 37.0502H12.3292L12.2146 27.087L14.3458 27.0681C14.1854 33.0895 14.5292 39.0353 14.976 45H20.8656V35.0084H23.0083V45H28.7833C29.299 38.8557 29.4594 32.5696 29.5281 27.0681L31.6708 27.087L31.5448 37.0502H34.3635C36.4604 28.6845 33.8135 20.1392 26.675 19.0332C25.5979 18.9009 23.8219 18.8441 22.0229 18.8441H21.3583Z" fill="#01008A" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-4">
                                Smart Matchmaking Algorithm
                            </h3>
                        </div>
                        <p className="text-gray-600 text-center leading-relaxed">
                            Our intelligent matching system uses your preferences, interests, and behavior to connect you with compatible people, so you spend less time searching and more time connecting
                        </p>
                    </div>

                    {/* Secure & Real-Time Messaging */}
                    <div className="bg-white rounded-2xl p-8 shadow-lg border-2 border-pink-200 hover:shadow-xl transition-shadow duration-300">
                        <div className="text-center mb-6">
                            <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg width="46" height="45" viewBox="0 0 46 45" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M10.5238 36.9231L0.5 45V2.30769C0.5 1.69565 0.737053 1.10868 1.15901 0.675907C1.58097 0.243131 2.15326 0 2.75 0H43.25C43.8467 0 44.419 0.243131 44.841 0.675907C45.2629 1.10868 45.5 1.69565 45.5 2.30769V34.6154C45.5 35.2274 45.2629 35.8144 44.841 36.2472C44.419 36.6799 43.8467 36.9231 43.25 36.9231H10.5238ZM11.75 16.1538V20.7692H16.25V16.1538H11.75ZM20.75 16.1538V20.7692H25.25V16.1538H20.75ZM29.75 16.1538V20.7692H34.25V16.1538H29.75Z" fill="#01008A" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-4">
                                Secure & Real-Time Messaging
                            </h3>
                        </div>
                        <p className="text-gray-600 text-center leading-relaxed">
                            Chat instantly in a private, safe space. Our messaging is built for real conversations—with features like read receipts, voice notes, and photo sharing to help you express yourself better.
                        </p>
                    </div>

                    {/* Verified Profiles & Safety First */}
                    <div className="bg-white rounded-2xl p-8 shadow-lg border-2 border-pink-200 hover:shadow-xl transition-shadow duration-300">
                        <div className="text-center mb-6">
                            <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg width="46" height="45" viewBox="0 0 46 45" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" clipRule="evenodd" d="M21.245 0.28717C22.2316 -0.0471641 23.3095 -0.0907504 24.325 0.162628L24.755 0.28717L42.255 6.23123C43.1423 6.53259 43.9168 7.05616 44.4882 7.74091C45.0597 8.42566 45.4045 9.24339 45.4825 10.0988L45.5 10.4724V22.6164C45.4999 26.2857 44.4061 29.8869 42.334 33.0399C40.2619 36.1929 37.2885 38.7807 33.7275 40.5301L33.0625 40.8449L24.6775 44.6423C24.2158 44.8511 23.7115 44.9713 23.1962 44.9955C22.6808 45.0196 22.1655 44.9472 21.6825 44.7827L21.3225 44.6423L12.9375 40.8449C9.31403 39.2038 6.24694 36.7071 4.06001 33.6183C1.87308 30.5295 0.647451 26.9631 0.5125 23.2958L0.5 22.6164V10.4724C0.500015 9.61453 0.769067 8.77427 1.27583 8.04947C1.7826 7.32468 2.50624 6.74517 3.3625 6.37841L3.745 6.23123L21.245 0.28717ZM31.5825 14.8563L20.0875 25.268L15.6675 21.2646C15.1984 20.84 14.5623 20.6016 13.8991 20.6018C13.2359 20.602 12.6 20.8408 12.1313 21.2657C11.6625 21.6906 11.3993 22.2668 11.3995 22.8675C11.3997 23.4681 11.6634 24.0441 12.1325 24.4687L18.1425 29.9123C18.3979 30.1438 18.7011 30.3273 19.0348 30.4526C19.3686 30.5778 19.7263 30.6423 20.0875 30.6423C20.4487 30.6423 20.8064 30.5778 21.1402 30.4526C21.4739 30.3273 21.7771 30.1438 22.0325 29.9123L35.1175 18.0582C35.3563 17.8493 35.5467 17.5994 35.6778 17.3232C35.8088 17.0469 35.8777 16.7498 35.8806 16.4491C35.8835 16.1484 35.8203 15.8503 35.6946 15.572C35.5689 15.2937 35.3832 15.0409 35.1485 14.8283C34.9138 14.6157 34.6346 14.4475 34.3274 14.3337C34.0201 14.2198 33.6909 14.1625 33.359 14.1651C33.027 14.1677 32.699 14.2302 32.394 14.3489C32.089 14.4676 31.8131 14.6401 31.5825 14.8563Z" fill="#01008A" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-4">
                                Verified Profiles & Safety First
                            </h3>
                        </div>
                        <p className="text-gray-600 text-center leading-relaxed">
                            Every profile goes through verification checks, and built-in safety tools let you report or block unwanted behavior. Your comfort and trust come first.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Trusted;