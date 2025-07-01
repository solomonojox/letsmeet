import React, { useEffect, useState } from 'react'
import imageAsset from '../../assets/imageAsset';

const TermsAndCondition = () => {
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
                    <h3 className="font-semibold text-3xl lg:text-4xl mb-1">Terms & Conditions</h3>
                    <p className="text-sm">Last Updated: July, 2025</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 text-sm px-6 lg:px-20 mt-10">
                <div className="space-y-4">
                    <p>
                        Welcome to Let’sMeet (“we,” “our,” or “us”). These Terms and Conditions (“Terms”)
                        govern your access to and use of the Let’sMeet application and services (the
                        “Service”). By accessing or using the Service, you agree to be bound by these Terms.
                    </p>

                    <p>
                        <span className="text-primary font-medium">1. Eligibility</span> <br />
                        <li>You must be at least 18 years old to use Let’sMeet.</li>
                        <li>
                            By using the Service, you represent and warrant that you meet this requirement and
                            have the legal capacity to enter into these Terms.
                        </li>
                    </p>

                    <p>
                        <span className="text-primary font-medium">2. Account Registration</span> <br />
                        You may be required to create an account to access certain features of the Service.
                        You agree to:
                        <li>Provide accurate, current, and complete information during registration.</li>
                        <li>
                            Maintain the security of your account by not sharing your password with others.
                        </li>
                        <li>Notify us immediately of any unauthorized use of your account.</li>
                    </p>

                    <p>
                        <span className="text-primary font-medium">3. Subscription Plans</span> <br />
                        <li>Let’sMeet offers various subscription plans (Free, Basic, Premium).</li>
                        <li>The features and pricing for each plan are described within the app.</li>
                        <li>
                            By subscribing, you authorize us or our payment processors to charge applicable
                            fees.
                        </li>
                    </p>

                    <p>
                        <span className="text-primary font-medium">4. User Conduct</span> <br />
                        You agree to use the Service responsibly and not to:
                        <li>Violate any applicable laws or regulations.</li>
                        <li>Harass, abuse, or harm other users.</li>
                        <li>
                            Upload or share any content that is offensive, obscene, defamatory, or otherwise
                            objectionable.
                        </li>
                        <li>Use the Service for any unauthorized or illegal purpose.</li>
                        <li>Impersonate any person or entity.</li>
                    </p>

                    <p>
                        <span className="text-primary font-medium">5. User Content</span> <br />
                        <li>
                            You are solely responsible for any content you post, upload, or share through the
                            Service.
                        </li>
                        <li>
                            You grant Let’sMeet a non-exclusive, royalty-free, worldwide license to use,
                            display, and distribute your content for the purpose of operating and improving the
                            Service.
                        </li>
                    </p>

                    <p>
                        <span className="text-primary font-medium">6. Privacy</span> <br />
                        <li>
                            Our collection and use of your personal information are governed by our Privacy
                            Policy.
                        </li>
                    </p>

                    <p>
                        <span className="text-primary font-medium">7. Intellectual Property</span> <br />
                        <li>
                            All intellectual property rights in the Service, including trademarks, logos, and
                            software, are owned by Let’sMeet or its licensors.
                        </li>
                        <li>You may not use our intellectual property without prior written consent.</li>
                    </p>

                    <p>
                        <span className="text-primary font-medium">8. Termination</span> <br />
                        <li>
                            We reserve the right to suspend or terminate your access to the Service at our
                            discretion, without notice.
                        </li>
                        <li>
                            Termination may occur if you violate these Terms or engage in any conduct harmful to
                            Let’sMeet or its users.
                        </li>
                    </p>

                    <p>
                        <span className="text-primary font-medium">9. Disclaimers</span> <br />
                        <li>
                            The Service is provided "as is" and "as available" without warranties of any kind.
                        </li>
                        <li>We do not guarantee that the Service will be uninterrupted or error-free.</li>
                    </p>

                    <p>
                        <span className="text-primary font-medium">10. Limitation of Liability</span> <br />
                        <li>
                            To the fullest extent permitted by law, Let’sMeet shall not be liable for any
                            indirect, incidental, special, or consequential damages arising from your use of the
                            Service.
                        </li>
                    </p>

                    <p>
                        <span className="text-primary font-medium">11. Governing Law</span> <br />
                        <li>
                            These Terms are governed by and construed in accordance with the laws of [Insert
                            Jurisdiction].
                        </li>
                        <li>Any disputes shall be resolved in the courts of [Insert Jurisdiction].</li>
                    </p>

                    <p>
                        <span className="text-primary font-medium">12. Changes to Terms</span> <br />
                        <li>We may update these Terms from time to time.</li>
                        <li>We will notify you of any material changes.</li>
                        <li>
                            Continued use of the Service after changes constitutes acceptance of the new Terms.
                        </li>
                    </p>

                    <p>
                        <span className="text-primary font-medium">13. Contact Us</span> <br />
                        For questions or concerns regarding these Terms, please contact us at:
                        <li>Let’sMeet Support Email: support@letmeet.com</li>
                        <li>Address: [Insert physical address if applicable]</li>
                    </p>
                </div>

                <img src={imageAsset.terms} alt="privacy" />
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

export default TermsAndCondition