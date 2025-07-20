import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { LogOut, User, Home, Edit3 } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const Header: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 xl:px-8">
        <div className="flex justify-between items-center h-14 sm:h-16">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-7 h-7 sm:w-8 sm:h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xs sm:text-sm">DB</span>
            </div>
            <span className="text-lg sm:text-xl font-bold text-gray-900 hidden xs:block">DevBook</span>
          </Link>

          {user && (
            <nav className="flex items-center space-x-1 sm:space-x-2 lg:space-x-4">
              <Link
                to="/"
                className={`flex items-center space-x-1 px-2 sm:px-3 py-1.5 sm:py-2 rounded-md text-xs sm:text-sm font-medium transition-colors ${
                  isActive('/') 
                    ? 'bg-purple-100 text-purple-700' 
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                <Home className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                <span className="hidden sm:block">Feed</span>
              </Link>
              <Link
                to="/create"
                className={`flex items-center space-x-1 px-2 sm:px-3 py-1.5 sm:py-2 rounded-md text-xs sm:text-sm font-medium transition-colors ${
                  isActive('/create') 
                    ? 'bg-purple-100 text-purple-700' 
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                <Edit3 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                <span className="hidden md:block">New Post</span>
                <span className="block md:hidden">New</span>
              </Link>
              <Link
                to="/profile"
                className={`flex items-center space-x-1 px-2 sm:px-3 py-1.5 sm:py-2 rounded-md text-xs sm:text-sm font-medium transition-colors ${
                  isActive('/profile') 
                    ? 'bg-purple-100 text-purple-700' 
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                <User className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                <span className="hidden sm:block">Profile</span>
              </Link>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-1 px-2 sm:px-3 py-1.5 sm:py-2 rounded-md text-xs sm:text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors"
              >
                <LogOut className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                <span className="hidden lg:block">Logout</span>
              </button>
            </nav>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;