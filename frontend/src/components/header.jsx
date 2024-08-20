import React, { useState, useRef, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Header = () => {
    const { logout } = useContext(AuthContext);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isNavbarDropdownOpen, setIsNavbarDropdownOpen] = useState(false);
    const [isSidebarDropdownOpen, setIsSidebarDropdownOpen] = useState(false);
    const navbarDropdownRef = useRef(null);
    const sidebarDropdownRef = useRef(null);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const toggleNavbarDropdown = () => {
        setIsNavbarDropdownOpen(prev => !prev);
        setIsSidebarDropdownOpen(false);
    };

    const toggleSidebarDropdown = () => {
        setIsSidebarDropdownOpen(prev => !prev);
        setIsNavbarDropdownOpen(false);
    };

    const handleClickOutside = (event) => {
        if (
            (navbarDropdownRef.current && !navbarDropdownRef.current.contains(event.target)) &&
            (sidebarDropdownRef.current && !sidebarDropdownRef.current.contains(event.target))
        ) {
            setIsNavbarDropdownOpen(false);
            setIsSidebarDropdownOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <header className="font-prompt fixed top-2 left-5 right-5 md:left-20 md:right-20 p-3 px-5 rounded-xl z-50">
            <nav className="text-customGreen font-medium flex items-center justify-between mx-auto">
                <h1 className="font-inter font-extrabold text-4xl md:text-5xl cursor-pointer hover:text-green2 transition-colors">
                    <a href="/home">iCARE</a>
                </h1>
                <p className="block lg:hidden text-customGreen focus:outline-none hover:text-green2 transition-all" onClick={toggleSidebar}>
                    <svg
                        className="w-8 h-8"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                    </svg>
                </p>
                <ul className="hidden lg:flex space-x-8 font-semibold text-xl flex items-center">
                    <li className="cursor-pointer hover:text-green2 transition-colors">
                        <a href="/consultation">Consultation</a>
                    </li>
                    <li className="cursor-pointer hover:text-green2 transition-colors">
                        <a href="/tutorial">Tutorial</a>
                    </li>
                    <li className="cursor-pointer hover:text-green2 transition-colors">
                        <a href="/professors">Professors</a>
                    </li>
                    <li className="relative cursor-pointer bg-customGreen hover:bg-green2 text-customWhite max-w-36 rounded-xl transition-colors">
                        <button className='px-2 py-1 flex items-center space-x-2' onClick={toggleNavbarDropdown}>
                            <span>User</span>
                            <span className="material-symbols-outlined">keyboard_arrow_down</span>
                        </button>
                        {isNavbarDropdownOpen && (
                            <section ref={navbarDropdownRef} className="absolute right-0 mt-2 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 z-20">
                                <ul className="py-2 text-sm text-gray-700">
                                    <li>
                                        <a href="#" className="block px-4 py-2 hover:bg-gray-100">Profile</a>
                                    </li>
                                    <li>
                                        <button onClick={handleLogout} className="block px-4 py-2 w-full text-left hover:bg-gray-100">Logout</button>
                                    </li>
                                </ul>
                            </section>
                        )}
                    </li>
                </ul>
            </nav>

            {/* Sidebar */}
            <nav
                className={`fixed top-0 right-0 h-screen w-full bg-customWhite rounded-xl transform px-5 md:px-20 pt-2 ${isSidebarOpen ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-150 ease-in-out text-customGreen lg:hidden`}
            >
                <section className="flex flex-col h-full">
                    <section className="flex justify-between items-center p-3">
                        <h1 className="font-inter font-extrabold text-4xl md:text-5xl cursor-pointer hover:text-green2 transition-colors">
                            iCARE
                        </h1>
                        <p onClick={toggleSidebar} className="text-customGreen focus:outline-none hover:text-green2 transition-colors px-3">
                            <svg
                                className="w-6 h-6"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                            </svg>
                        </p>
                    </section>
                    <ul className="flex flex-col p-4 font-semibold space-y-5 text-xl">
                        <li className="cursor-pointer hover:text-green2 transition-colors" onClick={toggleSidebar}>
                            <a href="/consultation" className='flex items-center space-x-2'>
                                <span className="material-symbols-outlined">record_voice_over</span>
                                <span>Consultation</span>
                            </a>
                        </li>
                        <li className="cursor-pointer hover:text-green2 transition-colors" onClick={toggleSidebar}>
                            <a href="/tutorial" className='flex items-center space-x-2'>
                                <span className="material-symbols-outlined">menu_book</span>
                                <span>Tutorial</span>
                            </a>
                        </li>
                        <li className="cursor-pointer hover:text-green2 transition-colors" onClick={toggleSidebar}>
                            <a href="/professors" className='flex items-center space-x-2'>
                                <span className="material-symbols-outlined">group</span>
                                <span>Professors</span>
                            </a>
                        </li>
                        <li className="relative cursor-pointer">
                            <button
                                className="flex items-center w-full text-left bg-transparent rounded-lg hover:text-green2 focus:outline-none"
                                onClick={toggleSidebarDropdown}
                            >
                                <span className="material-symbols-outlined">person</span>
                                <span className="ml-2">User</span>
                                <svg
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    className={`ml-2 w-4 h-4 transition-transform duration-200 transform ${isSidebarDropdownOpen ? 'rotate-180' : 'rotate-0'}`}
                                >
                                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                                </svg>
                            </button>
                            {isSidebarDropdownOpen && (
                                <div ref={sidebarDropdownRef} className="absolute right-0 mt-2 bg-white divide-y divide-gray-100 rounded-lg shadow-lg w-full">
                                    <a href="#" className="block px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-200">Profile</a>
                                    <button onClick={handleLogout} className="block px-4 py-2 w-full text-left text-sm font-semibold text-gray-700 hover:bg-gray-200">
                                        Logout
                                    </button>
                                </div>
                            )}
                        </li>
                    </ul>
                </section>
            </nav>
        </header>
    );
};

export default Header;
