/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react';
import { Clock, Mail, Send, Github, Linkedin, Twitter } from 'lucide-react';
import imageAsset from '../assets/imageAsset';
import { Link } from 'react-router-dom'

export default function UnderConstructionPage() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [countdown, setCountdown] = useState({
    days: 30,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  // Simulate countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else if (prev.days > 0) {
          return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, you would send this to your backend
    console.log('Notify email:', email);
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
    setEmail('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary to-purple-800 flex flex-col items-center justify-center p-4 text-white">
      {/* Floating particles in background */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute bg-white bg-opacity-20 rounded-full"
            style={{
              width: Math.random() * 10 + 5 + 'px',
              height: Math.random() * 10 + 5 + 'px',
              top: Math.random() * 100 + '%',
              left: Math.random() * 100 + '%',
              animation: `float ${Math.random() * 10 + 10}s linear infinite`
            }}
          />
        ))}
        <style jsx>{`
          @keyframes float {
            0% { transform: translateY(0) rotate(0deg); opacity: 0; }
            10% { opacity: 1; }
            90% { opacity: 1; }
            100% { transform: translateY(-100vh) rotate(360deg); opacity: 0; }
          }
        `}</style>
      </div>

      {/* Content Container */}
      <div className="relative z-10 max-w-4xl w-full">
        {/* Logo Placeholder */}
        <div className="flex justify-center mb-8">
          <div className="text-3xl font-bold p-2 border-2 border-white bg-white rounded-lg">
            <img src={imageAsset.logo} alt="logo" className='w-20' />
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-[#ffffff33] bg-opacity-10 backdrop-blur-lg rounded-xl p-8 shadow-2xl border border-white border-opacity-20">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-4">
            Coming Soon
          </h1>

          <p className="text-lg md:text-xl text-center text-gray-200 mb-8">
            {/* We're working hard to bring you something amazing. Our website is under construction. */}
            This page is under construction. We're working hard to bring you something amazing.
          </p>

          {/* Countdown Timer */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10 max-w-2xl mx-auto">
            {[
              { label: 'Days', value: countdown.days },
              { label: 'Hours', value: countdown.hours },
              { label: 'Minutes', value: countdown.minutes },
              { label: 'Seconds', value: countdown.seconds }
            ].map((item) => (
              <div key={item.label} className="bg-[#ffffff44] bg-opacity-10 rounded-lg p-4 text-center">
                <div className="text-3xl md:text-4xl font-bold">{String(item.value).padStart(2, '0')}</div>
                <div className="text-sm text-gray-300">{item.label}</div>
              </div>
            ))}
          </div>

          {/* Notification Form */}
          {/* <div className="max-w-md mx-auto mb-8">
            <h3 className="text-xl font-semibold mb-3 text-center">
              Get notified when we launch
            </h3>
            
            <div className="flex flex-col md:flex-row gap-2">
              <div className="relative flex-grow">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-300" size={20} />
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full py-3 pl-10 pr-3 bg-white bg-opacity-10 border border-white border-opacity-20 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
                />
              </div>
              <button 
                onClick={handleSubmit}
                className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 py-3 px-6 rounded-lg font-medium flex items-center justify-center transition-all duration-300"
              >
                <span>Notify Me</span>
                <Send size={16} className="ml-2" />
              </button>
            </div>
            
            {submitted && (
              <div className="mt-2 text-center text-green-300">
                Thanks! We'll notify you when we launch.
              </div>
            )}
          </div> */}

          {/* Progress Bar */}
          <div className="max-w-md mx-auto mb-8">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm">Our progress</span>
              <span className="text-sm font-medium">75%</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2.5">
              <div className="bg-gradient-to-r from-blue-500 to-indigo-400 h-2.5 rounded-full w-3/4"></div>
            </div>

            {/* <Link to='/' className="block text-center mt-4 text-gray-300 hover:text-white hover:underline underline-offset-4 transition-colors">
              Back to Home
            </Link> */}
          </div>

          {/* Social Links */}
          {/* <div className="flex justify-center space-x-6">
            <a href="#" className="hover:text-purple-300 transition-colors">
              <Github size={24} />
            </a>
            <a href="#" className="hover:text-purple-300 transition-colors">
              <Linkedin size={24} />
            </a>
            <a href="#" className="hover:text-purple-300 transition-colors">
              <Twitter size={24} />
            </a>
            <a href="#" className="hover:text-purple-300 transition-colors">
              <Mail size={24} />
            </a>
          </div> */}
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-sm text-gray-300">
          &copy; {new Date().getFullYear()} LetsMeet. All rights reserved.
        </div>
      </div>
    </div>
  );
}