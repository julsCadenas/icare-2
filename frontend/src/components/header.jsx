import React, { useState, useRef, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import setStatus from '../utils/setStatus';

const Header = () => {
    const { user, logout } = useContext(AuthContext); // fetches logout function and user data from authContext 
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isNavbarDropdownOpen, setIsNavbarDropdownOpen] = useState(false);
    const [isSidebarDropdownOpen, setIsSidebarDropdownOpen] = useState(false);
    const navbarDropdownRef = useRef(null);
    const sidebarDropdownRef = useRef(null);
    const navigate = useNavigate();

    // logout function
    const handleLogout = async () => {
        logout();

        const userData = user;
        // Update status to offline
        await setStatus(userData, 'Offline');

        navigate('/login');
    };

    // sidebar function
    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    // dropdown function
    const toggleNavbarDropdown = () => {
        setIsNavbarDropdownOpen(prev => !prev);
        setIsSidebarDropdownOpen(false); // to prevent opening of dropdown from sidebar
    };

    // second dropdown on sidebar function
    const toggleSidebarDropdown = () => {
        setIsSidebarDropdownOpen(prev => !prev);
        setIsNavbarDropdownOpen(false); // to prevent opening of dropdown from navbar
    };

    // close dropdown when mouse is clicked outside
    const handleClickOutside = (event) => {
        if (
            (navbarDropdownRef.current && !navbarDropdownRef.current.contains(event.target)) &&
            (sidebarDropdownRef.current && !sidebarDropdownRef.current.contains(event.target))
        ) {
            setIsNavbarDropdownOpen(false);
            setIsSidebarDropdownOpen(false);
        }
    };

    // executes the closing of dropdowns on mouse click
    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <header className="font-prompt fixed top-0 left-0 w-full p-3 px-10 md:px-20 rounded-xl z-50 bg-customWhite">

            {/* MAIN NAVBAR SECTION */}
            <nav className="text-customGreen font-medium flex items-center justify-between mx-auto">

                {/* ICARE LOGO */}
                <h1 className="font-inter font-extrabold text-4xl md:text-5xl cursor-pointer hover:text-green2 transition-colors">
                    <a href="/home">iCARE</a>
                </h1>

                {/* SIDEBAR HAMBURGER BUTTON */}
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

                {/* NAVBAR BUTTONS */}
                <ul className="hidden lg:flex space-x-8 font-semibold text-xl items-center">
                    <li className="cursor-pointer hover:text-green2 transition-colors">
                        <a href="/consultation">Consultation</a>
                    </li>
                    <li className="cursor-pointer hover:text-green2 transition-colors">
                        <a href="/tutorial">Tutorial</a>
                    </li>
                    <li className="cursor-pointer hover:text-green2 transition-colors">
                        <a href="/professors">Professors</a>
                    </li>

                    {/* USER BUTTON WITH DROPDOWN */}
                    <li className="relative cursor-pointer bg-customGreen hover:bg-green2 text-customWhite max-w-36 rounded-xl transition-colors">
                        
                        {/* BUTTON TO ACTIVATE DROPDOWN */}
                        <button className='px-2 py-1 flex items-center space-x-2' onClick={toggleNavbarDropdown}>
                            <span>{user ? (user.student_name).split(' ')[0] : 'User'}</span>
                            <span className="material-symbols-outlined">keyboard_arrow_down</span>
                        </button>

                        {/* THE DROPDOWN */}
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

            {/* SIDEBAR (ONLY AVAILABLE ON MIN WIDTH 1024PX) */}
            <nav
                className={`fixed top-0 right-0 h-screen w-full bg-customWhite rounded-xl transform px-5 md:px-16 pt-2 
                            ${isSidebarOpen ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-150 ease-in-out text-customGreen lg:hidden`} >   

                {/* ICARE LOGO ON SIDEBAR */}
                <section className="flex flex-col h-full">
                    <section className="flex justify-between items-center p-3">
                        <h1 className="font-inter font-extrabold text-4xl md:text-5xl cursor-pointer hover:text-green2 transition-colors">
                            iCARE
                        </h1>

                        {/* EXIT SIDEBAR BUTTON */}
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

                    {/* SIDEBAR BUTTONS */}
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

                        {/* USER BUTTON WITH DROPDOWN ON SIDEBAR */}
                        <li className="relative cursor-pointer">
                            <button
                                className="flex items-center w-full text-left bg-transparent rounded-lg hover:text-green2 focus:outline-none"
                                onClick={toggleSidebarDropdown}
                            >
                                <span className="material-symbols-outlined">person</span>
                                <span className="ml-2">{user ? (user.student_name) : 'User'}</span>
                                <svg
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    className={`ml-2 w-4 h-4 transition-transform duration-200 transform ${isSidebarDropdownOpen ? 'rotate-180' : 'rotate-0'}`}
                                >
                                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                                </svg>
                            </button>

                            {/* THE DROPDOWN INSIDE SIDEBAR */}
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
