import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { Search, Calendar, User, MapPin } from 'lucide-react';

const Header: React.FC = () => {
  const { currentUser, currentLocation } = useApp();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-10 transition-all duration-300 ${
        isScrolled ? 'bg-white/90 backdrop-blur-md shadow-sm' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white">
            <span className="text-xl">🎭</span>
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
            MoodEvents
          </span>
        </Link>

        <nav className="hidden md:flex items-center space-x-6 text-gray-700">
          <Link 
            to="/" 
            className={`flex items-center gap-1 hover:text-purple-600 transition-colors ${
              location.pathname === '/' ? 'text-purple-600 font-medium' : ''
            }`}
          >
            <Search size={18} />
            <span>Discover</span>
          </Link>
          
          <Link 
            to="/calendar" 
            className={`flex items-center gap-1 hover:text-purple-600 transition-colors ${
              location.pathname === '/calendar' ? 'text-purple-600 font-medium' : ''
            }`}
          >
            <Calendar size={18} />
            <span>Calendar</span>
          </Link>
          
          <Link 
            to="/profile" 
            className={`flex items-center gap-1 hover:text-purple-600 transition-colors ${
              location.pathname === '/profile' ? 'text-purple-600 font-medium' : ''
            }`}
          >
            <User size={18} />
            <span>Profile</span>
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          {currentLocation && (
            <div className="hidden sm:flex items-center text-sm text-gray-600">
              <MapPin size={14} className="mr-1" />
              <span>{currentLocation.city}</span>
            </div>
          )}
          
          <button 
            className="lg:hidden flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <span className="sr-only">Menu</span>
            <div className="relative w-5 h-4">
              <span 
                className={`absolute h-0.5 w-5 bg-gray-600 transform transition-all duration-300 ${
                  mobileMenuOpen ? 'rotate-45 top-1.5' : 'top-0'
                }`}
              ></span>
              <span 
                className={`absolute h-0.5 w-5 bg-gray-600 top-1.5 transition-all duration-300 ${
                  mobileMenuOpen ? 'opacity-0' : 'opacity-100'
                }`}
              ></span>
              <span 
                className={`absolute h-0.5 w-5 bg-gray-600 transform transition-all duration-300 ${
                  mobileMenuOpen ? '-rotate-45 top-1.5' : 'top-3'
                }`}
              ></span>
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div 
        className={`absolute top-full left-0 right-0 bg-white shadow-lg transform transition-transform duration-300 lg:hidden ${
          mobileMenuOpen ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
        <div className="container mx-auto py-4 px-4 flex flex-col space-y-4">
          <Link 
            to="/" 
            className="flex items-center gap-2 py-2 hover:bg-gray-100 rounded-lg px-3"
            onClick={() => setMobileMenuOpen(false)}
          >
            <Search size={18} />
            <span>Discover</span>
          </Link>
          
          <Link 
            to="/calendar" 
            className="flex items-center gap-2 py-2 hover:bg-gray-100 rounded-lg px-3"
            onClick={() => setMobileMenuOpen(false)}
          >
            <Calendar size={18} />
            <span>Calendar</span>
          </Link>
          
          <Link 
            to="/profile" 
            className="flex items-center gap-2 py-2 hover:bg-gray-100 rounded-lg px-3"
            onClick={() => setMobileMenuOpen(false)}
          >
            <User size={18} />
            <span>Profile</span>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;