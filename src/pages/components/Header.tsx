import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../auth/AuthContext';
import './css/Header.css';

export default function Header() {
    const location = useLocation();
    const { isLoggedIn, logout } = useAuth();
    const [selectedNav, setSelectedNav] = useState('');

    useEffect(() => {
        if (location.pathname === '/races') {
            setSelectedNav('races');
        } else if (location.pathname === '/begynd-paa-ocr') {
            setSelectedNav('begynd');
        } else if (location.pathname === '/hjaelp') {
            setSelectedNav('help');
        } else if (location.pathname === '/om-os') {
            setSelectedNav('about');
        } else if (location.pathname === '/faellesskab') {
            setSelectedNav('faellesskab');
        } else if (location.pathname === '/register') {
            setSelectedNav('register');
        } else if (location.pathname === '/login') {
            setSelectedNav('login');
        } else if (location.pathname === '/home') {
            setSelectedNav('home');
        } else if (location.pathname === '/races/create-unofficial') {
            setSelectedNav('races');
        } else if (location.pathname === '/races/create') {
            setSelectedNav('races');
        }
    }, [location.pathname]);

    const handleLogout = () => {
        logout();
        window.location.href = '/login';
    };

    return (
        <header className="headerBar">
            <Link to="/home" className="logo">RaceTracker</Link>

            <nav className="navbar">
                <Link 
                    to="/home" 
                    className={selectedNav === 'home' ? 'selected-nav' : ''} 
                >
                Hjem
                </Link>
                {isLoggedIn && (
                    <>
                        <Link 
                            to="/races" 
                            className={selectedNav === 'races' ? 'selected-nav' : ''} 
                        >
                            Races
                        </Link>
                        <Link 
                            to="/begynd-paa-ocr" 
                            className={selectedNav === 'begynd' ? 'selected-nav' : ''} 
                        >
                            Begynd på OCR
                        </Link>
                        <Link 
                            to="/faellesskab" 
                            className={selectedNav === 'faellesskab' ? 'selected-nav' : ''} 
                        >
                            Fællesskab
                        </Link>
                        <Link 
                            to="/hjaelp" 
                            className={selectedNav === 'help' ? 'selected-nav' : ''} 
                        >
                            Hjælp
                        </Link>
                        <Link 
                            to="/om-os" 
                            className={selectedNav === 'about' ? 'selected-nav' : ''} 
                        >
                            Om os
                        </Link>
                    </>
                )}

                {!isLoggedIn ? (
                    <>
                        <Link to="/login" className={selectedNav === 'login' ? 'nav-link selected-nav' : 'nav-link'}>Login</Link>
                        <Link to="/register" className={selectedNav === 'register' ? 'nav-link selected-nav' : 'nav-link'} >Register</Link>
                    </>
                ) : (
                    <>
                        <button onClick={handleLogout} className="nav-link logout-btn">Log ud</button>
                    </>
                )}
            </nav>
        </header>
    );
}
