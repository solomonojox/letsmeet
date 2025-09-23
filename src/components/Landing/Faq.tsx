import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import Navbar from '../Navbar';
import imageAsset from '../../assets/imageAsset';

const FAQ = () => {
    const [openItems, setOpenItems] = useState({});

    const toggleItem = (index) => {
        setOpenItems(prev => ({
            ...prev,
            [index]: !prev[index]
        }));
    };

    return (
        <div className="min-h-screen bg-gray-50 relative">
            <img
                src={imageAsset.curly_back}
                alt="back"
                className='absolute top-10 left-10 z-20 cursor-pointer'
                style={{
                    filter: 'brightness(0) invert(1) opacity(1)'
                }}
                onClick={() => window.history.back()}
            />
            <div className="relative">
                {/* Header Section */}
                <div
                    className="bg-primary text-white text-center pt-16 pb-32 relative overflow-hidden h-[400px] flex flex-col justify-center items-center"
                >
                    <h1 className="text-4xl font-bold mb-4">FAQ's</h1>
                    <p className="text-blue-100 text-lg">
                        Find answers to common questions in our FAQ section
                    </p>

                    {/* SVG Cove Bottom */}
                    <svg
                        className="absolute bottom-0 left-0 w-full"
                        viewBox="0 0 1440 320"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            fill="#fff" // or use "currentColor" for theme-based
                            d="M0,160 C360,320 1080,320 1440,160 L1440,320 L0,320 Z"
                        />
                    </svg>
                </div>
            </div>

            {/* FAQ Content */}
            <div className="relative -mt-24 px-4 pb-16">
                <div className="max-w-4xl mx-auto">
                    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                        {faqData.map((item, index) => (
                            <div key={index} className="border-b border-gray-200 last:border-b-0">
                                <button
                                    onClick={() => toggleItem(index)}
                                    className="w-full px-6 py-5 text-left flex justify-between items-center hover:bg-gray-50 transition-colors duration-200"
                                >
                                    <span className="text-gray-800 font-medium text-base">
                                        {item.question}
                                    </span>
                                    <div className="ml-4 flex-shrink-0">
                                        {openItems[index] ? (
                                            <ChevronUp className="w-5 h-5 text-gray-500" />
                                        ) : (
                                            <ChevronDown className="w-5 h-5 text-gray-500" />
                                        )}
                                    </div>
                                </button>

                                {openItems[index] && (
                                    <div className="px-6 pb-5">
                                        <div className="text-gray-600 leading-relaxed">
                                            {item.answer}
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FAQ;

const faqData = [
    {
        question: "What is LetsMeet?",
        answer: "LetsMeet is a platform designed to help people connect and meet new friends, dates, or networking contacts in their area. Our app uses advanced matching algorithms to pair users based on shared interests, location, and preferences."
    },
    {
        question: "How does LetsMeet work?",
        answer: "Simply create your profile, set your preferences, and start browsing potential matches. You can swipe through profiles, send messages to people you're interested in, and arrange to meet up in person when you're ready."
    },
    {
        question: "Is LetsMeet free to use?",
        answer: "Yes, LetsMeet offers a free tier that includes basic matching and messaging features. However, we also offer premium subscription plans with additional features like unlimited likes, advanced filters, and priority support."
    },
    {
        question: "What subscription plans are available?",
        answer: "We offer several subscription tiers: Basic (free), Premium ($9.99/month), and Premium Plus ($19.99/month). Each plan includes different features and benefits to enhance your LetsMeet experience."
    },
    {
        question: "How do I upgrade my plan?",
        answer: "You can upgrade your plan at any time by going to your account settings and selecting the 'Subscription' option. Choose your preferred plan and complete the payment process to unlock premium features immediately."
    },
    {
        question: "Is my data secure on LetsMeet?",
        answer: "Absolutely. We take data security very seriously and use industry-standard encryption to protect your personal information. Your data is never shared with third parties without your explicit consent, and you have full control over your privacy settings."
    },
    {
        question: "Can I control who sees my profile?",
        answer: "Yes, you have complete control over your profile visibility. You can adjust your privacy settings to control who can see your profile, limit matches by age or location, and block specific users if needed."
    },
    {
        question: "What happens when I reach my match limit?",
        answer: "Free users have a daily limit on the number of profiles they can like or match with. Once you reach this limit, you'll need to wait until the next day to continue matching, or you can upgrade to a premium plan for unlimited matches."
    },
    {
        question: "Can I delete or deactivate my account?",
        answer: "Yes, you can either temporarily deactivate your account (which hides your profile but preserves your data) or permanently delete your account and all associated data. Both options are available in your account settings."
    },
    {
        question: "I didn't receive a verification email. What should I do?",
        answer: "First, check your spam or junk folder. If you still don't see the email, try requesting a new verification email from your account settings. If the problem persists, contact our support team for assistance."
    },
    {
        question: "How do I report a user or inappropriate behavior?",
        answer: "You can report any user or inappropriate content by clicking the report button on their profile or message. Our moderation team reviews all reports promptly and takes appropriate action to maintain a safe community environment."
    },
    {
        question: "How can I contact LetsMeet support?",
        answer: "You can reach our support team through the in-app help center, by emailing support@letsmeet.com, or by using the contact form on our website. We typically respond within 24 hours during business days."
    }
];