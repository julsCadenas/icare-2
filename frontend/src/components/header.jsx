import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Header = () => {
    const { logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <header>
            <button onClick={handleLogout} className='border-2 border-black'>Log Out</button>
        </header>
    );
};

export default Header;
