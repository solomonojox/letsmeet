import React, { useEffect, useState } from 'react'
import imageAsset from '../../assets/imageAsset';

const CookiePolicy = () => {
    const [showButtons, setShowButtons] = useState(false);
    useEffect(() => {
        // Trigger the animation after a short delay when component mounts
        const timer = setTimeout(() => {
            setShowButtons(true);
        }, 300);

        return () => clearTimeout(timer);
    }, []);

    return (
        <div>
            <div className="sticky top-0 z-50">
                <div className="h-32 bg-primary text-white flex items-left justify-center flex-col relative pl-20">
                    <img
                        src={imageAsset.curly_back}
                        alt="back"
                        className="absolute top-4 left-6 z-20 cursor-pointer w-10"
                        style={{
                            filter: "brightness(0) invert(1) opacity(1)",
                        }}
                        onClick={() => window.history.back()}
                    />
                    <h3 className="font-semibold text-3xl lg:text-4xl mb-1">Cookie Policy</h3>
                    <p className="text-sm">Last Updated: July, 2025</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 text-sm px-6 lg:px-20 mt-10">
                <div className='space-y-4'>
                    <p>
                        Welcome to LetsMeet (the "Platform", "we", "our", or "us"). This Cookie Policy explains how we use cookies and similar technologies when you visit or use our services through our website and mobile application (collectively, the "Services"). By continuing to browse or use our Services, you agree that we can store and access cookies and other tracking technologies as described in this Cookie Policy.
                    </p>

                    <p>
                        <span className="text-primary font-medium">1. What Are Cookies?</span> <br />
                        <li>Cookies are small text files that are stored on your device (computer, mobile phone, or tablet) when you visit a website.</li>
                        <li>They help us remember your preferences and improve your user experience.</li>
                        <li>Cookies can be:
                            <ul className="ml-6 list-disc">
                                <li>Session Cookies: Deleted when you close your browser</li>
                                <li>Persistent Cookies: Remain on your device for a set period or until deleted</li>
                                <li>First-Party Cookies: Set by LetsMeet</li>
                                <li>Third-Party Cookies: Set by services we use, such as analytics or advertising providers</li>
                            </ul>
                        </li>
                    </p>

                    <p>
                        <span className="text-primary font-medium">2. How We Use Cookies</span> <br />
                        We use cookies to:
                        <li>Ensure platform functionality: Log you in, remember preferences, and keep your session secure</li>
                        <li>Enhance performance: Improve speed and responsiveness</li>
                        <li>Analyse usage: Monitor user behaviour and improve services via tools like Google Analytics</li>
                        <li>Personalize content: Show content based on your activity</li>
                        <li>Marketing and advertising: Deliver relevant ads based on your interests and measure the effectiveness of ad campaigns</li>
                    </p>

                    <p>
                        <span className="text-primary font-medium">3. Types of Cookies We Use</span> <br />
                        <div className="grid grid-cols-2 gap-2 max-w-lg">
                            <div className="font-medium">Cookie Type</div>
                            <div className="font-medium">Purpose</div>

                            <div>Strictly Necessary</div>
                            <div>Required for core site functionality, such as login and security</div>

                            <div>Functional</div>
                            <div>Remembers your preferences, such as language and region</div>

                            <div>Performance</div>
                            <div>Helps us understand how users interact with the Platform</div>

                            <div>Targeting/Advertising</div>
                            <div>Delivers ads tailored to you and tracks ad performance</div>
                        </div>
                    </p>

                    <p>
                        <span className="text-primary font-medium">4. Third-Party Cookies</span> <br />
                        <li>We may allow third parties, such as analytics or advertising partners, to place cookies on your device</li>
                        <li>These providers may collect information about your online activities across different websites</li>
                        <li>Some of these partners include (but are not limited to):
                            <ul className="ml-6 list-disc">
                                <li>Google Analytics</li>
                                <li>Facebook Pixel</li>
                                <li>Stripe / Flutterwave (for secure payment handling)</li>
                            </ul>
                        </li>
                        <li>Each of these services has its own privacy and cookie policies</li>
                    </p>

                    <p>
                        <span className="text-primary font-medium">5. Your Choices</span> <br />
                        You have control over cookies. You can:
                        <li>Adjust your browser settings to refuse or delete cookies</li>
                        <li>Use browser plugins or privacy settings to block tracking</li>
                        <li>Opt out of specific third-party cookies (e.g., Google Analytics Opt-Out)</li>
                        <li>Please note that disabling cookies may affect the functionality of the LetsMeet platform</li>
                    </p>

                    <p>
                        <span className="text-primary font-medium">6. Updates to This Policy</span> <br />
                        <li>We may update this Cookie Policy from time to time</li>
                        <li>The "Effective Date" at the top will reflect the latest version</li>
                        <li>We encourage you to review this policy regularly</li>
                    </p>

                    <p>
                        <span className="text-primary font-medium">7. Contact Us</span> <br />
                        If you have any questions or concerns about our use of cookies, please contact us:
                        <li>LetsMeet</li>
                        <li>Email: support@letsmeet.app</li>
                        <li>Website: https://letsmeet.app</li>
                    </p>
                </div>

                <img src={imageAsset.cookie} alt="privacy" />
            </div>

            <div className={`flex gap-4 text-xs p-6 fixed bottom-0 left-0 w-full bg-gray-50 transition-transform duration-500 ease-out ${showButtons ? 'translate-y-0' : 'translate-y-full'}`}>
                <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 px-14 rounded">
                    Decline
                </button>
                <button className="bg-primary hover:bg-blue-800 text-white py-2 px-14 lg:px-24 rounded">
                    Accept all
                </button>
            </div>
        </div>
    );
}

export default CookiePolicy