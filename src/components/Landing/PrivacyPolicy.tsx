import React from 'react'
import imageAsset from '../../assets/imageAsset';

const PrivacyPolicy = () => {
    return (
        <div>
            <div className='sticky top-0 z-50'>
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
                    <h3 className="font-semibold text-4xl mb-1">Privacy Policy</h3>
                    <p className="text-sm">Last Updated: July, 2025</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 text-sm px-6 lg:px-20 mt-10">
                <div className='space-y-4'>
                    <p>
                        Thank you for choosing Let’Meet (“we”, “our”, “us”). Your privacy is important to us.
                        This Privacy Policy explains how we collect, use, store, share, and protect your
                        personal information when you use Let’Meet (the “Service”). By using Let’Meet, you
                        agree to the terms of this Privacy Policy. If you do not agree, please do not use the
                        Service.
                    </p>

                    <p>
                        <span className="text-primary font-medium">1. Information We Collect</span> <br />
                        a. Information You Provide
                        <li>
                            Account Information: Name, email address, phone number, profile photo, gender, date
                            of birth, and other profile details.
                        </li>
                        <li>
                            Subscription Information: Plan type (Free, Basic, Premium), payment information,
                            billing details.
                        </li>
                        <li>
                            Communications: Messages, chats, and other communications between you and other
                            users.
                        </li>
                        <li>
                            Feedback & Support Requests: Information you provide when contacting our support
                            team.
                        </li>
                    </p>
                    <p>
                        b. Information We Collect Automatically
                        <li>
                            Device Information: Device type, operating system, unique device identifiers, IP
                            address.
                        </li>
                        <li>
                            Usage Data: Pages visited, features used, time and date of usage, interaction with
                            other users.
                        </li>
                        <li>
                            Location Data: Approximate or precise location information if you permit location
                            access.
                        </li>
                        <li>Log Information: Access times, pages viewed, app crashes, and technical logs.</li>
                    </p>
                    <p>
                        c. Information from Third Parties
                        <li>
                            Third-Party Services: We may collect information from external services you link to
                            Let’Meet (e.g. social media logins, payment).
                        </li>
                    </p>

                    <p>
                        <span className="text-primary font-medium">2. How We Use Your Information</span> <br />
                        We use the information collected to:
                        <li>Provide and operate the Let’Meet app and its features.</li>
                        <li>Facilitate user matching based on preferences, proximity, and profile data.</li>
                        <li>Manage your subscription and process payments.</li>
                        <li>Personalize your experience.</li>
                        <li>Communicate with you, including sending service updates, promotions, and notifications.</li>
                        <li>Improve, maintain, and troubleshoot the app.</li>
                        <li>Enforce our Terms of Service and prevent fraud or abuse.</li>
                    </p>

                    <p>
                        <span className="text-primary font-medium">3. Sharing of Information</span> <br />
                        We do not sell your personal data. We may share your information in the following limited situations:
                        <li>With Other Users: Certain profile information (e.g. name, profile picture, location, interests) is shared with other users for matching.</li>
                        <li>Service Providers: Third-party companies that help us operate Let’Meet, such as payment processors, hosting providers, analytics providers, and customer support tools.</li>
                        <li>Legal Obligations: If required by law, legal process, or governmental request.</li>
                        <li>Business Transfers: In connection with a merger, acquisition, reorganization, or sale of assets.</li>
                    </p>

                    <p>
                        <span className="text-primary font-medium">4. Data Retention</span> <br />
                        We retain your personal data:
                        <li>For as long as your account is active or as needed to provide you with our services.</li>
                        <li>You may request deletion of your data at any time, subject to legal and regulatory requirements.</li>
                    </p>

                    <p>
                        <span className="text-primary font-medium">5. Security</span> <br />
                        We implement:
                        <li>Technical and organizational measures to protect your information.</li>
                        <li>While we strive to protect your personal data, no system is 100% secure, and we cannot guarantee absolute security.</li>
                    </p>

                    <p>
                        <span className="text-primary font-medium">6. Your Rights and Choices</span> <br />
                        Depending on your jurisdiction, you may have rights to:
                        <li>Access your personal information.</li>
                        <li>Request correction or deletion of your data.</li>
                        <li>Object to certain processing.</li>
                        <li>Withdraw consent where processing is based on consent.</li>
                        <li>Request data portability.</li>
                        <li>Please contact us to exercise your rights.</li>
                    </p>

                    <p>
                        <span className="text-primary font-medium">7. Children's Privacy</span> <br />
                        <li>Let'Meet is not intended for individuals under the age of 18.</li>
                        <li>We do not knowingly collect personal information from children under 18.</li>
                        <li>If you believe a child has provided us with personal information, please contact us.</li>
                    </p>

                    <p>
                        <span className="text-primary font-medium">8. International Data Transfers</span> <br />
                        <li>Your information may be stored and processed in countries other than where you reside.</li>
                        <li>We take appropriate safeguards to protect your personal data in accordance with applicable law.</li>
                    </p>

                    <p>
                        <span className="text-primary font-medium">9. Changes to This Policy</span> <br />
                        <li>We may update this Privacy Policy from time to time.</li>
                        <li>We will notify you of significant changes by posting the updated policy in the app or by other means.</li>
                    </p>

                    <p>
                        <span className="text-primary font-medium">10. Contact Us</span> <br />
                        If you have any questions about this Privacy Policy, please contact us at:
                        <li>Let'Meet Support Email: support@let-meet.com</li>
                        <li>Address: [Insert physical address if applicable]</li>
                    </p>
                </div>

                <img src={imageAsset.privacy} alt="privacy" />
            </div>
        </div>
    );
}

export default PrivacyPolicy