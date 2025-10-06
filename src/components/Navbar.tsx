import React, { useState, useEffect } from 'react';
import imageAsset from '../assets/imageAsset';
import { FiMenu, FiX } from 'react-icons/fi';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const navItems = [
        { id: 1, href: '#home', name: 'Home' },
        { id: 2, href: '#about', name: 'About Us' },
        { id: 3, href: '#contact', name: 'Contact Us' },
    ];

    const handleClick = (e: any, href: any) => {
        e.preventDefault();
        setMobileMenuOpen(false);
        const element = document.querySelector(href);
        if (element) {
            element.scrollIntoView({
                behavior: 'smooth'
            });
        }
    };

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 20) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav
            className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-sm' : 'bg-transparent'
                }`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <div className="flex-shrink-0">
                        <a
                            href="#home"
                            className="flex items-center"
                            onClick={(e) => handleClick(e, '#home')}
                        >
                            <img
                                src={imageAsset.logo}
                                alt="Logo"
                                className="w-12"
                            />
                        </a>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:block">
                        <div className="ml-10 flex items-center space-x-4">
                            {navItems.map((item) => (
                                <a
                                    key={item.id}
                                    href={item.href}
                                    onClick={(e) => handleClick(e, item.href)}
                                    className={`px-3 py-2 rounded-md text-sm font-medium ${isScrolled
                                        ? 'text-gray-900 hover:bg-gray-100'
                                        : 'text-white hover:bg-gray-500'
                                        }`}
                                >
                                    {item.name}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden flex items-center">
                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="inline-flex items-center justify-center p-2 rounded-md focus:outline-none"
                            aria-expanded="false"
                        >
                            <span className="sr-only">Open main menu</span>
                            {mobileMenuOpen ? (
                                <FiX className={`h-6 w-6 ${isScrolled ? 'text-gray-900' : 'text-white'}`} />
                            ) : (
                                <FiMenu className={`h-6 w-6 ${isScrolled ? 'text-gray-900' : 'text-white'}`} />
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Navigation */}
            <div
                className={`md:hidden fixed inset-y-0 right-0 w-64 bg-white shadow-lg transform ${mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
                    } transition-transform duration-300 ease-in-out z-50`}
            >
                <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                    {navItems.map((item) => (
                        <a
                            key={item.id}
                            href={item.href}
                            className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:bg-gray-100"
                            onClick={(e) => handleClick(e, item.href)}
                        >
                            {item.name}
                        </a>
                    ))}
                </div>
            </div>

            {/* Overlay when mobile menu is open */}
            {mobileMenuOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
                    onClick={() => setMobileMenuOpen(false)}
                />
            )}
        </nav>
    );
};

export default Navbar;